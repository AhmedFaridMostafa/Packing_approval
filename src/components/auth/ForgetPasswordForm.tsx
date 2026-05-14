"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { forgotPasswordSchema } from "@/lib/validations";
import { ROUTES } from "@/constants/routes";
import { requestPasswordReset } from "@/lib/auth/auth-client";

const ForgetPasswordForm = () => {
  const t = useTranslations("Auth.forgotPassword");
  const tLabels = useTranslations("Auth.labels");
  const tValidation = useTranslations("Validation");

  const schema = forgotPasswordSchema(tValidation);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    await requestPasswordReset(
      {
        email: data.email,
        redirectTo: ROUTES.RESET_PASSWORD,
      },
      {
        onSuccess: () => {
          toast.success(tValidation("reset_email_sent"));
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message || tValidation("password_reset_failed"),
          );
        },
      },
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="mt-10 space-y-6"
    >
      <div className="mb-6 space-y-2 text-center">
        <h1 className="h2-bold">{t("title")}</h1>
        <p className="paragraph-regular text-dark500_light400">
          {t("description")}
        </p>
      </div>

      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="forget-password-email">
                {tLabels("email")}
              </FieldLabel>
              <Input
                {...field}
                id="forget-password-email"
                type="email"
                placeholder={tLabels("email")}
                required
                autoComplete="email"
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

      <p className="text-center">
        <Link
          href={ROUTES.SIGN_IN}
          className="paragraph-semibold primary-text-gradient"
        >
          {t("backToLogin")}
        </Link>
      </p>
    </form>
  );
};

export default ForgetPasswordForm;
