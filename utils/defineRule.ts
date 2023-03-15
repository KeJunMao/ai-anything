import type { FormItemRule } from "element-plus";
import type { Arrayable } from "element-plus/es/utils";

export type Rules = Partial<Record<string, Arrayable<FormItemRule>>>;

export const defineRules = (rules: Rules | (() => Rules)) => {
  return typeof rules === "function" ? rules() : rules;
};
