import { getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { api } from "@/lib/api";
import CountryNav from "@/components/countries/CountryNav";
import CountryHeader from "@/components/countries/CountryHeader";
import List from "@/components/regions/list/List";
import Empty from "@/components/regions/list/Empty";
import { Info } from "lucide-react";
import ErrorState from "@/components/shared/ErrorState";

export const generateMetadata = async ({ params }: RouteParams) => {
  const [{ countrySlug, locale }, t] = await Promise.all([
    params,
    getTranslations("public.countryRegions.metadata"),
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

    getTranslations("public.countryRegions"),
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
          homeNav={t("breadcrumb.home")}
          countriesNav={t("breadcrumb.countries")}
          countryName={countryName}
        />

        <CountryHeader
          isRTL={isRTL}
          country={country}
          isAdmin={isAdmin}
          guidelinesBadge={t("guidelinesBadge", { count: totalGuidelines })}
          addRegionCta={t("actions.addRegion")}
        />
        <h2 className="font-heading text-on-surface-variant mb-6 text-sm font-semibold tracking-wider uppercase">
          {t("regionsGridTitle")}
        </h2>
        {regions.length > 0 ? (
          <List
            translate={t}
            isRTL={isRTL}
            countrySlug={countrySlug}
            regions={regions}
          />
        ) : (
          <Empty
            IconTitle={Info}
            title={t("empty.title")}
            description={t("empty.description")}
          />
        )}
      </div>
    </section>
  );
};

export default CountryRegionsPage;
