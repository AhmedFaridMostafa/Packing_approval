"use client";

import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

import type { z } from "zod";

import { confirmPasswordSchema } from "@/lib/validations";
import { authClient } from "@/lib/auth/auth-client";

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

type ChangePasswordFormValues = z.infer<
  ReturnType<typeof confirmPasswordSchema>
>;

const ChangePasswordForm = () => {
  const validationT = useTranslations("validation");
  const t = useTranslations("account.changePassword");
  const toastT = useTranslations("account.toasts");

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(confirmPasswordSchema(validationT)),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    const { error } = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,
    });
    if (error) {
      toast.error(error.message || toastT("passwordChangeFailed"));
    } else {
      toast.success(toastT("passwordChanged"));
      form.reset();
    }
  };

  const passwordFields = [
    {
      name: "currentPassword" as const,
      label: t("currentPassword.label"),
      placeholder: t("currentPassword.placeholder"),
    },
    {
      name: "newPassword" as const,
      label: t("newPassword.label"),
      placeholder: t("newPassword.placeholder"),
    },
    {
      name: "confirmPassword" as const,
      label: t("confirmNewPassword.label"),
      placeholder: t("confirmNewPassword.placeholder"),
    },
  ];

  return (
    <Card className="border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <KeyRound className="h-5 w-5" />
        </div>
        <h3 className="font-heading text-on-surface text-lg font-bold">
          {t("title")}
        </h3>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="space-y-5">
          {passwordFields.map(({ name, label, placeholder }) => (
            <Controller
              key={name}
              name={name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-on-surface font-semibold"
                  >
                    {label}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    dir="ltr"
                    placeholder={placeholder}
                    autoComplete={
                      name === "currentPassword"
                        ? "current-password"
                        : "new-password"
                    }
                    aria-invalid={fieldState.invalid}
                    className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                  />
                  {name === "newPassword" && !fieldState.invalid && (
                    <FieldDescription className="text-on-surface-variant">
                      {t("hint")}
                    </FieldDescription>
                  )}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
        </FieldGroup>

        {/* Submit */}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="bg-primary text-primary-foreground hover:bg-brand-hover h-12 w-full rounded-xl font-semibold shadow-sm transition-all duration-200"
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center gap-2">
              <Spinner className="h-5 w-5" />
            </div>
          ) : (
            t("updateButton")
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ChangePasswordForm;
