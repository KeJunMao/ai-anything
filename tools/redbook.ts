// @unocss-include

import { Tool } from "./types";

export const redbook = (t: any): Tool => ({
  title: t('tool.redbook.title'),
  desc: t('tool.redbook.desc'),
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
});
