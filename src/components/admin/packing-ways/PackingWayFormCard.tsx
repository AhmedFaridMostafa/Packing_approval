"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Plus, Save } from "lucide-react";
import type { z } from "zod";
import { toast } from "sonner";
import { packingWayFormSchema } from "@/lib/validations";
import { apiClient } from "@/lib/api-client";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/navigation";
import FileUploader from "@/components/shared/FileUploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
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

export type PackingWayFormValues = z.infer<
  ReturnType<typeof packingWayFormSchema>
>;

interface PackingWayFormCardProps {
  form: UseFormReturn<PackingWayFormValues>;
  mode: "create" | "edit";
  formData: PackingWayFormData;
  packingWay?: PackingWayDetail;
}

const PackingWayFormCard = ({
  form,
  mode,
  formData,
  packingWay,
}: PackingWayFormCardProps) => {
  const { countries, regionsByCountry, categories } = formData;

  const router = useRouter();
  const t = useTranslations("CreateAndUpdatePackingWay");

  const countryId = form.watch("country_id");
  const regions = countryId ? (regionsByCountry[Number(countryId)] ?? []) : [];

  const onSubmit = async (data: PackingWayFormValues) => {
    const payload = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        payload.append(key, value);
      }
    });
    try {
      const result =
        mode === "create"
          ? await apiClient.packingWays.createPackingWay(payload)
          : await apiClient.packingWays.updatePackingWay(
              packingWay!.id,
              payload,
            );
      if (result.success) {
        toast.success(t(`${mode}.success`));
        router.push(ROUTES.ADMIN_PACKING_WAYS);
        router.refresh();
      } else {
        toast.error(result.error?.message ?? t(`${mode}.error`));
      }
    } catch {
      toast.error(t(`${mode}.error`));
    }
  };

  return (
    <Card className="border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="grid gap-5 md:grid-cols-2">
          {/* Country Selection */}
          <Controller
            name="country_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-on-surface font-semibold">
                  {t("form.country.label")}
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder={t("form.country.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.name_en} — {item.name_ar}
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

          {/* Region Selection */}
          <Controller
            name="region_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-on-surface font-semibold">
                  {t("form.region.label")}
                </FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!countryId || regions.length === 0}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder={t("form.region.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {`${item.label_name_en} — ${item.label_name_ar}`}
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

          {/* Category Selection */}
          <Controller
            name="category_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="md:col-span-2"
              >
                <FieldLabel className="text-on-surface font-semibold">
                  {t("form.category.label")}
                </FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder={t("form.category.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.name_en} — {item.name_ar}
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

          {/* Title English */}
          <Controller
            name="title_en"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-on-surface font-semibold">
                  {t("form.title_en.label")}
                </FieldLabel>
                <Input
                  {...field}
                  placeholder={t("form.title_en.placeholder")}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Title Arabic */}
          <Controller
            name="title_ar"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-on-surface font-semibold">
                  {t("form.title_ar.label")}
                </FieldLabel>
                <Input
                  {...field}
                  dir="rtl"
                  placeholder={t("form.title_ar.placeholder")}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Description English */}
          <Controller
            name="description_en"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="md:col-span-2"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-on-surface font-semibold">
                  {t("form.description_en.label")}
                </FieldLabel>
                <Textarea
                  {...field}
                  placeholder={t("form.description_en.placeholder")}
                  aria-invalid={fieldState.invalid}
                  rows={4}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Description Arabic */}
          <Controller
            name="description_ar"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="md:col-span-2"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-on-surface font-semibold">
                  {t("form.description_ar.label")}
                </FieldLabel>
                <Textarea
                  {...field}
                  dir="rtl"
                  placeholder={t("form.description_ar.placeholder")}
                  aria-invalid={fieldState.invalid}
                  rows={4}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Image Upload Area */}
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                className="md:col-span-2"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel className="text-on-surface font-semibold">
                  {t("form.image.label")}
                </FieldLabel>

                <FileUploader
                  value={field.value}
                  onChange={field.onChange}
                  ariaInvalid={fieldState.invalid}
                  labels={{
                    uploadText: t("form.image.upload"),
                    dropText: t("form.image.drop"),
                    replaceText: t("form.image.replace"),
                    placeholder: t("form.image.hint"),
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-11 w-full text-base font-semibold"
        >
          {form.formState.isSubmitting ? (
            <Spinner className="me-2 size-4" />
          ) : mode === "create" ? (
            <Plus className="me-2 size-5" />
          ) : (
            <Save className="me-2 size-5" />
          )}
          {t(`${mode}.submit`)}
        </Button>
      </form>
    </Card>
  );
};

export default PackingWayFormCard;
