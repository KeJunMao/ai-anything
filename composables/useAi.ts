import { MaybeRef } from "@vueuse/core";
import { marked } from "marked";
import { OpenAIMessages, ToolItem } from "~~/types";
import { useChatGPT } from "./useChatGPT";

export const useAi = (_tool: MaybeRef<ToolItem>) => {
  const options = computed(() => unref(_tool).options);
  const { sendMessage } = useChatGPT();
  const result = ref("");
  const loading = ref(false);
  const resultHtml = computed(() => marked.parse(result.value));
  const contexts = ref<OpenAIMessages>([]);
  let controller = new AbortController();
  let signal = controller.signal;

  const send = async (data: MaybeRef<Record<string, any>>) => {
    const tool = unref(_tool);
    data = unref(data);
    let messages = parseRoles(data, tool?.roles!);
    if (messages.some((v) => !v.content)) {
      ElMessage.error("Content cannot be empty");
      return;
    }
    if (tool.chat) {
      if (!contexts.value.length) {
        contexts.value.push(...messages);
      } else {
        contexts.value.push(messages[messages.length - 1]);
      }
      messages = contexts.value;
    }
    result.value = "";
    loading.value = true;
    try {
      await sendMessage({
        messages,
        onProgress: (message) => {
          result.value += message;
        },
        gptOptions: options.value,
        signal,
      });
    } catch (error: any) {
      if (error.message?.includes("The user aborted a request")) {
        // pass
      } else {
        result.value = error.data
          ? JSON.stringify(error.data, null, 2)
          : null ?? error?.message ?? error;
      }
    }
    if (result.value) {
      contexts.value.push({
        content: result.value,
        role: "assistant",
      });
    }
    loading.value = false;
  };
  const cancel = () => {
    controller.abort();
    controller = new AbortController();
    signal = controller.signal;
  };
  const reset = () => {
    cancel();
    contexts.value = [];
    result.value = "";
    loading.value = false;
  };
  return {
    send,
    resultHtml,
    result,
    loading,
    contexts,
    cancel,
    reset,
  };
};
