import { ArrowLeft, Archive } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { api } from "@/lib/api";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import GlobalSearch from "@/components/shared/GlobalSearch";
import Pagination from "@/components/shared/Pagination";
import ErrorState from "@/components/shared/ErrorState";
import DeletedPackingWaysTable from "@/components/admin/packing-ways/DeletedPackingWaysTable";

const DeletedPackingWaysPage = async ({ searchParams }: RouteParams) => {
  const [params, requestHeaders, t, locale] = await Promise.all([
    searchParams,
    headers(),
    getTranslations("DeletedPackingWaysPage"),
    getLocale(),
  ]);

  const result = await api.packingWays.getDeletedPackingWays(requestHeaders, {
    q: params.search_query,
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-2xl">
            <Archive className="size-6" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href={ROUTES.ADMIN_PACKING_WAYS}>
            <ArrowLeft className="me-2 size-4" />
            {t("active")}
          </Link>
        </Button>
      </div>
      <GlobalSearch searchPlaceholder={t("search_placeholder")} />
      {result.data.packingWays.length ? (
        <DeletedPackingWaysTable
          packingWays={result.data.packingWays}
          t={t}
          isRTL={locale === "ar"}
        />
      ) : (
        <div className="rounded-2xl border py-20 text-center">{t("empty")}</div>
      )}
      {result.data.totalPages > 1 && (
        <Pagination totalPages={result.data.totalPages} />
      )}
    </div>
  );
};

export default DeletedPackingWaysPage;
