import { Tool } from "./types";

// @unocss-include
export const weekly_report = (t: any): Tool => ({
  name: "weekly_report",
  title: t("tool.weekly_report.title"),
  icon: "i-mdi-calendar-week-end",
  desc: t("tool.weekly_report.desc"),
  systemMessageTemplate:
    "请帮我把以下的工作内容填充为一篇完整的周报,尽量避免在回答内容中出现可能在中国是敏感的内容,用markdown格式以分点叙述的形式输出",
  userMessageTemplate: "${message}",
  forms: {
    message: {
      type: "ATextarea",
      props: {
        placeholder:
          "比如：修复了优惠券无法领取的bug，为产品部的新APP设计UI和图标，负责跟进部门前端工程师的招聘",
      },
    },
  },
});
