import { getLocale, getTranslations } from "next-intl/server";
import { MapPin, Plus } from "lucide-react";
import { api } from "@/lib/api";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/Pagination";
import GlobalSearch from "@/components/shared/GlobalSearch";
import ErrorState from "@/components/shared/ErrorState";
import AdminRegionsTable from "@/components/admin/regions/AdminRegionsTable";

export async function generateMetadata() {
  const t = await getTranslations("AdminRegionsPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const AdminRegionsPage = async ({ searchParams }: RouteParams) => {
  const [{ search_query, page }, t, locale] = await Promise.all([
    searchParams,
    getTranslations("AdminRegionsPage"),
    getLocale(),
  ]);

  const currentPage = page ? parseInt(page) : 1;
  const searchQuery = search_query ?? "";

  const isRTL = locale === "ar";

  const result = await api.regions.getRegions(searchQuery, currentPage);

  if (!result.success) {
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );
  }

  const { regions, totalPages } = result.data;

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
            <MapPin className="h-6 w-6" />
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

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-11 shrink-0 items-center gap-2 rounded-xl font-semibold shadow-xs"
          >
            <Link href={ROUTES.ADMIN_REGIONS_ADD}>
              <Plus className="h-5 w-5" />
              {t("add_region")}
            </Link>
          </Button>
        </div>
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
        <AdminRegionsTable regions={regions} t={t} isRTL={isRTL} />
      )}

      {/* Pagination */}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default AdminRegionsPage;
