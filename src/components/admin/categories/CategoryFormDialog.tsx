"use client";

import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { z } from "zod";

import { categoryFormSchema } from "@/lib/validations";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export type CategoryFormValues = z.infer<ReturnType<typeof categoryFormSchema>>;

interface CategoryFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  category?: CategoryWithCount | null;
}

const CategoryFormDialog = ({
  open,
  mode,
  category,
}: CategoryFormDialogProps) => {
  const router = useRouter();
  const validationT = useTranslations("Validation");
  const t = useTranslations("AdminCategoriesPage.dialog");

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema(validationT)),
    defaultValues: {
      name_en: category?.name_en ?? "",
      name_ar: category?.name_ar ?? "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleOpenChange = (next: boolean) => {
    if (!next) router.push(ROUTES.ADMIN_CATEGORIES);
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      const response =
        mode === "create"
          ? await apiClient.categories.createCategory(data)
          : await apiClient.categories.updateCategory(category!.id, data);

      if (response.success) {
        toast.success(t(`${mode}_success`));
        router.push(ROUTES.ADMIN_CATEGORIES);
        router.refresh();
      } else {
        toast.error(response.error?.message || t(`${mode}_error`));
      }
    } catch {
      toast.error(t(`${mode}_error`));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-on-surface text-lg font-bold">
            {t(`${mode}.title`)}
          </DialogTitle>
          <DialogDescription className="text-on-surface-variant">
            {t(`${mode}.description`)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="name_en"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-on-surface font-semibold"
                  >
                    {t("name_en")}
                  </FieldLabel>
                  <Input
                    id={field.name}
                    placeholder={t("name_en_placeholder")}
                    aria-invalid={fieldState.invalid}
                    className="bg-surface-container-low! border-border! focus-visible:ring-primary! h-11! rounded-xl!"
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="name_ar"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-on-surface font-semibold"
                  >
                    {t("name_ar")}
                  </FieldLabel>
                  <Input
                    id={field.name}
                    dir="rtl"
                    placeholder={t("name_ar_placeholder")}
                    aria-invalid={fieldState.invalid}
                    className="bg-surface-container-low! border-border! focus-visible:ring-primary! h-11! rounded-xl!"
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => handleOpenChange(false)}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Spinner className="me-1.5 h-4 w-4" />}
              {t(`${mode}.submit`)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormDialog;
