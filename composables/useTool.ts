import { MaybeRef } from "@vueuse/core";

export const useTool = (id: MaybeRef<string>) => {
  const { tools } = useTools();
  const tool = computed(() => tools.value.find((v) => v.id === unref(id)));
  return { tool };
};
