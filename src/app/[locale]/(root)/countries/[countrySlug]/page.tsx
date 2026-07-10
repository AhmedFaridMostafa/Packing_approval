import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { api } from "@/lib/api";
import CountryNav from "@/components/countries/slug/CountryNav";
import CountryHeader from "@/components/countries/slug/CountryHeader";
import RegionsList from "@/components/countries/slug/RegionsList";

export const generateMetadata = async ({ params }: RouteParams) => {
  const [{ countrySlug, locale }, validationT, metaT] = await Promise.all([
    params,
    getTranslations("Validation"),
    getTranslations("CountryRegionsPage.meta_data"),
  ]);

  const result = await api.countries.getCountryWithRegions(
    countrySlug,
    validationT,
  );

  if (!result.success) {
    if (result.status === 404) notFound();
    return { title: "Error" };
  }

  const isRTL = locale === "ar";
  const name = isRTL
    ? result.data.country.name_ar
    : result.data.country.name_en;

  return {
    title: metaT("title", { Region: name }),
    description: metaT("description", { Region: name }),
  };
};

const CountryRegionsPage = async ({ params }: RouteParams) => {
  const [{ locale, countrySlug }, requestHeaders, validationT, t] =
    await Promise.all([
      params,
      headers(),
      getTranslations("Validation"),
      getTranslations("CountryRegionsPage"),
    ]);

  const [session, result] = await Promise.all([
    auth.api.getSession({ headers: requestHeaders }),
    api.countries.getCountryWithRegions(countrySlug, validationT),
  ]);

  if (!result.success) {
    if (result.status === 404) notFound();
    return (
      <section className="bg-surface-container-lowest section-container flex min-h-screen items-center justify-center">
        <p className="text-destructive text-sm">{result.error.message}</p>
      </section>
    );
  }

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

        <RegionsList
          isRTL={isRTL}
          t={t}
          countrySlug={countrySlug}
          countryId={country.id}
          isAdmin={isAdmin}
          regions={regions}
        />
      </div>
    </section>
  );
};

export default CountryRegionsPage;
