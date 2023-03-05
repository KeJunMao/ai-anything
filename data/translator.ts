// @unocss-include

import { Tool } from "./types";
// copy from https://github.com/yetone/bob-plugin-openai-translator
const supportLanguages = [
  ["auto", "自动检测"],
  ["zh-Hans", "简体中文"],
  ["zh-Hant", "繁体中文"],
  ["en", "en"],
  ["yue", "粤语"],
  ["wyw", "古文"],
  ["en", "en"],
  ["ja", "ja"],
  ["ko", "ko"],
  ["fr", "fr"],
  ["de", "de"],
  ["es", "es"],
  ["it", "it"],
  ["ru", "ru"],
  ["pt", "pt"],
  ["nl", "nl"],
  ["pl", "pl"],
  ["ar", "ar"],
  ["af", "af"],
  ["am", "am"],
  ["az", "az"],
  ["be", "be"],
  ["bg", "bg"],
  ["bn", "bn"],
  ["bs", "bs"],
  ["ca", "ca"],
  ["ceb", "ceb"],
  ["co", "co"],
  ["cs", "cs"],
  ["cy", "cy"],
  ["da", "da"],
  ["el", "el"],
  ["eo", "eo"],
  ["et", "et"],
  ["eu", "eu"],
  ["fa", "fa"],
  ["fi", "fi"],
  ["fj", "fj"],
  ["fy", "fy"],
  ["ga", "ga"],
  ["gd", "gd"],
  ["gl", "gl"],
  ["gu", "gu"],
  ["ha", "ha"],
  ["haw", "haw"],
  ["he", "he"],
  ["hi", "hi"],
  ["hmn", "hmn"],
  ["hr", "hr"],
  ["ht", "ht"],
  ["hu", "hu"],
  ["hy", "hy"],
  ["id", "id"],
  ["ig", "ig"],
  ["is", "is"],
  ["jw", "jw"],
  ["ka", "ka"],
  ["kk", "kk"],
  ["km", "km"],
  ["kn", "kn"],
  ["ku", "ku"],
  ["ky", "ky"],
  ["la", "lo"],
  ["lb", "lb"],
  ["lo", "lo"],
  ["lt", "lt"],
  ["lv", "lv"],
  ["mg", "mg"],
  ["mi", "mi"],
  ["mk", "mk"],
  ["ml", "ml"],
  ["mn", "mn"],
  ["mr", "mr"],
  ["ms", "ms"],
  ["mt", "mt"],
  ["my", "my"],
  ["ne", "ne"],
  ["no", "no"],
  ["ny", "ny"],
  ["or", "or"],
  ["pa", "pa"],
  ["ps", "ps"],
  ["ro", "ro"],
  ["rw", "rw"],
  ["si", "si"],
  ["sk", "sk"],
  ["sl", "sl"],
  ["sm", "sm"],
  ["sn", "sn"],
  ["so", "so"],
  ["sq", "sq"],
  ["sr", "sr"],
  ["sr-Cyrl", "sr"],
  ["sr-Latn", "sr"],
  ["st", "st"],
  ["su", "su"],
  ["sv", "sv"],
  ["sw", "sw"],
  ["ta", "ta"],
  ["te", "te"],
  ["tg", "tg"],
  ["th", "th"],
  ["tk", "tk"],
  ["tl", "tl"],
  ["tr", "tr"],
  ["tt", "tt"],
  ["ug", "ug"],
  ["uk", "uk"],
  ["ur", "ur"],
  ["uz", "uz"],
  ["vi", "vi"],
  ["xh", "xh"],
  ["yi", "yi"],
  ["yo", "yo"],
  ["zu", "zu"],
];

const options = supportLanguages.map((v) => ({
  label: v[1],
  value: v[0],
}));

export const translator: Tool = {
  name: "translator",
  title: "AI 翻译器",
  icon: "i-mdi:translate-variant",
  desc: "外语好难？AI 帮你翻译",
  promptTemplate: (query) => {
    let prompt = `translate from ${query.detectFrom} to ${query.detectTo}`;
    if (query.detectTo === "wyw" || query.detectTo === "yue") {
      prompt = `翻译成${query.detectTo}`;
    }
    if (
      query.detectFrom === "wyw" ||
      query.detectFrom === "zh-Hans" ||
      query.detectFrom === "zh-Hant"
    ) {
      if (query.detectTo === "zh-Hant") {
        prompt = "翻译成繁体白话文";
      } else if (query.detectTo === "zh-Hans") {
        prompt = "翻译成简体白话文";
      } else if (query.detectTo === "yue") {
        prompt = "翻译成粤语白话文";
      }
    }
    if (query.detectFrom === query.detectTo) {
      if (query.detectTo === "zh-Hant" || query.detectTo === "zh-Hans") {
        prompt = "润色此句";
      } else {
        prompt = "polish this sentence";
      }
    }
    return `${prompt}:\n\n${query.message} =>`;
  },
  forms: {
    detectFrom: {
      type: "ASelect",
      props: {
        label: "原始语言",
        options: options,
      },
      default: "auto",
    },
    detectTo: {
      type: "ASelect",
      props: {
        label: "目标语言",
        options: options,
      },
      default: "en",
    },
    message: {
      type: "ATextarea",
      props: {
        placeholder: "输入要翻译的内容",
      },
    },
  },
};
