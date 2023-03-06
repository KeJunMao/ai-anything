// @unocss-include

import { translator } from "./translator";
import { Tool } from "./types";

const tools: Tool[] = [
  {
    name: "weekly_report",
    title: "周报生成器",
    icon: "i-mdi-calendar-week-end",
    desc: "不想写周报？AI 帮你写",
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
  },
  {
    name: "okr_generator",
    title: "OKR 生成器",
    icon: "i-mdi:frequently-asked-questions",
    desc: "怎么定OKR？AI 帮你编",
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
  },
  translator,
  {
    title: "写函数",
    desc: "函数专家",
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
  },
  {
    title: "找BUG",
    desc: "真正的QA，往往...",
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
  },
  {
    title: "小红书文案生成器",
    desc: "帮你生成小红书风格文案",
    name: "redbook",
    icon: "i-mdi:book",
    systemMessageTemplate:
      "你是一位小红书种草博主，按照小红书风格，1、起一个比较吸引人、夸张的文章标题\n2、文章多使用emoji的可爱表情，多用空行\n3、文章需要结合个人体会、对自己的影响\n4、文章最后加上tag\n写一篇推荐种草文章：",
    userMessageTemplate: "${message}",
    forms: {
      message: {
        type: "ATextarea",
        props: {
          placeholder: "在这里输入要求",
        },
      },
    },
  },
];

export default tools;
