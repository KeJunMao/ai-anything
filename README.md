# AI Anything

通过结构化数据生成 ChatGPT 相关工具

> **Warning**
> 体验 [demo](https://aianything.netlify.app/) 需要 ApiKey

## 简介

大部分 ChatGPT 相关工具本质上就是调整 prompt， AI Anything 可以在只编写 json 的情况下生成工具，同时还支持使用函数来生成更复杂的 prompt

## 例子

```ts
const codingFunctionTool = {
  // 定义标题
  title: "写函数",
  // 定义简介
  desc: "函数专家",
  // 定义路由
  name: "coding_function",
  // 定义图标 https://icones.js.org/collection/mdi
  icon: "i-mdi:code-braces-box",
  // 定义 system content, 支持函数
  systemMessageTemplate:
    "你现在是一个 ${language} 专家, 请帮我用 ${language} 写一个函数，它需要实现以下功能",
  // 定义 user content, 支持函数
  userMessageTemplate: "${message}",
  // 定义表单，，key 为模板中的字段，其中 message 是必填的
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
};
```
