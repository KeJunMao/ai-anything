import { MaybeRef } from "@vueuse/shared";
import { ToolItem } from "~~/types";

const tools = ref<ToolItem[]>([]);

export const useRemoteTools = () => {
  async function refresh() {
    try {
      const _tools = await $fetch<ToolItem[]>("/api/tool");
      if (_tools) {
        tools.value = _tools;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function create(tool: ToolItem) {
    const { id, ...body } = tool;
    const data = await $fetch("/api/tool", {
      method: "post",
      body,
    });
    return data;
  }

  async function get(id: MaybeRef<string>) {
    return await $fetch<ToolItem>(`/api/tool/${unref(id)}`);
  }

  async function remove(id: MaybeRef<string>) {
    return await $fetch<ToolItem>(`/api/tool/${unref(id)}`, {
      method: "delete",
    });
  }

  async function update(tool: Partial<ToolItem>) {
    const { id, ...body } = tool;
    return await $fetch(`/api/tool/${id}`, {
      method: "post",
      body,
    });
  }

  return {
    tools,
    refresh,
    create,
    get,
    remove,
    update,
  };
};

export const useAsyncRemoteTools = async ({ immediate = true } = {}) => {
  const { refresh } = useRemoteTools();
  if (immediate) {
    await refresh();
  }
  return {
    tools,
  };
};
