import Image from "next/image";
import SocialAuthForm from "@/components/forms/SocialAuthForm";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) redirect("/");

  const t = await getTranslations("Auth.Auth_layout");

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="light-border min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-130 sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h1-bold text-dark100_light900">{t("title")}</h1>
            <p className="paragraph-regular text-dark500_light400">
              {t("description")}
            </p>
          </div>
          <Image
            src="/site-logo.png"
            alt={t("logo_alt")}
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        {children}

        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
