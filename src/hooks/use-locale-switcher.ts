"use client";

import { useTransition } from "react";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

import { toast } from "sonner";

interface UseLocaleSwitcherOptions {
  showToast?: boolean;
}

export function useLocaleSwitcher({
  showToast = true,
}: UseLocaleSwitcherOptions = {}) {
  const t = useTranslations("languageSwitcher");

  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = useLocale() as Locale;

  const [isPending, startTransition] = useTransition();

  const switchLocale = (locale: Locale) => {
    if (locale === currentLocale || isPending) {
      return;
    }

    startTransition(() => {
      try {
        router.replace(pathname, { locale });

        if (showToast) {
          toast.success(`${t("switchedTo")} ${t(`languageOptions.${locale}`)}`);
        }
      } catch {
        if (showToast) {
          toast.error(t("failed"));
        }
      }
    });
  };

  const localeOptions = routing.locales.map((locale) => ({
    value: locale,
    label: t(`languageOptions.${locale}`),
  }));

  const nextLocale =
    localeOptions.find((item) => item.value !== currentLocale)?.value ??
    currentLocale;

  return {
    currentLocale,
    localeOptions,
    nextLocale,
    isPending,
    switchLocale,
  };
}
