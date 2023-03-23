import { STORAGE_KEY_GPT_SETTINGS } from "~/constants";
import { OpenAIMessages, ChatGPTOptions } from "~~/types";
import { convertOpenAIMessagesToAzurePrompt } from "~~/utils/azure";
import { createParser } from "eventsource-parser";
import { streamAsyncIterator } from "~~/utils";

export const defaultChatGPTOptions: ChatGPTOptions = {
  apiKey: "",
  apiBaseUrl: "https://api.openai.com",
  apiUrlPath: "/v1/chat/completions",
  provider: "OpenAI",
  model: "gpt-3.5-turbo",
  temperature: 1,
  top_p: 1,
  n: 1,
  stream: true,
  max_tokens: 1000,
  presence_penalty: 0,
  frequency_penalty: 0,
};

function createFetchGPTResponse(
  options: ChatGPTOptions,
  messages: OpenAIMessages,
  signal?: AbortSignal
) {
  const { apiKey, apiBaseUrl, apiUrlPath, provider, ...opts } = options;

  const body: Record<string, any> = {
    ...opts,
  };
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
  };
  let url = apiUrlPath;
  switch (provider) {
    case "OpenAI":
      headers["Authorization"] = `Bearer ${apiKey}`;
      body["messages"] = messages;
      break;
    case "Azure":
      headers["api-key"] = `${apiKey}`;
      url = `${apiUrlPath}/${options.model}/completions?api-version=2022-12-01`;
      Object.assign(body, convertOpenAIMessagesToAzurePrompt(messages));
      break;
  }

  return $fetch(url, {
    baseURL: apiBaseUrl,
    headers,
    body,
    method: "post",
    responseType: "stream",
    signal,
  });
}

export interface SendMessageOptions {
  messages: OpenAIMessages;
  gptOptions?: Partial<ChatGPTOptions>;
  onProgress?: (data: string) => void;
  signal?: AbortSignal;
}

export const useChatGPT = createSharedComposable(() => {
  const tempKey = ref("");
  const storageOptions = useLocalStorage(
    STORAGE_KEY_GPT_SETTINGS,
    defaultChatGPTOptions
  );
  const sendMessage = async (userOptions: SendMessageOptions) => {
    const options = {
      ...storageOptions.value,
      ...userOptions.gptOptions,
    };
    // try use chat chat api!
    if (!options.apiKey) {
      if (tempKey.value) {
        options.apiKey = tempKey.value;
      } else {
        try {
          const data = await $fetch<any>(
            "https://api.harrly.com/api/project/chat/api"
          );
          const item = data?.API;
          tempKey.value = item?.API;
          options.apiKey = item?.API;
        } catch {
          ElMessage.error("Plase set your OpenAI API key first");
        }
      }
    }
    const { onProgress = () => {}, messages, signal } = userOptions;
    let isError = false;
    let resp: ReadableStream;
    try {
      resp = (await createFetchGPTResponse(options, messages, signal)) as any;
    } catch (error: any) {
      isError = true;
      if (error.data) {
        resp = error.data;
      } else {
        throw error;
      }
    }
    const parser = createParser((event) => {
      if (event.type === "event") {
        let data: Record<string, any>;
        try {
          data = JSON.parse(event.data);
        } catch {
          console.log("Failed to parse event data", event.data);
          return;
        }
        const { choices } = data;
        if (!choices || choices.length === 0) {
          throw new Error(`No choices found in response`);
        }
        let message = "";
        switch (options.provider) {
          case "OpenAI":
            const { content = "" } = choices[0].delta;
            message = content;
            break;
          case "Azure":
            message = choices[0].text;
            break;
        }
        onProgress(message);
      }
    });
    for await (const chunk of streamAsyncIterator[Symbol.asyncIterator](resp)) {
      const str = new TextDecoder().decode(chunk);
      if (isError) {
        const error = JSON.parse(str);
        throw new Error(error.error.message);
      }
      parser.feed(str);
    }
  };
  return { sendMessage, storageOptions };
});
