import { Card } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Controller, type UseFormReturn } from "react-hook-form";
import { CountryFormValues } from "./CountryForm";
import { Input } from "@/components/ui/input";
import FileUploader from "@/components/shared/FileUploader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";

interface CountryFormCardProps {
  form: UseFormReturn<CountryFormValues>;
  mode: "create" | "edit";
}
const CountryFormCard = ({ form, mode }: CountryFormCardProps) => {
  const router = useRouter();
  const t = useTranslations("admin.countries.form");

  const onSubmit = async (data: CountryFormValues) => {
    try {
      const response = await (mode === "create"
        ? apiClient.countries.createCountry(data)
        : apiClient.countries.updateCountry({ slug: data.slug!, ...data }));
      if (response.success) {
        toast.success(t(`${mode}.success`));
        router.push(ROUTES.ADMIN_COUNTRIES);
        router.refresh();
      } else {
        toast.error(response.error?.message || t(`${mode}.error`));
      }
    } catch {
      toast.error(t(`${mode}.error`));
    }
  };

  return (
    <Card className="border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="space-y-5">
          {/* Name English */}
          <Controller
            name="name_en"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("fields.nameEn.label")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={t("fields.nameEn.placeholder")}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Name Arabic */}
          <Controller
            name="name_ar"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("fields.nameAr.label")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={t("fields.nameAr.placeholder")}
                  dir="rtl"
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Flag URL */}
          <Controller
            name="flag_url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("fields.flagUrl.label")}
                </FieldLabel>
                <Input
                  {...field}
                  onChange={(event) => {
                    field.onChange(event);
                    if (event.target.value) {
                      form.setValue("image_file", undefined, {
                        shouldDirty: true,
                      });
                      form.clearErrors("image_file");
                    }
                  }}
                  id={field.name}
                  type="url"
                  aria-invalid={fieldState.invalid}
                  placeholder={t("fields.flagUrl.placeholder")}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <FieldSeparator className="my-2">
            {t("fields.orSeparator")}
          </FieldSeparator>

          {/* Image File Upload */}
          <Controller
            name="image_file"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("fields.imageFile.label")}
                </FieldLabel>
                <FileUploader
                  id={field.name}
                  value={field.value}
                  disabled={field.disabled}
                  ariaInvalid={fieldState.invalid}
                  labels={{
                    placeholder: t("fields.imageFile.placeholder"),
                    uploadText: t("fields.imageFile.upload"),
                    dropText: t("fields.imageFile.drop"),
                    replaceText: t("fields.imageFile.replace"),
                  }}
                  onChange={(file) => {
                    field.onChange(file);
                    if (file) {
                      form.clearErrors("image_file");
                      form.setValue("flag_url", "", {
                        shouldDirty: true,
                      });
                    }
                  }}
                  onDropRejected={(rejections) => {
                    const message =
                      rejections[0]?.errors[0]?.message ??
                      t("fields.imageFile.invalid");
                    form.setError("image_file", {
                      type: "manual",
                      message,
                    });
                  }}
                />
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
                <Plus className="h-5 w-5" />
                <span>{t(`${mode}.submit`)}</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CountryFormCard;
