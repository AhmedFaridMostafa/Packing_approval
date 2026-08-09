import { getTranslations } from "next-intl/server";
import CountryForm from "@/components/admin/countries/CountryForm";
import { Globe } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations("AddCountryPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const AddCountryPage = async () => {
  const t = await getTranslations("AddCountryPage");

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="border-border flex flex-col gap-3 border-b pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
            <Globe className="h-6 w-6" />
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

      {/* Add Country Form & Preview */}
      <CountryForm mode="create" />
    </div>
  );
};
export default AddCountryPage;
