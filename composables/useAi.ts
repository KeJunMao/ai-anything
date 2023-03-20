import { MaybeRef } from "@vueuse/core";
import { marked } from "marked";
import { OpenAIMessages, ToolItem } from "~~/types";
import { useChatGPT } from "./useChatGPT";
import { HistoryItem } from "./useHistory";

export const useAi = (_tool: MaybeRef<ToolItem>) => {
  const { create, update, currentHistoryId } = useHistory(_tool);
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
    if (!tool.chat) {
      reset();
    }

    if (!contexts.value.length) {
      contexts.value.push(...messages);
      create(contexts.value);
    } else if (tool.chat) {
      contexts.value.push(messages[messages.length - 1]);
    }
    messages = contexts.value;

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
    update({
      id: currentHistoryId.value,
      context: contexts.value,
    });
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
    currentHistoryId.value = "";
  };
  const toggleHistory = (item: HistoryItem) => {
    if (item.id && item.id !== currentHistoryId.value) {
      reset();
      contexts.value = item.context;
      currentHistoryId.value = item.id;
      if (!unref(_tool).chat) {
        const lastItem = item.context[item.context.length - 1];
        if (lastItem.role === "assistant") {
          result.value = lastItem.content;
        }
      }
    }
  };
  return {
    send,
    resultHtml,
    result,
    loading,
    contexts,
    cancel,
    reset,
    toggleHistory,
  };
};
