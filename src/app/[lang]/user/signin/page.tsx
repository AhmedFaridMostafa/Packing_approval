import { Metadata } from "next";
import SpinnerMini from "@/components/SpinnerMini";
import { login as loginAction } from "@/server/actions";
import Form from "@/components/form/Form";
import { User } from "@/type/interfaces";
import { getCurrentUser } from "@/server/data-service";
import { redirect } from "next/navigation";
import { getCurrentLang } from "@/lib/getCurrentLang";
import { Lang } from "@/i18n.config";
import getTrans from "@/lib/translation";

export const metadata: Metadata = {
  title: { absolute: "Login" },
};

async function Page() {
  const user = (await getCurrentUser()) as User | false;
  if (user) redirect("/");
  const lang = (await getCurrentLang()) as Lang;
  const {
    auth: { login },
  } = await getTrans(lang);
  const formFields = [
    {
      id: "email",
      label: login.email.label,
      type: "email",
      placeholder: login.email.placeholder,
      required: true,
      autoFocus: true,
    },
    {
      id: "password",
      label: login.password.label,
      type: "password",
      placeholder: login.password.placeholder,
      required: true,
    },
  ];

  const buttonData = {
    value: login.submit,
    className: "w-full",
    loading: <SpinnerMini />,
  };
  return (
    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1 className="header">{login.title}</h1>
      <Form
        formAction={loginAction}
        formFields={formFields}
        buttonData={buttonData}
      />
    </div>
  );
}
export default Page;
