import { ToolItem } from "~~/types";

export const useToolFormData = createSharedComposable((tool: ToolItem) => {
  const formData = ref<Record<any, any>>();
  watch(
    () => tool?.forms,
    () => {
      formData.value =
        tool?.forms?.reduce((pre, cur) => {
          pre[cur.name] = cur.props?.default;
          return pre;
        }, {} as Record<any, any>) ?? {};
    },
    {
      immediate: true,
      deep: true,
    }
  );
  return {
    formData,
  };
});
