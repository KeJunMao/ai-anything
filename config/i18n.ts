import type { NuxtI18nOptions } from "@nuxtjs/i18n";
import type { LocaleObject } from "#i18n";

const countryLocaleVariants: Record<string, LocaleObject[]> = {
  en: [
    { code: "en-US", name: "English (US)", iso: "en-US" },
    { code: "en-GB", name: "English (UK)", iso: "en-GB" },
  ],
};

const locales: LocaleObject[] = [
  {
    code: "en",
    file: "en.json",
    name: "English",
  },
  {
    code: "zh-CN",
    file: "zh-CN.json",
    name: "简体中文",
    iso: "zh-CN",
  },
];

const buildLocales = () => {
  const useLocales = Object.values(locales).reduce((acc, data) => {
    const locales = countryLocaleVariants[data.code];
    if (locales) {
      locales.forEach((l) => {
        const entry: LocaleObject = {
          ...data,
          ...l,
          files: [data.file!, `${l.code}.json`],
        };
        delete entry.file;
        acc.push(entry);
      });
    } else {
      acc.push(data);
    }
    return acc;
  }, <LocaleObject[]>[]);

  return useLocales.sort((a, b) => a.code.localeCompare(b.code));
};

export const currentLocales = buildLocales();

export const i18n: NuxtI18nOptions = {
  locales: currentLocales,
  lazy: true,
  langDir: "locales",
  defaultLocale: "en-US",
  vueI18n: {
    availableLocales: currentLocales.map((l) => l.code),
    fallbackLocale: "en-US",
    fallbackWarn: false,
    missingWarn: false,
  },
  detectBrowserLanguage: {
    useCookie: true,
    alwaysRedirect: true,
    redirectOn: "root",
    fallbackLocale: "en-US",
  },
};
