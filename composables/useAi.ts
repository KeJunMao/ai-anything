import { MaybeRef } from "@vueuse/core";
import { marked } from "marked";
import { OpenAIMessages, ToolItem } from "~~/types";
import { useChatGPT } from "./useChatGPT";
import { HistoryItem } from "./useHistory";

export const useAi = (_tool: MaybeRef<ToolItem>) => {
  const { create, update, currentHistoryId } = useHistory(_tool);
  currentHistoryId.value = "";
  const options = computed(() => unref(_tool).options);
  const { sendMessage } = useChatGPT();
  const result = ref("");
  const loading = ref(false);
  const resultHtml = computed(() => marked.parse(result.value));
  const contexts = ref<OpenAIMessages>([]);
  let controller = new AbortController();
  let signal = controller.signal;
  const error = ref<any>(null);

  const _send = async (messages: OpenAIMessages) => {
    error.value = null;
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
    } catch (e: any) {
      error.value = e;
      if (e.message?.includes("The user aborted a request")) {
        // pass
      } else {
        result.value = e?.message ?? e;
      }
    }
    if (result.value && !error.value) {
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
    await _send(messages);
  };

  const resend = async () => {
    _send(contexts.value);
  };

  const cancel = () => {
    controller.abort();
    controller = new AbortController();
    signal = controller.signal;
  };
  const reset = () => {
    error.value = null;
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
    resend,
    resultHtml,
    result,
    loading,
    contexts,
    error,
    cancel,
    reset,
    toggleHistory,
  };
};
