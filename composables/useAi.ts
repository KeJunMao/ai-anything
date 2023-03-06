import { MaybeRef } from "@vueuse/core";
import { marked } from "marked";
import { ChatGPTMessages, useChatGPT } from "./useChatGPT";

const parseMessage = (
  data: Record<string, any>,
  template: string | ((dat: any) => string)
) => {
  let message = typeof template === "string" ? template : template(data);
  message = message.replace(/\${(.*?)}/gm, (_, $1) => data[$1]);
  return message;
};

export const useAi = (toolName: string) => {
  const tool = useTool(toolName);
  const { sendMessage } = useChatGPT(tool.value?.GPTOptions);
  const result = ref("");
  const loading = ref(false);
  const resultHtml = computed(() => marked.parse(result.value));
  const send = async (data: MaybeRef<Record<string, any>>) => {
    data = unref(data);
    if (data.message) {
      const message = parseMessage(data, tool.value?.userMessageTemplate!);
      const systemMessage = parseMessage(
        data,
        tool.value?.systemMessageTemplate!
      );
      const messages: ChatGPTMessages = [
        {
          role: "user",
          content: message,
        },
      ];
      if (systemMessage) {
        messages.unshift({
          role: "system",
          content: systemMessage,
        });
      }
      result.value = "";
      loading.value = true;
      try {
        await sendMessage(messages, (message) => {
          result.value += message;
        });
      } catch (error: any) {
        result.value = error?.message ?? String(error);
      }
      loading.value = false;
    }
  };
  return {
    send,
    resultHtml,
    result,
    loading,
  };
};
