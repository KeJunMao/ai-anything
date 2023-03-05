import { MaybeRef } from "@vueuse/core";
import { marked } from "marked";
export const useAi = (tool: string) => {
  const result = ref("");
  const loading = ref(false);
  const resultHtml = computed(() => marked.parse(result.value));
  const send = async (data: MaybeRef<Record<string, any>>) => {
    data = unref(data);
    if (data.message) {
      result.value = "";
      loading.value = true;
      try {
        const response: ReadableStream = await $fetch("/api/generate", {
          method: "post",
          body: {
            data,
            tool,
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
          result.value += text.replace(/\$id:([a-zA-Z0-9\-]+)\$/, "");
        }
      } catch (error) {
        result.value = String(error);
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
