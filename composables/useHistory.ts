import { MaybeRef, RemovableRef, formatDate } from "@vueuse/core";
import { OpenAIMessages, ToolItem } from "~~/types";
import { useIDBKeyval } from "@vueuse/integrations/useIDBKeyval";
import { STORAGE_KEY_TOOL_HISTORY } from "~~/constants";
import { v4 as uuidv4 } from "uuid";

export interface HistoryItem {
  id: string;
  name: string;
  context: OpenAIMessages;
}

let _history: RemovableRef<HistoryItem[]>;
const history = ref<HistoryItem[]>([]);
const currentHistoryId = ref("");
export const useHistory = (_tool: MaybeRef<ToolItem>) => {
  _history = useIDBKeyval<HistoryItem[]>(
    `${STORAGE_KEY_TOOL_HISTORY}${unref(_tool).id}`,
    [],
    {
      deep: true,
      flush: "sync",
    }
  );
  const stop = watchEffect(() => {
    history.value = _history.value;
  });

  tryOnScopeDispose(stop);

  function create(context: OpenAIMessages) {
    currentHistoryId.value = uuidv4();
    _history.value.push({
      id: currentHistoryId.value,
      name: formatDate(new Date(), "YYYY-MM-DD hh:mm:ss"),
      context: context,
    });
  }

  function remove(id: string) {
    _history.value = history.value.filter((item) => item.id !== id);
  }

  function clear() {
    _history.value = [];
  }

  function get(id: string) {
    return history.value.find((item) => item.id === id);
  }

  function update(item: Partial<HistoryItem>) {
    if (item.id) {
      _history.value = history.value.map((v) => {
        if (v.id === item.id) {
          return { ...v, ...item };
        }
        return v;
      });
    }
  }

  return {
    currentHistoryId,
    history,
    create,
    remove,
    clear,
    get,
    update,
  };
};
