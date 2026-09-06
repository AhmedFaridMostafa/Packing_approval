"use client";

// Navigation
import { Link, useRouter } from "@/i18n/navigation";

// Validation
import type { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// React Hook Form
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import type { _Translator } from "next-intl";
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
import { signIn, signUp } from "@/lib/auth/auth-client";

interface AuthFormProps<T extends FieldValues> {
  getSchema: (t: _Translator) => ZodType<T, T>;
  defaultValues: T;
  formType: "Sign_in" | "Sign_up";
}

type AuthErrorBody = { status?: string; message?: string };

const AuthForm = <T extends FieldValues>({
  getSchema,
  defaultValues,
  formType,
}: AuthFormProps<T>) => {
  const t = useTranslations(`Auth.${formType}`);
  const tLabels = useTranslations("Auth.labels");
  const tValidation = useTranslations("Validation");
  const schema = getSchema(tValidation);
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const commonOptions: {
      onSuccess: () => void;
      onError: (context: ErrorContext) => void;
    } = {
      onSuccess: () => {
        toast.success(t("success"));
        router.push(
          formType === "Sign_in"
            ? ROUTES.HOME
            : `${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(data.email)}`,
        );
        router.refresh();
      },
      onError: (context) => {
        const body = (context?.error?.error as AuthErrorBody | undefined) ?? {};
        if (body?.status === "ACCOUNT_NOT_VERIFIED") {
          router.push(
            `${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(data.email)}`,
          );
          router.refresh();
        } else {
          toast.error(t("error", { status: body?.status || "" }), {
            description: body?.message || t("global_error"),
          });
        }
      },
    };

    if (formType === "Sign_in") {
      await signIn.email(
        { email: data.email, password: data.password },
        commonOptions,
      );
    } else {
      await signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
        },
        commonOptions,
      );
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="mt-10 space-y-6"
    >
      <FieldGroup>
        {Object.keys(defaultValues).map((field) => (
          <Controller
            key={field}
            name={field as Path<T>}
            control={form.control}
            render={({ field: controllerField, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex w-full items-center justify-between">
                  <FieldLabel
                    htmlFor={`auth-form-${field}`}
                    className="capitalize"
                  >
                    {tLabels.has(field) ? tLabels(field) : field}
                  </FieldLabel>
                  {formType === "Sign_in" && field === "password" && (
                    <Link
                      href={ROUTES.FORGET_PASSWORD}
                      className="text-primary-500 text-sm font-medium hover:underline"
                    >
                      {t("forgot_password")}
                    </Link>
                  )}
                </div>
                <Input
                  {...controllerField}
                  id={`auth-form-${field}`}
                  required
                  type={
                    field === "password"
                      ? "password"
                      : field === "email"
                        ? "email"
                        : "text"
                  }
                  autoComplete={
                    field === "email"
                      ? "email"
                      : field === "password"
                        ? formType === "Sign_in"
                          ? "current-password"
                          : "new-password"
                        : "off"
                  }
                  aria-invalid={fieldState.invalid}
                  className="no-focus rounded-1.5 min-h-12 border"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        ))}
      </FieldGroup>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="min-h-12 w-full px-4 py-3"
      >
        {t("submit")}
        {form.formState.isSubmitting && <Spinner />}
      </Button>

      <p>
        {t.rich("footer_text", {
          link: (chunks) => (
            <Link
              href={formType === "Sign_in" ? ROUTES.SIGN_UP : ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </form>
  );
};

export default AuthForm;
