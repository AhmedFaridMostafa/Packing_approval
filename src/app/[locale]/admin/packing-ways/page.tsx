import { Archive, Package, Plus } from "lucide-react";
import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { api } from "@/lib/api";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/Pagination";
import ErrorState from "@/components/shared/ErrorState";
import AdminPackingWaysTable from "@/components/admin/packing-ways/AdminPackingWaysTable";
import PackingWaysFilterBar from "@/components/admin/packing-ways/PackingWaysFilterBar";
import PackingWaysFilterBarSkeleton from "@/components/skeleton/PackingWaysFilterBarSkeleton";

const AdminPackingWaysPage = async ({ searchParams }: RouteParams) => {
  const [params, requestHeaders, t, locale] = await Promise.all([
    searchParams,
    headers(),
    getTranslations("AdminPackingWaysPage"),
    getLocale(),
  ]);

  const result = await api.packingWays.getPackingWays(requestHeaders, {
    q: params.search_query,
    country_id: params.country_id ? Number(params.country_id) : undefined,
    category_id: params.category_id ? Number(params.category_id) : undefined,
    page: params.page ? Number(params.page) : undefined,
  });

  if (!result.success)
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );
  const { packingWays, totalPages } = result.data;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
            <Package className="size-6" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("title")}
            </h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href={ROUTES.ADMIN_PACKING_WAYS_DELETED}>
              <Archive className="me-2 size-4" />
              {t("deleted")}
            </Link>
          </Button>
          <Button asChild>
            <Link href={ROUTES.ADMIN_PACKING_WAYS_ADD}>
              <Plus className="me-2 size-4" />
              {t("add")}
            </Link>
          </Button>
        </div>
      </div>
      <Suspense fallback={<PackingWaysFilterBarSkeleton />}>
        <PackingWaysFilterBar
          requestHeaders={requestHeaders}
          searchPlaceholder={t("search_placeholder")}
          allCountries={t("filters.all_countries")}
          allCategories={t("filters.all_categories")}
        />
      </Suspense>
      {packingWays.length ? (
        <AdminPackingWaysTable
          packingWays={packingWays}
          t={t}
          isRTL={locale === "ar"}
        />
      ) : (
        <div className="rounded-2xl border py-20 text-center">
          <Package className="text-muted-foreground/40 mx-auto mb-4 size-14" />
          <h2 className="text-xl font-bold">{t("empty.title")}</h2>
          <p className="text-muted-foreground">{t("empty.description")}</p>
        </div>
      )}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default AdminPackingWaysPage;
