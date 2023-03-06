import { MaybeRef } from "@vueuse/core";

export const useTool = (name: MaybeRef<string>) => {
  const { tools } = useTools();
  const tool = computed(() => tools.value.find((v) => v.name === unref(name)));
  return tool;
};
