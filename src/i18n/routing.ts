import { defineRouting } from "next-intl/routing";
import { DEFAULT_LANGUAGE, DEFAULT_LANGUAGES } from "@/constants";

export const routing = defineRouting({
  locales: DEFAULT_LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
});

export type Locale = (typeof routing.locales)[number];
