import { History } from "lucide-react";
import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { api } from "@/lib/api";
import ErrorState from "@/components/shared/ErrorState";
import Pagination from "@/components/shared/Pagination";
import AdminHistoryTable from "@/components/admin/history/AdminHistoryTable";
import HistoryFilterBar from "@/components/admin/history/HistoryFilterBar";
import HistoryFilterBarSkeleton from "@/components/skeleton/HistoryFilterBarSkeleton";

const AdminHistoryPage = async ({ searchParams }: RouteParams) => {
  const [params, requestHeaders, t, locale] = await Promise.all([
    searchParams,
    headers(),
    getTranslations("AdminHistoryPage"),
    getLocale(),
  ]);

  const result = await api.history.getPackingHistory(requestHeaders, {
    q: params.search_query,
    action: params.action,
    country_id: params.country_id ? Number(params.country_id) : undefined,
    region_id: params.region_id ? Number(params.region_id) : undefined,
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

  const { history, totalPages } = result.data;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
          <History className="size-6" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>
      <Suspense fallback={<HistoryFilterBarSkeleton />}>
        <HistoryFilterBar
          requestHeaders={requestHeaders}
          searchPlaceholder={t("search_placeholder")}
          allActions={t("filters.all_actions")}
          allCountries={t("filters.all_countries")}
          allRegions={t("filters.all_regions")}
          allCategories={t("filters.all_categories")}
          actionLabels={{
            create: t("actions.CREATE"),
            update: t("actions.UPDATE"),
            delete: t("actions.DELETE"),
          }}
        />
      </Suspense>
      {history.length ? (
        <AdminHistoryTable history={history} t={t} isRTL={locale === "ar"} />
      ) : (
        <div className="rounded-2xl border py-20 text-center">
          <History className="text-muted-foreground/40 mx-auto mb-4 size-14" />
          <h2 className="text-xl font-bold">{t("empty.title")}</h2>
          <p className="text-muted-foreground">{t("empty.description")}</p>
        </div>
      )}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default AdminHistoryPage;
