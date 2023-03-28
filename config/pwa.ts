import type { ModuleOptions } from "@vite-pwa/nuxt";

const scope = "/";

export const pwa: ModuleOptions = {
  registerType: "autoUpdate",
  scope,
  base: scope,
  manifest: {
    id: scope,
    scope,
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
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,txt,png,ico,svg}"],
    navigateFallbackDenylist: [/^\/api\//],
    navigateFallback: "/",
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: ({ url, request }) =>
          request.method === "GET" && url.pathname.includes("/api/tool"),
        handler: "NetworkFirst",
        options: {
          cacheName: "api-tool-cache",
        },
      },
    ],
  },
  registerWebManifestInRouteRules: true,
  writePlugin: true,
  devOptions: {
    enabled: false,
    navigateFallback: scope,
  },
};
