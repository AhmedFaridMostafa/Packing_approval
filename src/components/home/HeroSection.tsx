import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { ArrowRight } from "lucide-react";

export const HeroSection = async () => {
  const t = await getTranslations("HomePage.hero");

  return (
    <section className="hero-gradient section-container relative overflow-hidden py-24 md:py-32 lg:py-36">
      <div className="mx-auto max-w-3xl text-center">
        {/* Tagline pill */}
        <div className="border-primary/20 bg-accent mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
          <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
          <span className="text-caption text-primary font-sans font-semibold tracking-widest uppercase">
            {t("tagline")}
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-heading text-hero-h1-mobile text-on-surface md:text-hero-h1 leading-tight font-bold tracking-tight">
          {t.rich("title", {
            br: (chunks) => (
              <>
                <br />
                <span className="text-primary">{chunks}</span>
              </>
            ),
          })}
        </h1>

        {/* Description */}
        <p className="text-body-base text-on-surface-variant mx-auto mt-6 max-w-xl leading-relaxed">
          {t("description")}
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={ROUTES.COUNTRIES}
            className="bg-primary text-primary-foreground hover:bg-brand-hover inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          >
            {t("browse_cta")}
            <ArrowRight className="rtl-flip" />
          </Link>

          <Link
            href={ROUTES.SIGN_IN}
            className="border-border bg-card text-on-surface hover:bg-accent hover:text-primary inline-flex items-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
          >
            {t("signin_cta")}
          </Link>
        </div>
      </div>
    </section>
  );
};
