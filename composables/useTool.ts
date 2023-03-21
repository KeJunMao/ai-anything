import { MaybeRef } from "@vueuse/core";
import { ToolItem } from "~~/types";

const { get } = useRemoteTools();

const gett = useDebounceFn(get);
const tool = ref<ToolItem>();

export const useTool = (id?: MaybeRef<string>) => {
  const { tools } = useTools();
  watch(
    tools,
    () => {
      tool.value = tools.value.find((v) => v.id === unref(id));
      if (!tool.value && id && unref(id) && !unref(id)?.includes("-")) {
        nextTick(async () => {
          const remoteTool = await gett(id);
          if (remoteTool) {
            tool.value = remoteTool;
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
