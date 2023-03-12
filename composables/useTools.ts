import { ChatGPTOptions } from "./useChatGPT";

// @unocss-include
export interface ToolItemOptions extends Partial<ChatGPTOptions> {}
export interface ToolItemRole {
  id?: string;
  type: string;
  template: string;
}
export interface ToolItemFormItem {
  id?: string;
  type: string;
  name: string;
  lable?: string;
  props?: Record<string, any>;
}
export type ToolItemForms = ToolItemFormItem[];
export interface ToolItemMeta {
  /**
   * uuid
   */
  id?: string;
  /**
   * tool name
   */
  name?: string;
  /**
   * tool desc
   */
  desc?: string;
  /**
   * tool icon
   */
  icon?: string;
}

export interface ToolItem extends ToolItemMeta {
  roles: ToolItemRole[];
  forms: ToolItemForms;
  options?: ToolItemOptions;
}

export const useTools = () => {
  const { tools: customTools } = useCustomTools();

  const buildInTools = ref<ToolItem[]>([]);

  const tools = computed<ToolItem[]>(() => {
    return [...buildInTools.value, ...customTools.value];
  });
  const isCustomTool = (id: string) =>
    !!customTools.value.find((v) => v.id === id);
  return {
    tools,
    isCustomTool,
  };
};
