import { MaybeRef } from "@vueuse/shared";
import { STORAGE_KEY_TOOLS } from "~~/constants";
import { ToolItem } from "~~/types";

export const useLocalTools = () => {
  const tools = useLocalStorage<ToolItem[]>(STORAGE_KEY_TOOLS, []);
  function create(tool: ToolItem) {
    tools.value.push(tool);
  }

  function get(id: MaybeRef<string>) {
    return tools.value.find((v) => v.id === unref(id));
  }

  function remove(id: MaybeRef<string>) {
    tools.value = tools.value.filter((v) => v.id !== unref(id));
  }

  function update(tool: Partial<ToolItem>) {
    const { id, ...other } = tool;
    tools.value = tools.value.map((v) => {
      if (v.id === id) {
        return {
          ...v,
          ...other,
        };
      }
      return v;
    });
  }

  function clearRemoteCache() {
    tools.value = tools.value.filter((v) => v.id?.includes("-"));
  }

  function createOrUpdate(tool: ToolItem) {
    if (get(tool.id!)) {
      update(tool);
    } else {
      create(tool);
    }
  }

  return {
    tools,
    create,
    get,
    remove,
    update,
    clearRemoteCache,
    createOrUpdate,
  };
};
