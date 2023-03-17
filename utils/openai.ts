import { OpenAIMessages, ToolItemRole } from "~~/types";

export const parseTemplate = (
  data: Record<string, any>,
  template: string | ((data: any) => string)
) => {
  let message = typeof template === "string" ? template : template(data);
  message = message.replace(/\${(.*?)}/gm, (_, $1) => data[$1] ?? "");
  return message;
};

export const parseRoles = (
  data: Record<string, any>,
  roles: ToolItemRole[]
) => {
  return roles.map((v) => {
    return {
      role: v.type,
      content: parseTemplate(data, v.template) ?? "",
    };
  }) as OpenAIMessages;
};
