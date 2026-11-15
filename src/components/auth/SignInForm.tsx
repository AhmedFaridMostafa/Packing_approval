"use client";

// Navigation
import { Link, useRouter } from "@/i18n/navigation";

// Validation
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/lib/validations";

// React Hook Form
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { ErrorContext } from "@better-fetch/fetch";

// UI
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

// Constants
import { ROUTES } from "@/constants/routes";

// Action
import { getSession, signIn } from "@/lib/auth/auth-client";

type AuthErrorBody = { status?: string; message?: string };

const SignInForm = () => {
  const tAuth = useTranslations("Auth");
  const tValidation = useTranslations("Validation");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signinSchema(tValidation)),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = async (data: { email: string; password: string }) => {
    await signIn.email(
      { email: data.email, password: data.password },
      {
        onSuccess: async () => {
          toast.success(tAuth("Sign_in.success"));
          // Role-based landing: admins go to the dashboard, users to home.
          const session = await getSession();
          router.push(
            session.data?.user?.role === "admin" ? ROUTES.ADMIN : ROUTES.HOME,
          );
          router.refresh();
        },
        onError: (context: ErrorContext) => {
          const body =
            (context?.error?.error as AuthErrorBody | undefined) ?? {};
          if (body?.status === "ACCOUNT_NOT_VERIFIED") {
            router.push(
              `${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(data.email)}`,
            );
            router.refresh();
          } else if (context?.error?.status === 429) {
            toast.error(tAuth("Arcjet.rate_limit"), { duration: 10000 });
          } else {
            toast.error(body?.message || tAuth("Sign_in.global_error"));
          }
        },
      },
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      noValidate
      className="mt-8 space-y-6"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="auth-form-email" className="capitalize">
                {tAuth("labels.email")}
              </FieldLabel>
              <Input
                {...field}
                id="auth-form-email"
                type="email"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                className="min-h-12"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex w-full items-center justify-between">
                <FieldLabel htmlFor="auth-form-password" className="capitalize">
                  {tAuth("labels.password")}
                </FieldLabel>
                <Link
                  href={ROUTES.FORGET_PASSWORD}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {tAuth("Sign_in.forgot_password")}
                </Link>
              </div>
              <Input
                {...field}
                id="auth-form-password"
                type="password"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
                className="min-h-12"
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
        {tAuth("Sign_in.submit")}
        {form.formState.isSubmitting && <Spinner />}
      </Button>

      <p className="text-body-base text-on-surface-variant text-center">
        {tAuth("Sign_in.footer_text")}
      </p>

      <p className="text-caption text-on-surface-variant text-center">
        {tAuth("Sign_in.anonymous_hint")}
      </p>
    </form>
  );
};

export default SignInForm;
