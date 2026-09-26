"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { packingWayFormSchema } from "@/lib/validations";

import PackingWayFormCard, {
  type PackingWayFormValues,
} from "./PackingWayFormCard";

import PackingWayLivePreview from "./PackingWayLivePreview";

interface PackingWayFormProps {
  mode: "create" | "edit";
  formData: PackingWayFormData;
  packingWay?: PackingWayDetail;
  children?: React.ReactNode;
}

const PackingWayForm = ({
  mode,
  formData,
  packingWay,
  children,
}: PackingWayFormProps) => {
  const validationT = useTranslations("Validation");

  const form = useForm<PackingWayFormValues>({
    resolver: zodResolver(packingWayFormSchema(validationT)),
    defaultValues: {
      country_id: packingWay ? String(packingWay.country_id) : "",
      region_id: packingWay ? String(packingWay.region_id) : "",
      category_id: packingWay ? String(packingWay.category_id) : "",
      title_en: packingWay?.title_en ?? "",
      title_ar: packingWay?.title_ar ?? "",
      description_en: packingWay?.description_en ?? undefined,
      description_ar: packingWay?.description_ar ?? undefined,
      image: undefined,
    },
  });

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      {/* Left Column: Interactive Form Inputs */}
      <div className="lg:col-span-7">
        <PackingWayFormCard
          form={form}
          mode={mode}
          formData={formData}
          packingWay={packingWay}
        />
      </div>

      {/* Right Column: Stacked Dual Preview Cards (Old Saved Version + Live Preview) */}
      <div className="lg:col-span-5">
        <div className="sticky top-20 flex flex-col gap-6">
          {children}
          <PackingWayLivePreview
            control={form.control}
            formData={formData}
            savedImageUrl={packingWay?.image_url}
          />
        </div>
      </div>
    </div>
  );
};

export default PackingWayForm;
