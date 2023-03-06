// @unocss-include

import { Tool } from "./types";

export const coding_function = (t: any): Tool => ({
  title: t("tool.coding_function.title"),
  desc: t("tool.coding_function.desc"),
  name: "coding_function",
  icon: "i-mdi:code-braces-box",
  systemMessageTemplate:
    "你现在是一个 ${language} 专家, 请帮我用 ${language} 写一个函数，它需要实现以下功能",
  userMessageTemplate: "${message}",
  forms: {
    language: {
      type: "AInput",
      props: {
        placeholder: "比如：JavaScript，GO",
        label: "语言",
      },
      default: "JavaScript",
    },
    message: {
      type: "ATextarea",
      props: {
        placeholder: "比如：对象深拷贝",
      },
    },
  },
});
