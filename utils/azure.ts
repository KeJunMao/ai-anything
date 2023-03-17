import { OpenAIMessages } from "~~/types";

export function convertOpenAIMessagesToAzurePrompt(messages: OpenAIMessages) {
  const msgs = messages
    .map((v) => `<|im_start|>${v.role}\n${v.content}\n<|im_end|>`)
    .join("\n");
  return {
    prompt: `${msgs}\n<|im_start|>assistant\n`,
    stop: ["<|im_end|>"],
  };
}
