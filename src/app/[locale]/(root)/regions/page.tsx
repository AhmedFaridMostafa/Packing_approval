import { api } from "@/lib/api";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { Suspense } from "react";
import AllRegionsTitle from "@/components/regions/AllRegionsTitle";
import GlobalSearch from "@/components/shared/GlobalSearch";
import RegionsEmpty from "@/components/regions/RegionsEmpty";
import SearchSkeleton from "@/components/skeleton/SearchSkeleton";
import RegionsList from "@/components/regions/RegionsList";
import Pagination from "@/components/shared/Pagination";
import { MapPinOff } from "lucide-react";
import ErrorState from "@/components/shared/ErrorState";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA (bilingual — next-intl resolves locale automatically)
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata() {
  const t = await getTranslations("RegionsPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

const AllRegionsPage = async ({ searchParams }: RouteParams) => {
  const { page, search_query } = await searchParams;
  const currentPage = Number(page) || 1;
  const searchQuery = search_query ?? "";

  const [t, locale, requestHeaders] = await Promise.all([
    getTranslations("RegionsPage"),
    getLocale(),
    headers(),
  ]);

  const [result, session] = await Promise.all([
    api.regions.getRegions(searchQuery, currentPage),
    auth.api.getSession({ headers: requestHeaders }),
  ]);

  const isAdmin = session?.user?.role === "admin";
  const isRTL = locale === "ar";
  if (!result.success) {
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );
  }

  const { regions, totalItems, totalPages } = result.data;

  return (
    <section className="bg-surface-container-lowest section-container min-h-screen py-10 sm:py-16">
      {/* Header row: title + admin CTA */}
      <div className="border-border mb-8 flex flex-col gap-6 border-b pb-6">
        <AllRegionsTitle t={t} totalItems={totalItems} isAdmin={isAdmin} />

        {/* Search bar */}
        <div className="flex justify-start md:justify-end">
          <Suspense fallback={<SearchSkeleton />}>
            <GlobalSearch searchPlaceholder={t("search_placeholder")} />
          </Suspense>
        </div>
      </div>

      {/* Content */}
      {regions.length > 0 ? (
        <>
          <RegionsList regions={regions} translate={t} isRTL={isRTL} />
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <RegionsEmpty
          IconTitle={MapPinOff}
          title={t("empty_state_title")}
          description={t("empty_state_desc")}
        />
      )}
    </section>
  );
};

export default AllRegionsPage;
