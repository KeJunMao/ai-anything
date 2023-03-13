import {
  defineConfig,
  presetIcons,
  presetUno,
  presetAttributify,
  transformerDirectives,
  presetTypography,
} from "unocss";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";

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
      collections: {
        app: FileSystemIconLoader("./assets/icons", (svg: string) =>
          svg.replaceAll(/#fff/g, "currentColor")
        ),
      },
    }),

    presetAttributify(),
    presetTypography(),
  ],
  transformers: [transformerDirectives()],
  include: [/.*\/anu-vue\.js(.*)?$/, "./**/*.vue", "./**/*.md"],
});
