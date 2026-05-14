"use client";

import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { z } from "zod";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { resetPasswordSchema } from "@/lib/validations";
import { ROUTES } from "@/constants/routes";
import { resetPassword } from "@/lib/auth/auth-client";

const ResetPasswordFormContent = () => {
  const t = useTranslations("Auth.resetPassword");
  const tValidation = useTranslations("Validation");

  const schema = resetPasswordSchema(tValidation);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    if (!token) {
      toast.error(tValidation("token_required"));
      return;
    }
    await resetPassword(
      {
        newPassword: data.password,
        token: token,
      },
      {
        onSuccess: () => {
          toast.success(tValidation("password_reset_success"));
          router.push(ROUTES.SIGN_IN);
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message || tValidation("password_reset_failed"),
          );
        },
      },
    );
  };

  if (token == null || error != null) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="h2-bold text-red-500">
            {tValidation("reset_token_invalid")}
          </h1>
          <p className="paragraph-regular text-dark500_light400">
            {error === "invalid_token" ? tValidation("token_required") : error}
          </p>
        </div>

        <Button className="min-h-12 w-full px-4 py-3" asChild>
          <Link href={ROUTES.FORGET_PASSWORD}>
            {tValidation("form_errors") ? "Try Again" : "Try Again"}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="mt-10 space-y-6"
    >
      <div className="mb-6 space-y-2 text-center">
        <h1 className="h2-bold">{t("title")}</h1>
      </div>

      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="reset-password-new">
                {t("password.newPassword.label")}
              </FieldLabel>
              <Input
                {...field}
                id="reset-password-new"
                type="password"
                placeholder={t("password.newPassword.placeholder")}
                required
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                className="no-focus rounded-1.5 min-h-12 border"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="reset-password-confirm">
                {t("password.confirmPassword.label")}
              </FieldLabel>
              <Input
                {...field}
                id="reset-password-confirm"
                type="password"
                placeholder={t("password.confirmPassword.placeholder")}
                required
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
                className="no-focus rounded-1.5 min-h-12 border"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="min-h-12 w-full px-4 py-3"
      >
        {t("submit")}
        {form.formState.isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

const ResetPasswordForm = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-4">
          <Spinner />
        </div>
      }
    >
      <ResetPasswordFormContent />
    </Suspense>
  );
};

export default ResetPasswordForm;
