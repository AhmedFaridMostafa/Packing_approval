import { getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";
import { api } from "@/lib/api";
import RegionForm from "@/components/admin/regions/RegionForm";
import ErrorState from "@/components/shared/ErrorState";
import { headers } from "next/headers";

export async function generateMetadata() {
  const t = await getTranslations("AddRegionPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const AddRegionPage = async () => {
  const [requestHeaders, t] = await Promise.all([
    headers(),
    getTranslations("AddRegionPage"),
  ]);

  const result = await api.countries.getAllActiveCountries(requestHeaders);

  if (!result.success) {
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="border-border flex flex-col gap-3 border-b pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
            <Plus className="h-6 w-6" />
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

      {/* Add Region Form */}
      <RegionForm mode="create" countries={result.data} />
    </div>
  );
};
export default AddRegionPage;
