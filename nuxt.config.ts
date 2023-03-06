// https://nuxt.com/docs/api/configuration/nuxt-config
import en from "./locales/en.json";
import zhCN from "./locales/zh-cn.json";

export default defineNuxtConfig({
  app: {
    head: {
      title: "AI Anything",
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: [
    "@anu-vue/nuxt",
    "@unocss/nuxt",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
  ],
  css: ["@anu-vue/preset-theme-default/dist/style.css", "~/assets/global.css"],
  colorMode: {
    classSuffix: "",
  },
  i18n: {
    locales: ["en", "zh-cn"],
    defaultLocale: "en",
    vueI18n: {
      legacy: false,
      messages: {
        en,
        "zh-cn": zhCN,
      },
    },
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   alwaysRedirect: true,
    //   redirectOn: "root",
    //   fallbackLocale: "en",
    // },
  },
});
