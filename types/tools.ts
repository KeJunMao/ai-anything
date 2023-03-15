import { ChatGPTOptions } from "./chatgpt";
import { Prisma } from "@prisma/client";

// @unocss-include
export interface ToolItemOptions
  extends Partial<ChatGPTOptions>,
    Prisma.JsonObject {}

export interface ToolItemRole extends Prisma.JsonObject {
  id?: string;
  type: string;
  template: string;
}
export interface ToolItemFormItem extends Prisma.JsonObject {
  id?: string;
  type: string;
  name: string;
  lable?: string;
  props?: Record<string, any>;
}
export type ToolItemForms = ToolItemFormItem[];

export interface ToolItem extends Prisma.ToolCreateInput {
  roles: ToolItemRole[];
  forms: ToolItemForms;
  options?: ToolItemOptions;
}
