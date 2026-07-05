"use client";

// UI
import { Button } from "@/components/ui/button";

// Constants
import { type OAuthProvider, SOCIAL_OAUTH_PROVIDERS } from "@/constants";
import { ROUTES } from "@/constants/routes";

// Navigation
import { useRouter } from "@/i18n/navigation";

// Lang
import { useTranslations } from "next-intl";

// Auth
import { signIn } from "@/lib/auth/auth-client";

// Hook
import { toast } from "sonner";
import { useState } from "react";

const SocialAuthForm = () => {
  const t = useTranslations("Auth.SocialAuth");

  const [pendingProvider, setPendingProvider] = useState<OAuthProvider | null>(
    null,
  );

  const router = useRouter();

  const handleSignIn = async (provider: OAuthProvider) => {
    setPendingProvider(provider);

    try {
      await signIn.social(
        { provider },
        {
          onSuccess: () => {
            toast.success(t("success"));
            router.push(ROUTES.HOME);
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(t("failed"), {
              description: ctx.error.message || t("global_error"),
            });
          },
        },
      );
    } catch (error) {
      toast.error(t("failed"), {
        description: error instanceof Error ? error.message : t("global_error"),
      });
    } finally {
      setPendingProvider(null);
    }
  };

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
      {SOCIAL_OAUTH_PROVIDERS.map((provider) => {
        const isPending = pendingProvider === provider.name;
        const localizedProviderName = t(`providers.${provider.name}`);
        return (
          <Button
            key={provider.name}
            disabled={pendingProvider !== null}
            className="flex-1 cursor-pointer"
            onClick={() => handleSignIn(provider.name)}
          >
            <provider.icon className="size-5" />
            {isPending
              ? t("signing_in", { provider: localizedProviderName })
              : t("sign_in_with", { provider: localizedProviderName })}
          </Button>
        );
      })}
    </div>
  );
};

export default SocialAuthForm;
