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
  const t = useTranslations("CreateAndUpdateCountry");
  const validationT = useTranslations("Validation");

  const onSubmit = async (data: CountryFormValues) => {
    try {
      const response = await (mode === "create"
        ? apiClient.countries.createCountry(data, validationT)
        : apiClient.countries.updateCountry(
            { id: data.id!, ...data },
            validationT,
          ));
      if (response.success) {
        toast.success(t(`${mode}.success`));
        router.push(ROUTES.ADMIN_PANEL_COUNTRIES);
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
                  {t("form.name_en.label")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={t("form.name_en.placeholder")}
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
                  {t("form.name_ar.label")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={t("form.name_ar.placeholder")}
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
                  {t("form.flag_url.label")}
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
                  placeholder={t("form.flag_url.placeholder")}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <FieldSeparator className="my-2">
            {t("form.or_separator")}
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
                  {t("form.image_file.label")}
                </FieldLabel>
                <FileUploader
                  id={field.name}
                  value={field.value}
                  disabled={field.disabled}
                  ariaInvalid={fieldState.invalid}
                  labels={{
                    placeholder: t("form.image_file.placeholder"),
                    uploadText: t("form.image_file.upload"),
                    dropText: t("form.image_file.drop"),
                    replaceText: t("form.image_file.replace"),
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
                      t("form.image_file.invalid");
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
