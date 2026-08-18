import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { api } from "@/lib/api";
import CountryNav from "@/components/countries/CountryNav";
import CountryHeader from "@/components/countries/CountryHeader";
import RegionsList from "@/components/regions/RegionsList";
import RegionsEmpty from "@/components/regions/RegionsEmpty";
import { Info } from "lucide-react";
import ErrorState from "@/components/shared/ErrorState";

export const generateMetadata = async ({ params }: RouteParams) => {
  const [{ countrySlug, locale }, t] = await Promise.all([
    params,
    getTranslations("CountryRegionsPage.meta_data"),
  ]);

  const result = await api.countries.getCountryWithRegions(countrySlug);

  if (!result.success) return { title: "Error" };

  const name =
    locale === "ar" ? result.data.country.name_ar : result.data.country.name_en;

  return {
    title: t("title", { Region: name }),
    description: t("description", { Region: name }),
  };
};

const CountryRegionsPage = async ({ params }: RouteParams) => {
  const [{ locale, countrySlug }, requestHeaders, t] = await Promise.all([
    params,
    headers(),

    getTranslations("CountryRegionsPage"),
  ]);

  const [session, result] = await Promise.all([
    auth.api.getSession({ headers: requestHeaders }),
    api.countries.getCountryWithRegions(countrySlug),
  ]);

  if (!result.success)
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );

  const { country, regions, total_guidelines: totalGuidelines } = result.data;

  const isAdmin = session?.user?.role === "admin";
  const isRTL = locale === "ar";

  const countryName = isRTL ? country.name_ar : country.name_en;

  return (
    <section className="py-10 sm:py-16">
      <div className="section-container">
        <CountryNav
          homeNav={t("home_breadcrumb")}
          countriesNav={t("countries_breadcrumb")}
          countryName={countryName}
        />

        <CountryHeader
          isRTL={isRTL}
          country={country}
          isAdmin={isAdmin}
          guidelinesBadge={t("guidelines_badge", { count: totalGuidelines })}
          addRegionCta={t("add_region_cta")}
        />
        <h2 className="font-heading text-on-surface-variant mb-6 text-sm font-semibold tracking-wider uppercase">
          {t("regions_grid_title")}
        </h2>
        {regions.length > 0 ? (
          <RegionsList
            translate={t}
            isRTL={isRTL}
            countrySlug={countrySlug}
            regions={regions}
          />
        ) : (
          <RegionsEmpty
            IconTitle={Info}
            title={t("empty_title")}
            description={t("empty_desc")}
          />
        )}
      </div>
    </section>
  );
};

export default CountryRegionsPage;
