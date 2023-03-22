// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import { i18n } from "./config/i18n";
import { pwa } from "./config/pwa";

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          href: "/favicon.ico",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
      ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
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
    "nuxt-gtag",
    "@vite-pwa/nuxt",
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
  },
  elementPlus: {
    themes: ["dark"],
    importStyle: "scss",
    components: ["ElInput", "ElSelect", "ElOption"],
  },
  pwa,
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ["/"],
      ignore: ["/ai-*"],
    },
  },
});
