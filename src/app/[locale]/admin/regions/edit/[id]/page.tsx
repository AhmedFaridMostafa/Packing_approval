import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import { api } from "@/lib/api";
import ErrorState from "@/components/shared/ErrorState";
import RegionForm from "@/components/admin/regions/RegionForm";

export async function generateMetadata() {
  const t = await getTranslations("EditRegionPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const EditRegionPage = async ({ params }: RouteParams) => {
  const [{ id }, requestHeaders] = await Promise.all([params, headers()]);

  const regionId = parseInt(id);
  if (isNaN(regionId)) notFound();

  const result = await api.regions.getRegionById(requestHeaders, regionId);

  if (!result.success) {
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );
  }

  const t = await getTranslations("EditRegionPage");

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

      {/* Edit Region Form */}
      <RegionForm
        mode="edit"
        region={result.data.region}
        countries={[result.data.country]}
      />
    </div>
  );
};
export default EditRegionPage;
