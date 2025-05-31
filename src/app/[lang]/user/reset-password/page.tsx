import { Metadata } from "next";
import SpinnerMini from "@/components/SpinnerMini";
import Form from "@/components/form/Form";
import { resetPassword } from "@/server/actions";
import { getCurrentLang } from "@/lib/getCurrentLang";
import getTrans from "@/lib/translation";
import { Lang } from "@/i18n.config";

export const metadata: Metadata = {
  title: { absolute: "Reset Password" },
};
interface Params {
  token_hash?: string;
}
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const lang = (await getCurrentLang()) as Lang;
  const { token_hash } = await searchParams;
  const {
    auth: { resetPassword: trans, errors },
  } = await getTrans(lang);

  if (!token_hash)
    return <div className="text-destructive p-6">{errors.missingToken}</div>;
  const formFields = [
    {
      id: "password",
      label: trans.password.newPassword.label,
      type: "password",
      placeholder: trans.password.newPassword.placeholder,
      required: true,
    },
    {
      id: "confirmPassword",
      label: trans.password.confirmPassword.label,
      type: "password",
      placeholder: trans.password.confirmPassword.placeholder,
      required: true,
    },
    {
      id: "token",
      type: "hidden",
      defaultValue: token_hash,
      value: token_hash,
    },
  ];

  const buttonData = {
    value: trans.submit,
    className: "w-full",
    loading: <SpinnerMini />,
  };

  return (
    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1 className="header">{trans.title}</h1>
      <Form
        formAction={resetPassword}
        formFields={formFields}
        buttonData={buttonData}
      />
    </div>
  );
}
