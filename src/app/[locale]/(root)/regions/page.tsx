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

  const [validationT, translate, locale, requestHeaders] = await Promise.all([
    getTranslations("Validation"),
    getTranslations("RegionsPage"),
    getLocale(),
    headers(),
  ]);

  const [result, session] = await Promise.all([
    api.regions.getRegions(searchQuery || undefined, currentPage, validationT),
    auth.api.getSession({ headers: requestHeaders }),
  ]);
  const isAdmin = session?.user?.role === "admin";
  const isRTL = locale === "ar";
  if (!result.success) {
    return (
      <section className="bg-surface-container-lowest section-container flex min-h-screen items-center justify-center">
        <p className="text-destructive text-sm">{result.error.message}</p>
      </section>
    );
  }

  const { regions, totalItems, totalPages } = result.data;

  return (
    <section className="bg-surface-container-lowest section-container min-h-screen py-10 sm:py-16">
      {/* Header row: title + admin CTA */}
      <div className="border-border mb-8 flex flex-col gap-6 border-b pb-6">
        <AllRegionsTitle
          t={translate}
          totalItems={totalItems}
          isAdmin={isAdmin}
        />

        {/* Search bar */}
        <div className="flex justify-start md:justify-end">
          <Suspense fallback={<SearchSkeleton />}>
            <GlobalSearch searchPlaceholder={translate("search_placeholder")} />
          </Suspense>
        </div>
      </div>

      {/* Content */}
      {regions.length > 0 ? (
        <>
          <RegionsList regions={regions} translate={translate} isRTL={isRTL} />
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <RegionsEmpty
          IconTitle={MapPinOff}
          title={translate("empty_state_title")}
          description={translate("empty_state_desc")}
        />
      )}
    </section>
  );
};

export default AllRegionsPage;
