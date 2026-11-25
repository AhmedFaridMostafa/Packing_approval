import Image from "next/image";
import SocialAuthForm from "@/components/auth/SocialAuthForm";
import { LanguageButton } from "@/components/layout/header/LanguageButton";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) redirect("/");

  const t = await getTranslations("auth.authLayout");

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="border-border bg-card w-full max-w-130 rounded-xl border p-6 sm:p-10">
        {/* Brand lockup + language switcher */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/site-logo.png"
              alt={t("logoAlt")}
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="font-heading text-primary text-2xl font-bold">
              {t("headerTitle")}
            </span>
          </div>
          <LanguageButton />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-section-title text-on-surface font-bold">
            {t("title")}
          </h1>
          <p className="text-body-base text-on-surface-variant">
            {t("description")}
          </p>
        </div>

        {children}

        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
