import { MaybeRef } from "@vueuse/core";
import { marked } from "marked";
import { useChatGPT } from "./useChatGPT";

export const useAi = (id: string) => {
  const { tool } = useTool(id);
  const options = computed(() => tool.value?.options);
  const { sendMessage } = useChatGPT();
  const result = ref("");
  const loading = ref(false);
  const resultHtml = computed(() => marked.parse(result.value));

  const send = async (data: MaybeRef<Record<string, any>>) => {
    data = unref(data);
    const messages = parseRoles(data, tool.value?.roles!);
    result.value = "";
    loading.value = true;
    try {
      await sendMessage(
        messages,
        (message) => {
          result.value += message;
        },
        options.value
      );
    } catch (error: any) {
      result.value = error?.message ?? String(error);
    }
    loading.value = false;
  };
  return {
    send,
    resultHtml,
    result,
    loading,
  };
};
