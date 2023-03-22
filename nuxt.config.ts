// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import { i18n } from "./config/i18n";

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
        {
          name: "theme-color",
          content: "#ffffff",
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
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "AI Anything",
      short_name: "AIAnything",
      theme_color: "#ffffff",
      icons: [
        {
          src: "android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
      display: "standalone",
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    registerWebManifestInRouteRules: true,
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
