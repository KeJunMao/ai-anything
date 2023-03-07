// @unocss-include

import { Tool } from "./types";

export const frontend_helper = (t: any): Tool => ({
  title: t("tool.frontend_helper.title"),
  desc: t("tool.frontend_helper.desc"),
  name: "frontend_helper",
  icon: "i-mdi:web",
  systemMessageTemplate:
    "我想让你充当前端开发专家。我将提供一些关于Js、Node等前端代码问题的具体信息，而你的工作就是想出为我解决问题的策略。这可能包括建议代码、代码逻辑思路策略。我的第一个请求是",
  userMessageTemplate: "${message}",
  forms: {
    message: {
      type: "ATextarea",
      props: {
        placeholder: t("tool.frontend_helper.forms.message.placeholder"),
      },
    },
  },
});
