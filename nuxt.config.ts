// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import en from "./locales/en.json";
import zhCN from "./locales/zh-cn.json";

export default defineNuxtConfig({
  app: {
    head: {
      title: "AI Anything",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "AI Anything Power by ChatGPT",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  typescript: {
    strict: true,
    shim: false,
  },
  modules: [
    "@unocss/nuxt",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@element-plus/nuxt",
    "nuxt-icon",
  ],
  css: ["@/assets/scss/index.scss", "@unocss/reset/tailwind.css"],
  colorMode: {
    classSuffix: "",
  },
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "zh-cn",
        name: "简体中文",
      },
    ],
    defaultLocale: "en",
    vueI18n: {
      legacy: false,
      messages: {
        en,
        "zh-cn": zhCN,
      },
    },
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      redirectOn: "root",
      fallbackLocale: "en",
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    },
  },
  elementPlus: {
    themes: ["dark"],
    importStyle: "scss",
    components: ["ElInput"],
  },
});
