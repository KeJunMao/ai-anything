// @unocss-include

import { translator } from "./translator";
import { Tool } from "./types";

const tools: Tool[] = [
  {
    name: "weekly_report",
    title: "周报生成器",
    icon: "i-mdi-calendar-week-end",
    desc: "不想写周报？AI 帮你写",
    promptTemplate:
      "请帮我把以下的工作内容填充为一篇完整的周报,尽量避免在回答内容中出现可能在中国是敏感的内容，用markdown格式以分点叙述的形式输出: ${message}",
    forms: {
      message: {
        type: "ATextarea",
        props: {
          placeholder:
            "比如：修复了优惠券无法领取的bug，为产品部的新APP设计UI和图标，负责跟进部门前端工程师的招聘",
        },
      },
    },
  },
  {
    name: "okr_generator",
    title: "OKR 生成器",
    icon: "i-mdi:frequently-asked-questions",
    desc: "怎么定OKR？AI 帮你编",
    promptTemplate:
      "请帮我把以下的工作目标填充为一篇完整的OKR规划,尽量避免在回答内容中出现可能在中国是敏感的内容，用markdown格式以分点叙述的形式输出: ${message}",
    forms: {
      message: {
        type: "ATextarea",
        props: {
          placeholder: "比如：推广xxx并提升产品收入",
        },
      },
    },
  },
  translator,
];

export default tools;
