export interface ChatGPTOptions {
  apiKey: string;
  apiBaseUrl: string;
  model: "gpt-3.5-turbo" | "gpt-3.5-turbo-0301";
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
}

export interface ChatGPTMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export type ChatGPTMessages = ChatGPTMessage[];

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

export const useChatGPT = (userOptions: Partial<ChatGPTOptions> = {}) => {
  const storageOptions = useLocalStorage(
    "ai-anything:globalChatGPTOptions",
    {}
  );
  const options = ref<ChatGPTOptions>({
    ...defaultChatGPTOptions,
    ...storageOptions.value,
    ...userOptions,
  });
  const sendMessage = async (
    messages: ChatGPTMessages,
    onProgress?: (message: string, data: Record<string, any>) => void
  ) => {
    const { apiKey, apiBaseUrl, ...opts } = options.value;
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
  return { options, sendMessage };
};
