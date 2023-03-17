import { MaybeRef } from "@vueuse/core";
import { marked } from "marked";
import { ToolItem } from "~~/types";
import { useChatGPT } from "./useChatGPT";

export const useAi = (_tool: MaybeRef<ToolItem>) => {
  const options = computed(() => unref(_tool).options);
  const { sendMessage } = useChatGPT();
  const result = ref("");
  const loading = ref(false);
  const resultHtml = computed(() => marked.parse(result.value));

  const send = async (data: MaybeRef<Record<string, any>>) => {
    data = unref(data);
    const messages = parseRoles(data, unref(_tool)?.roles!);
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
      result.value = error.data
        ? JSON.stringify(error.data, null, 2)
        : null ?? error?.message ?? error;
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
