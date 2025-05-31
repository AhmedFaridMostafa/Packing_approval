// src/app/auth/forgot-password/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import Form from "@/components/form/Form";
import { forgotPassword } from "@/server/actions";
import { getCurrentLang } from "@/lib/getCurrentLang";
import getTrans from "@/lib/translation";
import { Lang } from "@/i18n.config";

export const metadata: Metadata = {
  title: { absolute: "Forgot Password" },
  description: "Reset your password",
};

export default async function ForgotPasswordPage() {
  const lang = (await getCurrentLang()) as Lang;
  const { auth } = await getTrans(lang);

  const formFields = [
    {
      id: "email",
      label: auth.forgotPassword.email.label,
      type: "email",
      placeholder: auth.forgotPassword.email.placeholder,
      name: "email",
      required: true,
      autoFocus: true,
    },
  ];

  const buttonData = {
    value: auth.forgotPassword.submit,
    loading: "Sending...",
    className: "w-full",
  };

  return (
    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1 className="header">{auth.forgotPassword.title}</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {auth.forgotPassword.description}
      </p>

      <Form
        formAction={forgotPassword}
        formFields={formFields}
        buttonData={buttonData}
      />

      <div className="text-center">
        <Link
          href={`/${lang}/user/signin`}
          className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
        >
          {auth.forgotPassword.backToLogin}
        </Link>
      </div>
    </div>
  );
}
