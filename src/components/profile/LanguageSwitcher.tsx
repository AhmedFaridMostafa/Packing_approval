"use client";

import React, { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

import { toast } from "sonner";

import type { Locale } from "@/i18n/routing";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageOption {
  value: Locale;
  label: string;
}

interface LanguageSwitcherProps {
  variant: "button" | "select";
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant }) => {
  const t = useTranslations("languageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const languageOptions: LanguageOption[] = [
    { value: "en", label: t("languageOptions.en") },
    { value: "ar", label: t("languageOptions.ar") },
  ];

  const currentLanguage =
    languageOptions.find((opt) => opt.value === locale) || languageOptions[0];
  const nextLanguage =
    languageOptions.find((opt) => opt.value !== locale) || languageOptions[0];

  const switchLanguage = (newLang: Locale) => {
    if (isPending || newLang === locale) return;
    startTransition(async () => {
      try {
        router.replace(pathname, { locale: newLang });
        toast.success(
          `${t("switchedTo")} ${languageOptions.find((opt) => opt.value === newLang)?.label}`,
        );
      } catch {
        toast.error(t("failed"));
      }
    });
  };

  if (variant === "button") {
    return (
      <Button
        onClick={() => switchLanguage(nextLanguage.value)}
        type="button"
        variant="outline"
        disabled={isPending}
        size="icon"
        className="cursor-pointer"
      >
        {isPending ? <Spinner /> : nextLanguage.value.toUpperCase()}
      </Button>
    );
  }

  return (
    <Select
      value={currentLanguage.value}
      onValueChange={(val) => switchLanguage(val as Locale)}
      disabled={isPending}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languageOptions.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
