import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import CountryForm from "@/components/admin/countries/CountryForm";
import { Pencil } from "lucide-react";
import { api } from "@/lib/api";
import ErrorState from "@/components/shared/ErrorState";

export async function generateMetadata() {
  const t = await getTranslations("EditCountryPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const EditCountryPage = async ({ params }: RouteParams) => {
  const [{ countrySlug }, t] = await Promise.all([
    params,
    getTranslations("EditCountryPage"),
  ]);

  if (!countrySlug) return notFound();

  const result = await api.countries.getCountryWithRegions(countrySlug);

  if (!result.success)
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="border-border flex flex-col gap-3 border-b pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
            <Pencil className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-heading text-on-surface text-2xl font-bold sm:text-3xl">
              {t("title")}
            </h1>
            <p className="text-body-base text-on-surface-variant mt-1">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Country Form & Preview */}
      <CountryForm
        mode="edit"
        country={result.data.country}
        regionsCounts={result.data.regions.length}
      />
    </div>
  );
};

export default EditCountryPage;
