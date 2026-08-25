import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Archive, ArrowRight, MapPin } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/Pagination";
import DeletedRegionsTable from "@/components/admin/regions/DeletedRegionsTable";
import GlobalSearch from "@/components/shared/GlobalSearch";
import { api } from "@/lib/api";
import { headers } from "next/headers";
import ErrorState from "@/components/shared/ErrorState";

export async function generateMetadata() {
  const t = await getTranslations("DeletedRegionsPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const DeletedRegionsPage = async ({ searchParams }: RouteParams) => {
  const [{ search_query, page }, t, locale, requestHeaders] = await Promise.all(
    [
      searchParams,
      getTranslations("DeletedRegionsPage"),
      getLocale(),
      headers(),
    ],
  );

  const currentPage = page ? parseInt(page) : 1;
  const isRTL = locale === "ar";

  const result = await api.regions.getDeletedRegions(
    requestHeaders,
    search_query,
    currentPage,
  );

  if (!result.success)
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );

  const { regions, totalPages } = result.data;
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-destructive/10 text-destructive flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
            <Archive className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-heading text-on-surface text-2xl font-bold sm:text-3xl">
              {t("title")}
            </h1>
            <p className="text-body-base text-on-surface-variant mt-0.5">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          className="border-border flex h-11 shrink-0 items-center gap-2 rounded-xl font-semibold shadow-xs"
        >
          <Link href={ROUTES.ADMIN_REGIONS}>
            <ArrowRight className="rtl-flip h-4 w-4" />
            {t("active_regions")}
          </Link>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <GlobalSearch searchPlaceholder={t("search_placeholder")} />
        <span className="text-on-surface-variant text-caption font-medium">
          {regions.length > 0 && `${regions.length} shown`}
        </span>
      </div>

      {/* Regions Table or Empty State */}
      {regions.length === 0 ? (
        <div className="border-border bg-card flex flex-col items-center justify-center rounded-2xl border py-20 text-center shadow-sm">
          <MapPin className="text-on-surface-variant/30 mb-4 h-16 w-16" />
          <h2 className="font-heading text-on-surface mb-1 text-xl font-bold">
            {t("empty.title")}
          </h2>
          <p className="text-on-surface-variant text-body-base max-w-sm">
            {t("empty.description")}
          </p>
        </div>
      ) : (
        <DeletedRegionsTable regions={regions} t={t} isRTL={isRTL} />
      )}

      {/* Pagination */}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default DeletedRegionsPage;
