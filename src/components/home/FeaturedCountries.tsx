import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, File, MapPin } from "lucide-react";
import { ROUTES } from "@/constants/routes";

interface FeaturedCountriesProps {
  countries: FeaturedCountry[];
}

const FeaturedCountries = async ({ countries }: FeaturedCountriesProps) => {
  const [t, locale] = await Promise.all([
    getTranslations("public.home.featured"),
    getLocale(),
  ]);
  const isRTL = locale === "ar";

  return (
    <section className="bg-surface-container py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-section-title text-on-surface font-bold">
              {t("title")}
            </h2>
            <p className="text-body-base text-on-surface-variant mt-2">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href={ROUTES.COUNTRIES}
            className="text-primary hover:text-brand-hover inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
          >
            {t("viewAll")}
            <ArrowRight className="rtl-flip" />
          </Link>
        </div>

        {/* Countries grid / empty state */}
        {countries.length === 0 ? (
          <p className="text-body-base text-on-surface-variant border-border bg-card mt-8 rounded-xl border border-dashed px-6 py-10 text-center">
            {t("empty")}
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {countries.map((c) => (
              <Link
                key={c.id}
                href={ROUTES.COUNTRY(c.slug)}
                className="group border-border bg-card hover:border-primary/40 relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Hover accent blob */}
                <div aria-hidden="true" className="bg-primary/5 feature-blob" />
                {/* feature-blob */}
                {/* Flag + name row */}
                <div className="relative mb-4 flex items-center gap-3">
                  {c.flag_url ? (
                    <div className="ring-border relative h-10 w-10 shrink-0 overflow-hidden rounded-lg shadow-sm ring-1">
                      <Image
                        src={c.flag_url}
                        alt={`${isRTL ? c.name_ar : c.name_en} ${t("flagAlt")}`}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="bg-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl shadow-sm">
                      🌍
                    </div>
                  )}
                  <h3 className="text-card-title text-on-surface truncate font-semibold">
                    {isRTL ? c.name_ar : c.name_en}
                  </h3>
                </div>

                {/* Stats chips */}
                <div className="relative flex flex-wrap gap-2">
                  <span className="bg-accent text-caption text-primary inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium">
                    <MapPin className="size-5" />
                    {t("regionsCount", { count: c.region_count })}
                  </span>
                  <span className="bg-surface-container-high text-caption text-on-surface-variant inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium">
                    <File className="size-5" />
                    {t("guidelinesCount", { count: c.guidelines_count })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCountries;
