import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import RegionPacking from "@/components/Region/RegionPacking";
import { api } from "@/lib/api";
import RegionNav from "@/components/Region/RegionNav";
import RegionHeader from "@/components/Region/RegionHeader";
import GuidelinesEmpty from "@/components/Region/GuidelinesEmpty";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const generateMetadata = async ({ params }: RouteParams) => {
  const [{ countrySlug, regionSlug, locale }, validationT, metaT] =
    await Promise.all([
      params,
      getTranslations("Validation"),
      getTranslations("RegionPackingWaysPage.meta_data"),
    ]);

  const result = await api.countries.getRegionPackingData(
    countrySlug,
    regionSlug,
    validationT,
  );

  if (!result.success) {
    if (result.status === 404) notFound();
    return { title: "Error" };
  }

  const isRTL = locale === "ar";

  const countryName = isRTL
    ? result.data.country.name_ar
    : result.data.country.name_en;
  const regionName = isRTL
    ? result.data.region.label_name_ar
    : result.data.region.label_name_en;

  return {
    title: metaT("title", { regionName, countryName }),
    description: metaT("description", { regionName, countryName }),
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const RegionPackingWaysPage = async ({ params }: RouteParams) => {
  const [{ countrySlug, regionSlug, locale }, validationT, t, requestHeaders] =
    await Promise.all([
      params,
      getTranslations("Validation"),
      getTranslations("RegionPackingWaysPage"),
      headers(),
    ]);

  const result = await api.countries.getRegionPackingData(
    countrySlug,
    regionSlug,
    validationT,
  );

  if (!result.success) {
    if (result.status === 404) notFound();
    return (
      <section className="bg-surface-container-lowest section-container flex min-h-screen items-center justify-center">
        <p className="text-destructive text-sm">{result.error.message}</p>
      </section>
    );
  }

  // Authenticate session
  const session = await auth.api.getSession({ headers: requestHeaders });
  const isAdmin = session?.user?.role === "admin";
  const isRTL = locale === "ar";

  // ── Fetch country ──
  const { country, groupedPacking, region, totalGuidelines } = result.data;

  // ── Derived display values ──
  const countryName = isRTL ? country.name_ar : country.name_en;
  const regionName = isRTL ? region.label_name_ar : region.label_name_en;

  return (
    <>
      <section className="py-10 pb-0 sm:py-12">
        <div className="section-container">
          <RegionNav
            homeNav={t("home_breadcrumb")}
            countriesNav={t("countries_breadcrumb")}
            countrySlug={countrySlug}
            countryName={countryName}
            regionName={regionName}
          />

          <RegionHeader
            countryName={countryName}
            regionName={regionName}
            guidelinesBadge={t("guidelines_badge", {
              count: totalGuidelines,
            })}
            accountLabel={t("account_label")}
            region={region}
          />
        </div>
      </section>

      {/* Empty State or Grouped Guidelines */}
      {groupedPacking.length === 0 ? (
        <GuidelinesEmpty
          title={t("empty_state_title")}
          description={t("no_items_in_region")}
        />
      ) : (
        <RegionPacking
          country={country}
          groupedPacking={groupedPacking}
          region={region}
          isRTL={isRTL}
          isAdmin={isAdmin}
          generatingPdf={t("generating_pdf")}
          downloadPdfCta={t("download_pdf_cta")}
        />
      )}
    </>
  );
};

export default RegionPackingWaysPage;
