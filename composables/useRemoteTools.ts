import { MaybeRef } from "@vueuse/shared";
import { ToolItem } from "~~/types";

export const useAsyncRemoteTools = async () => {
  const tools = ref<ToolItem[]>([]);

  async function refresh() {
    const _tools = await $fetch<ToolItem[]>("/api/tool");
    if (_tools) {
      tools.value = _tools;
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

  await refresh();

  return {
    tools,
    refresh,
    create,
    get,
    remove,
    update,
  };
};
