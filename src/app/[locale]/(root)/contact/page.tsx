import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { Compass, Flag, KeyRound, Mail, Phone, ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/constants";
import { auth } from "@/lib/auth/auth";
import { Button } from "@/components/ui/button";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA (bilingual — next-intl resolves locale automatically)
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata() {
  const t = await getTranslations("ContactPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

const ContactPage = async () => {
  const [t, requestHeaders] = await Promise.all([
    getTranslations("ContactPage"),
    headers(),
  ]);

  const session = await auth.api.getSession({ headers: requestHeaders });
  const isAdmin = session?.user?.role === "admin";

  return (
    <section className="bg-surface-container-lowest min-h-screen py-10 sm:py-16">
      <div className="section-container">
        {/* Header row */}
        <div className="border-border mb-10 flex flex-col gap-3 border-b pb-6">
          <h1 className="font-heading text-section-title text-on-surface font-bold">
            {t("title")}
          </h1>
          <p className="text-body-base text-on-surface-variant max-w-2xl">
            {t("description")}
          </p>
        </div>
        {/* Guidance cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Find a guideline */}
          <div className="border-border bg-card hover:border-primary/30 rounded-xl border p-7 transition-all duration-300 hover:shadow-md">
            <div className="bg-accent text-primary mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl">
              <Compass className="size-6" />
            </div>
            <h2 className="text-card-title text-on-surface font-semibold">
              {t("cards.guidelines.title")}
            </h2>
            <p className="text-body-base text-on-surface-variant mt-2 leading-relaxed">
              {t("cards.guidelines.description")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-xl">
                <Link href={ROUTES.COUNTRIES}>
                  {t("cards.guidelines.primary_cta")}
                  <ArrowRight className="rtl-flip size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href={ROUTES.REGIONS}>
                  {t("cards.guidelines.secondary_cta")}
                </Link>
              </Button>
            </div>
          </div>

          {/* Get an account */}
          <div className="border-border bg-card hover:border-primary/30 rounded-xl border p-7 transition-all duration-300 hover:shadow-md">
            <div className="bg-accent text-primary mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl">
              <KeyRound className="size-6" />
            </div>
            <h2 className="text-card-title text-on-surface font-semibold">
              {t("cards.account.title")}
            </h2>
            <p className="text-body-base text-on-surface-variant mt-2 leading-relaxed">
              {t("cards.account.description")}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" className="rounded-xl">
                <Link href={ROUTES.SIGN_IN}>
                  {t("cards.account.cta")}
                  <ArrowRight className="rtl-flip size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Report a problem */}
          <div className="border-border bg-card hover:border-primary/30 rounded-xl border p-7 transition-all duration-300 hover:shadow-md">
            <div className="bg-accent text-primary mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl">
              <Flag className="size-6" />
            </div>
            <h2 className="text-card-title text-on-surface font-semibold">
              {t("cards.report.title")}
            </h2>
            <p className="text-body-base text-on-surface-variant mt-2 leading-relaxed">
              {t("cards.report.description")}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" className="rounded-xl">
                <Link href={isAdmin ? ROUTES.ADMIN : ROUTES.SIGN_IN}>
                  {isAdmin
                    ? t("cards.report.cta_admin")
                    : t("cards.report.cta_user")}
                  <ArrowRight className="rtl-flip size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Direct contact — owner-supplied, public */}
        <div className="border-border bg-card hover:border-primary/30 mt-6 rounded-xl border p-7 transition-all duration-300 hover:shadow-md">
        <div className="bg-accent text-primary mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl">
          <Mail className="size-6" />
        </div>
        <h2 className="text-card-title text-on-surface font-semibold">
          {t("direct.title")}
        </h2>
        <p className="text-body-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
          {t("direct.description")}
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
          <div className="flex items-center gap-3">
            <Mail className="text-primary size-5 shrink-0" aria-hidden="true" />
            <span className="text-body-base text-on-surface-variant">
              {t("direct.email_label")}:
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary text-body-base font-semibold hover:underline"
              dir="ltr"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-primary size-5 shrink-0" aria-hidden="true" />
            <span className="text-body-base text-on-surface-variant">
              {t("direct.phone_label")}:
            </span>
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="text-primary text-body-base font-semibold hover:underline"
              dir="ltr"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
