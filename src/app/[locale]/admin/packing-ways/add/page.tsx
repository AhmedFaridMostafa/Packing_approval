import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { api } from "@/lib/api";
import ErrorState from "@/components/shared/ErrorState";
import PackingWayForm from "@/components/admin/packing-ways/PackingWayForm";

export default async function AddPackingWayPage() {
  const requestHeaders = await headers();

  const [formData, t] = await Promise.all([
    api.packingWays.getFormData(requestHeaders),
    getTranslations("AddPackingWayPage"),
  ]);

  if (!formData.success)
    return (
      <ErrorState
        layout="page"
        status={formData.status}
        message={formData.error.message}
      />
    );

  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
            <Plus className="size-6" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
        </div>
      </div>
      <PackingWayForm mode="create" formData={formData.data} />
    </div>
  );
}
