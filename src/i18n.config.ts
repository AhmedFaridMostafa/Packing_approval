export type LanguageType = "ar" | "en";

type i18nType = {
  defaultLocale: LanguageType;
  locales: LanguageType[];
};

export const i18n: i18nType = {
  defaultLocale: "en",
  locales: ["ar", "en"],
};

export type Lang = (typeof i18n)["locales"][number];
