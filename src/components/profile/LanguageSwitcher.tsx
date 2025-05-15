"use client";
import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import toast from "react-hot-toast";
import { setLanguageCookie } from "@/server/actions";
import Button from "../Button";
import SelectField from "../form/SelectField";
import { Lang } from "@/i18n.config";
import SpinnerMini from "../SpinnerMini";

interface LanguageOption {
  value: Lang;
  label: string;
}

interface LanguageSwitcherProps {
  variant: "button" | "select";
  className?: string;
}

const languageOptions: LanguageOption[] = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية" },
];

const massage = {
  switchLanguage: {
    en: "Language switched to",
    ar: "تم تبديل اللغة إلى",
  },
  Failed: {
    en: "Failed to switch language",
    ar: "فشل في تبديل اللغة",
  },
  label: {
    en: "language",
    ar: "اللغة",
  },
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant,
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { lang } = useParams() as { lang: Lang };
  const [isPending, startTransition] = useTransition();
  const currentLanguage =
    languageOptions.find((opt) => opt.value === lang) || languageOptions[0];
  const nextLanguage =
    languageOptions.find((opt) => opt.value !== currentLanguage.value) ||
    languageOptions[0];

  const switchLanguage = async (newLang: Lang) => {
    if (isPending || newLang === lang) return;

    startTransition(async () => {
      try {
        await setLanguageCookie(newLang);
        const newPath =
          pathname?.replace(`/${lang}`, `/${newLang}`) ?? `/${newLang}`;
        router.push(newPath);
        toast.success(
          `${lang !== "en" ? massage.switchLanguage.en : massage.switchLanguage.ar} ${languageOptions.find((opt) => opt.value === newLang)?.label}`,
        );
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : massage.Failed[lang],
        );
      }
    });
  };

  if (variant === "button") {
    return (
      <Button
        onClick={() => switchLanguage(nextLanguage.value)}
        type="button"
        theme="light"
        disabled={isPending}
        className={className}
      >
        {isPending ? <SpinnerMini /> : nextLanguage.value.toUpperCase()}
      </Button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <SelectField
        name="language"
        label={massage.label[lang]}
        options={languageOptions}
        value={currentLanguage}
        onChange={(option) => {
          if (option) {
            switchLanguage(option.value as Lang);
          }
        }}
        isClearable={false}
        isLoading={isPending}
      />
    </div>
  );
};

export default LanguageSwitcher;
