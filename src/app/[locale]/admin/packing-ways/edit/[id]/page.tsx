import { Pencil } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import ErrorState from "@/components/shared/ErrorState";
import PackingWayForm from "@/components/admin/packing-ways/PackingWayForm";
import PackingWaySavedCard from "@/components/admin/packing-ways/PackingWaySavedCard";

const EditPackingWayPage = async ({ params }: RouteParams) => {
  const [{ id }, requestHeaders] = await Promise.all([params, headers()]);
  if (!id) notFound();

  const [detail, formData, t] = await Promise.all([
    api.packingWays.getPackingWayById(requestHeaders, id),
    api.packingWays.getFormData(requestHeaders),
    getTranslations("EditPackingWayPage"),
  ]);

  if (!detail.success)
    return (
      <ErrorState
        layout="page"
        status={detail.status}
        message={detail.error.message}
      />
    );

  if (!formData.success)
    return (
      <ErrorState
        layout="page"
        status={formData.status}
        message={t("load_error")}
      />
    );

  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
            <Pencil className="size-6" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
        </div>
      </div>
      <PackingWayForm
        key={detail.data.id}
        mode="edit"
        formData={formData.data}
        packingWay={detail.data}
      >
        <PackingWaySavedCard packingWay={detail.data} />
      </PackingWayForm>
    </div>
  );
};

export default EditPackingWayPage;
