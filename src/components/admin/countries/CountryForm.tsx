"use client";

import { useForm, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import useObjectUrl from "@/hooks/useObjectUrl";
import { zodResolver } from "@hookform/resolvers/zod";

import type { z } from "zod";

import { apiCountrySchema } from "@/lib/validations";

import CountryPreview from "./CountryPreview";
import CountryFormCard from "./CountryFormCard";

export type CountryFormValues = z.infer<ReturnType<typeof apiCountrySchema>>;

interface CountryFormProps {
  mode: "create" | "edit";
  country?: Country;
  regionsCounts?: number;
}

const CountryForm = ({ mode, country, regionsCounts }: CountryFormProps) => {
  const validationT = useTranslations("Validation");

  const form = useForm<CountryFormValues>({
    resolver: zodResolver(apiCountrySchema(validationT)),
    defaultValues: {
      slug: country?.slug ?? undefined,
      name_en: country?.name_en ?? "",
      name_ar: country?.name_ar ?? "",
      flag_url: country?.flag_url ?? "",
      image_file: undefined,
    },
  });

  const [nameEn, nameAr, flagUrl, imageFile] = useWatch({
    control: form.control,
    name: ["name_en", "name_ar", "flag_url", "image_file"],
  });

  const filePreviewUrl = useObjectUrl(imageFile);
  const effectiveFlagUrl = flagUrl || filePreviewUrl;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left Column: Input Form */}
      <div className="lg:col-span-7">
        <CountryFormCard form={form} mode={mode} />
      </div>

      {/* Right Column: Live Card Preview */}
      <div className="lg:col-span-5">
        <CountryPreview
          nameEn={nameEn}
          nameAr={nameAr}
          effectiveFlagUrl={effectiveFlagUrl}
          regionsCounts={regionsCounts}
        />
      </div>
    </div>
  );
};

export default CountryForm;
