// @unocss-include

import { Tool } from "./types";

export const finding_bugs = (t: any): Tool => ({
  title: t('tool.finding_bugs.title'),
  desc: t('tool.finding_bugs.desc'),
  name: "finding_bugs",
  icon: "i-mdi:bug",
  systemMessageTemplate:
    "你现在是一个 ${language} 专家, 我有一段程式码，我预期这段程式码可以 ${features} 请帮我找出我哪里写错了，以及用正确的方式改写。",
  userMessageTemplate: "${message}",
  forms: {
    language: {
      type: "AInput",
      props: {
        placeholder: "比如：JavaScript，GO",
        label: "语言",
      },
      default: "Python",
    },
    features: {
      type: "ATextarea",
      props: {
        label: "代码的功能",
        placeholder: "判断一个字串是不是镜像回文",
      },
      default: "判断一个字串是不是镜像回文",
    },
    message: {
      type: "ATextarea",
      props: {
        placeholder: "在这里输入代码",
      },
    },
  },
});
