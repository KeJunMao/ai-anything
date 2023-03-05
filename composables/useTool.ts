export const useTool = (name: string) => {
  const { tools } = useTools();
  const tool = computed(() => tools.value.find((v) => v.name === name));
  return tool;
};
