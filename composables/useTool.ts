import { MaybeRef } from "@vueuse/core";
import { ToolItem } from "./useTools";

export const useTool = (id?: MaybeRef<string>) => {
  const { tools } = useTools();
  const tool = ref<ToolItem>();
  watch(
    () => id,
    () => {
      tool.value = tools.value.find((v) => v.id === unref(id));
      if (!tool.value && unref(id) && !unref(id)?.includes("-")) {
        nextTick(async () => {
          const remoteTool = await $fetch("/api/tool/" + unref(id));
          if (remoteTool) {
            tool.value = remoteTool as unknown as ToolItem;
          }
        });
      }
    },
    {
      immediate: true,
    }
  );
  return { tool };
};
