import { MaybeRef } from "@vueuse/core";
import { OpenAIMessages, ToolItem } from "~~/types";
import { useIDBKeyval } from "@vueuse/integrations/useIDBKeyval";
import { STORAGE_KEY_TOOL_HISTORY } from "~~/constants";
import { v4 as uuidv4 } from "uuid";

export interface HistoryItem {
  id: string;
  name: number;
  context: OpenAIMessages;
}

export const useHistory = (_tool: MaybeRef<ToolItem>) => {
  const history = useIDBKeyval<HistoryItem[]>(
    `${STORAGE_KEY_TOOL_HISTORY}${unref(_tool).id}`,
    []
  );

  function create(context: OpenAIMessages) {
    history.value.push({
      id: uuidv4(),
      name: Date.now(),
      context: context,
    });
  }

  function remove(id: string) {
    history.value = history.value.filter((item) => item.id !== id);
  }

  function clear() {
    history.value = [];
  }

  function get(id: string) {
    return history.value.find((item) => item.id === id);
  }

  function update(item: Partial<HistoryItem>) {
    if (item.id) {
      history.value = history.value.map((v) => {
        if (v.id === item.id) {
          return { ...v, ...item };
        }
        return v;
      });
    }
  }

  return {
    history,
    create,
    remove,
    clear,
    get,
    update,
  };
};
