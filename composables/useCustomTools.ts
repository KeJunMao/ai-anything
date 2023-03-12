import { ToolItem } from "./useTools";

export const CustomToolskey = "customTools:v1";

export const useCustomTools = createSharedComposable(() => {
  const { $storage } = useNuxtApp();
  onNuxtReady(async () => {
    sync();
  });
  const customTools = ref<ToolItem[]>([]);

  const sync = async () => {
    const tools = (await $storage.getItem(CustomToolskey)) as ToolItem[];
    customTools.value = (tools as any) || [];
  };

  const remove = async (id: string) => {
    await sync();
    customTools.value = customTools.value.filter((v) => v.id !== id);
    await $storage.setItem(CustomToolskey, customTools.value);
  };
  const save = async (tool: ToolItem) => {
    await sync();
    if (customTools.value.find((t) => t.id === tool.id)) {
      customTools.value = customTools.value.map((v) => {
        if (v.id === tool.id) {
          return tool;
        }
        return v;
      });
    } else {
      customTools.value.push(tool);
    }
    await $storage.setItem(CustomToolskey, customTools.value);
  };
  return {
    tools: customTools,
    save,
    remove,
    sync,
  };
});
