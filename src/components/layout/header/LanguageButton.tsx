"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useLocaleSwitcher } from "@/hooks/use-locale-switcher";
import { Globe } from "lucide-react";

export function LanguageButton() {
  const { nextLocale, switchLocale, isPending } = useLocaleSwitcher();

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      disabled={isPending}
      onClick={() => switchLocale(nextLocale)}
    >
      {isPending ? <Spinner /> : <Globe width={20} height={20} />}
    </Button>
  );
}
