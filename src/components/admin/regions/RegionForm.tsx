"use client";

import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";

import type { z } from "zod";

import { regionFormSchema } from "@/lib/validations";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type RegionFormValues = z.infer<ReturnType<typeof regionFormSchema>>;

interface RegionFormProps {
  mode: "create" | "edit";
  countries: Country[];
  region?: Region;
}

const splitLabels = (raw: string) =>
  raw
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean);

const RegionForm = ({ mode, countries, region }: RegionFormProps) => {
  const router = useRouter();
  const validationT = useTranslations("Validation");
  const t = useTranslations("CreateAndUpdateRegion");

  const form = useForm<RegionFormValues>({
    resolver: zodResolver(regionFormSchema(validationT)),
    defaultValues: {
      country_id: mode === "edit" ? String(countries[0].id) : "",
      label_name_en: region?.label_name_en ?? "",
      label_name_ar: region?.label_name_ar ?? "",
      account: region?.account ?? "",
      labels: region?.labels.join(", ") ?? "",
    },
  });

  const onSubmit = async (data: RegionFormValues) => {
    const payload = {
      label_name_en: data.label_name_en,
      label_name_ar: data.label_name_ar,
      account: data.account,
      labels: splitLabels(data.labels),
    };

    try {
      const response =
        mode === "create"
          ? await apiClient.regions.createRegion({
              country_id: Number(data.country_id),
              ...payload,
            })
          : await apiClient.regions.updateRegion(region!.id, payload);

      if (response.success) {
        toast.success(t(`${mode}.success`));
        router.push(ROUTES.ADMIN_REGIONS);
        router.refresh();
      } else {
        toast.error(response.error?.message || t(`${mode}.error`));
      }
    } catch {
      toast.error(t(`${mode}.error`));
    }
  };

  return (
    <Card className="border-border bg-card mx-auto w-full max-w-2xl rounded-2xl p-6 shadow-sm sm:p-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="space-y-5">
          {/* Country */}
          <Controller
            name="country_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("form.country_id.label")}
                </FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={mode === "edit"}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="bg-surface-container-low! border-border! h-11! w-full! rounded-xl! font-medium!"
                  >
                    <SelectValue
                      placeholder={t("form.country_id.placeholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem
                        className="p-3"
                        key={country.id}
                        value={String(country.id)}
                      >
                        {country.name_en} — {country.name_ar}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Label Name English */}
          <Controller
            name="label_name_en"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("form.label_name_en.label")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={t("form.label_name_en.placeholder")}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Label Name Arabic */}
          <Controller
            name="label_name_ar"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("form.label_name_ar.label")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  dir="rtl"
                  aria-invalid={fieldState.invalid}
                  placeholder={t("form.label_name_ar.placeholder")}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Account */}
          <Controller
            name="account"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("form.account.label")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={t("form.account.placeholder")}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Labels */}
          <Controller
            name="labels"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("form.labels.label")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={t("form.labels.placeholder")}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                <FieldDescription className="text-on-surface-variant">
                  {t("form.labels.hint")}
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-brand-hover h-12 w-full rounded-xl font-semibold shadow-sm transition-all duration-200"
          >
            {form.formState.isSubmitting ? (
              <div className="flex items-center gap-2">
                <Spinner className="h-5 w-5" />
                <span>{t(`${mode}.submitting`)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {mode === "create" ? (
                  <Plus className="h-5 w-5" />
                ) : (
                  <Save className="h-5 w-5" />
                )}
                <span>{t(`${mode}.submit`)}</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RegionForm;
