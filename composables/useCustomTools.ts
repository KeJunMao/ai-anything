import { ToolItem } from "./useTools";

export const useCustomTools = createSharedComposable(() => {
  const customToolskey = "customTools:v" + useRuntimeConfig().public.version;
  const { $storage } = useNuxtApp();
  onNuxtReady(async () => {
    sync();
  });
  const customTools = useState<ToolItem[]>("customTools", () => []);

  const sync = async () => {
    const tools = (await $storage.getItem(customToolskey)) as ToolItem[];
    customTools.value = (tools as any) || [];
  };

  const remove = async (id: string) => {
    await sync();
    customTools.value = customTools.value.filter((v) => v.id !== id);
    await $storage.setItem(customToolskey, customTools.value);
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
    await $storage.setItem(customToolskey, customTools.value);
  };
  return {
    tools: customTools,
    save,
    remove,
    sync,
  };
});
