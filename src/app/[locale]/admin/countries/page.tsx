import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Globe, Plus } from "lucide-react";
import { api } from "@/lib/api";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/Pagination";
import AdminCountriesTable from "@/components/admin/countries/AdminCountriesTable";
import GlobalSearch from "@/components/shared/GlobalSearch";

export async function generateMetadata() {
  const t = await getTranslations("AdminCountriesPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

interface AdminCountriesPageProps {
  searchParams: Promise<{ search_query?: string; page?: string }>;
}

const AdminCountriesPage = async ({
  searchParams,
}: AdminCountriesPageProps) => {
  const [{ search_query, page }, t, validationT, locale] = await Promise.all([
    searchParams,
    getTranslations("AdminCountriesPage"),
    getTranslations("Validation"),
    getLocale(),
  ]);

  const currentPage = page ? parseInt(page) : 1;
  const isRTL = locale === "ar";

  const response = await api.countries.getCountries(
    search_query,
    currentPage,
    validationT,
  );

  if (!response.success) {
    return (
      <section className="bg-surface-container-lowest section-container flex min-h-screen items-center justify-center">
        <p className="text-destructive text-sm">{response.error.message}</p>
      </section>
    );
  }

  const { countries, totalPages } = response.data;

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
            <Globe className="h-6 w-6" />
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
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-11 shrink-0 items-center gap-2 rounded-xl font-semibold shadow-sm"
        >
          <Link href={ROUTES.ADMIN_COUNTRIES_ADD}>
            <Plus className="h-5 w-5" />
            {t("add_country")}
          </Link>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <GlobalSearch searchPlaceholder={t("search_placeholder")} />
        <span className="text-on-surface-variant text-caption font-medium">
          {countries.length > 0 && `${countries.length} shown`}
        </span>
      </div>

      {/* Countries Table or Empty State */}
      {countries.length === 0 ? (
        <div className="border-border bg-card flex flex-col items-center justify-center rounded-2xl border py-20 text-center shadow-sm">
          <Globe className="text-on-surface-variant/30 mb-4 h-16 w-16" />
          <h2 className="font-heading text-on-surface mb-1 text-xl font-bold">
            {t("empty.title")}
          </h2>
          <p className="text-on-surface-variant text-body-base max-w-sm">
            {t("empty.description")}
          </p>
        </div>
      ) : (
        <AdminCountriesTable countries={countries} t={t} isRTL={isRTL} />
      )}

      {/* Pagination */}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default AdminCountriesPage;
