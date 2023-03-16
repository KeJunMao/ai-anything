// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import { i18n } from "./config/i18n";

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  runtimeConfig: {
    githubClientId: "",
    githubClientSecret: "",
    googleClientId: "",
    googleClientSecret: "",
    authSecret: "",
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
  i18n,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    },
    build: {
      target: "esnext",
    },
  },
  elementPlus: {
    themes: ["dark"],
    importStyle: "scss",
    components: ["ElInput", "ElSelect", "ElOption"],
  },
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
});
