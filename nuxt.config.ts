// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  app: {
    head: {
      title: "AI Anything",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover",
        },
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
  runtimeConfig: {
    githubClientId: "",
    githubClientSecret: "",
    authSecret: "",
    auth: {
      // origin: "https://aianything.netlify.app",
    },
    public: {
      version: "1",
    },
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
    "@sidebase/nuxt-auth",
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
    // vueI18n: {
    //   legacy: false,
    //   messages: {
    //     en,
    //     "zh-cn": zhCN,
    //   },
    // },
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
