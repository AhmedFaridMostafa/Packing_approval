import { getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { api } from "@/lib/api";
import Packing from "@/components/regions/detail/Packing";
import Nav from "@/components/regions/detail/Nav";
import Header from "@/components/regions/detail/Header";
import GuidelinesEmpty from "@/components/regions/detail/GuidelinesEmpty";
import ErrorState from "@/components/shared/ErrorState";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const generateMetadata = async ({ params }: RouteParams) => {
  const [{ countrySlug, regionSlug, locale }, t] = await Promise.all([
    params,
    getTranslations("public.regionPackingWays.metadata"),
  ]);

  const result = await api.countries.getRegionPackingData(
    countrySlug,
    regionSlug,
  );

  if (!result.success) {
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
    title: t("title", { regionName, countryName }),
    description: t("description", { regionName, countryName }),
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const RegionPackingWaysPage = async ({ params }: RouteParams) => {
  const [{ countrySlug, regionSlug, locale }, t, requestHeaders] =
    await Promise.all([
      params,
      getTranslations("public.regionPackingWays"),
      headers(),
    ]);

  const result = await api.countries.getRegionPackingData(
    countrySlug,
    regionSlug,
  );

  if (!result.success)
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );

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
          <Nav
            homeNav={t("breadcrumb.home")}
            countriesNav={t("breadcrumb.countries")}
            countrySlug={countrySlug}
            countryName={countryName}
            regionName={regionName}
          />

          <Header
            countryName={countryName}
            regionName={regionName}
            guidelinesBadge={t("guidelinesBadge", {
              count: totalGuidelines,
            })}
            accountLabel={t("accountLabel")}
            region={region}
          />
        </div>
      </section>

      {/* Empty State or Grouped Guidelines */}
      {groupedPacking.length === 0 ? (
        <GuidelinesEmpty
          title={t("empty.title")}
          description={t("noItemsInRegion")}
        />
      ) : (
        <Packing
          country={country}
          groupedPacking={groupedPacking}
          region={region}
          isRTL={isRTL}
          isAdmin={isAdmin}
          generatingPdf={t("generatingPdf")}
          downloadPdfCta={t("actions.downloadPdf")}
        />
      )}
    </>
  );
};

export default RegionPackingWaysPage;
