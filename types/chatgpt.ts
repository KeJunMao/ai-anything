export type ChatGPTProvider = "OpenAI" | "Azure";

export interface ChatGPTOptions {
  apiKey: string;
  apiBaseUrl: string;
  apiUrlPath: string;
  provider: ChatGPTProvider;
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

export type OpenAIMessages = ChatGPTMessage[];
