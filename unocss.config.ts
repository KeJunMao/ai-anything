import {
  defineConfig,
  presetIcons,
  presetUno,
  presetAttributify,
  transformerDirectives,
  presetTypography,
} from "unocss";

export default defineConfig({
  theme: {
    colors: {
      primary: "var(--color-primary)",
    },
  },
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),

    presetAttributify(),
    presetTypography(),
  ],
  transformers: [transformerDirectives()],
  include: [/.*\/anu-vue\.js(.*)?$/, "./**/*.vue", "./**/*.md"],
});
