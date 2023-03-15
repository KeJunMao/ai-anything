import { STORAGE_KEY_GPT_SETTINGS } from "~/constants";
import { ChatGPTMessages, ChatGPTOptions } from "~~/types";

export const defaultChatGPTOptions: ChatGPTOptions = {
  apiKey: "",
  apiBaseUrl: "https://api.openai.com",
  model: "gpt-3.5-turbo",
  temperature: 1,
  top_p: 1,
  n: 1,
  stream: true,
  max_tokens: 1000,
  presence_penalty: 0,
  frequency_penalty: 0,
};

export const useChatGPT = createSharedComposable(() => {
  const storageOptions = useLocalStorage(
    STORAGE_KEY_GPT_SETTINGS,
    defaultChatGPTOptions
  );
  const sendMessage = async (
    messages: ChatGPTMessages,
    onProgress?: (message: string, data: Record<string, any>) => void,
    options: Partial<ChatGPTOptions> = {}
  ) => {
    const { apiKey, apiBaseUrl, ...opts } = {
      ...storageOptions.value,
      ...options,
    };
    // @ts-ignroe
    const response: ReadableStream = await $fetch("/v1/chat/completions", {
      baseURL: apiBaseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      method: "post",
      body: {
        ...opts,
        messages,
      },
      responseType: "stream",
    });

    const reader = response.getReader();
    const decoder = new TextDecoder();
    let isDone = false;
    while (!isDone) {
      const { value, done } = await reader.read();
      isDone = done;
      const text = decoder.decode(value);
      const data = text
        .split("data:")
        .filter((v) => !!v.trim() && v.trim() !== "[DONE]")
        .map((v) => JSON.parse(v));

      const message = data
        .map((v) => {
          const msg = v.choices[0];
          return msg.message ? msg.message.content : msg.delta.content;
        })
        .join("");
      if (onProgress) {
        onProgress(message, data);
      }
    }
  };
  return { sendMessage, storageOptions };
});
