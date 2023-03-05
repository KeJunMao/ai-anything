import { presetAnu, presetIconExtraProperties } from "anu-vue";
import { presetThemeDefault } from "@anu-vue/preset-theme-default";

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
      primary: "hsl(var(--color-primary))",
    },
  },
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: presetIconExtraProperties,
    }),

    // anu-vue preset
    presetAnu(),

    // default theme preset
    presetThemeDefault(),

    presetAttributify(),
    presetTypography(),
  ],
  transformers: [transformerDirectives()],
  include: [/.*\/anu-vue\.js(.*)?$/, "./**/*.vue", "./**/*.md"],
});
