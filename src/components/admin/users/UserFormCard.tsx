"use client";

import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import type { z } from "zod";

import { apiAdminCreateUserSchema } from "@/lib/validations";
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

type UserFormSchema = ReturnType<typeof apiAdminCreateUserSchema>;
type UserFormInput = z.input<UserFormSchema>;
export type UserFormValues = z.output<UserFormSchema>;

const UserFormCard = () => {
  const router = useRouter();
  const validationT = useTranslations("Validation");
  const t = useTranslations("AdminUsersPage.create");

  const form = useForm<UserFormInput, unknown, UserFormValues>({
    resolver: zodResolver(apiAdminCreateUserSchema(validationT)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      const response = await apiClient.users.createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role,
      });

      if (response.success) {
        toast.success(t("success"));
        router.push(ROUTES.ADMIN_USERS);
        router.refresh();
      } else {
        toast.error(response.error?.message || t("error"));
      }
    } catch {
      toast.error(t("error"));
    }
  };

  return (
    <Card className="border-border bg-card mx-auto w-full max-w-2xl rounded-2xl p-6 shadow-sm sm:p-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="space-y-5">
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("name")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("email")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  dir="ltr"
                  aria-invalid={fieldState.invalid}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("password")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  dir="ltr"
                  aria-invalid={fieldState.invalid}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                <FieldDescription className="text-on-surface-variant">
                  {t("password_hint")}
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("confirm_password")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  dir="ltr"
                  aria-invalid={fieldState.invalid}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Role */}
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("role")}
                </FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    field.onChange(value as UserFormValues["role"])
                  }
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="bg-surface-container-low! border-border! h-11! w-full! rounded-xl! font-medium!"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="p-3" value="user">
                      {t("role_user")}
                    </SelectItem>
                    <SelectItem className="p-3" value="admin">
                      {t("role_admin")}
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                <span>{t("submitting")}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                <span>{t("submit")}</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default UserFormCard;
