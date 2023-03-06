import { ChatGPTOptions } from "~/composables/useChatGPT";

export interface Tool {
  name: string;
  title?: string;
  desc?: string;
  icon?: string;
  keywords?: string[];
  systemMessageTemplate: string | ((data: any) => string);
  userMessageTemplate: string | ((data: any) => string);
  forms?: Record<string, FormItem>;
  GPTOptions?: Partial<ChatGPTOptions>;
}

export interface FormBase {
  type: string;
  default?: string;
}
export interface FormPropsBase {
  label?: string;
  placeholder?: string;
  [x: string]: any;
}

export interface FormInput extends FormBase {
  type: "AInput";
  props?: FormPropsBase;
}

export interface FormTextArea extends FormBase {
  type: "ATextarea";
  props?: FormPropsBase;
}

export interface FormSelectProps extends FormPropsBase {
  options: any[];
}

export interface FormSelect extends FormBase {
  type: "ASelect";
  props?: FormSelectProps;
}

export type FormItem = FormInput | FormTextArea | FormSelect;
