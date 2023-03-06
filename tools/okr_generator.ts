// @unocss-include
import { Tool } from "./types";

export const okr_generator = (t: any): Tool => ({
  name: "okr_generator",
  title: t('tool.okr_generator.title'),
  icon: "i-mdi:frequently-asked-questions",
  desc: t('tool.okr_generator.desc'),
  systemMessageTemplate:
    "请帮我把以下的工作目标填充为一篇完整的OKR规划,尽量避免在回答内容中出现可能在中国是敏感的内容,用markdown格式以分点叙述的形式输出",
  userMessageTemplate: "${message}",
  forms: {
    message: {
      type: "ATextarea",
      props: {
        placeholder: "比如：推广xxx并提升产品收入",
      },
    },
  },
});
