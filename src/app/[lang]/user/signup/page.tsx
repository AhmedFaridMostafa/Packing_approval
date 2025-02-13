import { Metadata } from "next";
import SpinnerMini from "@/components/SpinnerMini";
import Form from "@/components/form/Form";
import { signup } from "@/server/actions"; // Replace with your signup action
import { getCurrentUser } from "@/server/data-service";
import hasPermission from "@/server/handlePermissions";
import { User } from "@/type/interfaces";
import { getCurrentLang } from "@/lib/getCurrentLang";
import getTrans from "@/lib/translation";
import { Lang } from "@/i18n.config";

export const metadata: Metadata = {
  title: { absolute: "Register" },
};

async function SignupPage() {
  const user = (await getCurrentUser()) as User;
  if (!hasPermission(user.role, "create:user"))
    throw new Error("You don't have permission to create a user");
  const lang = (await getCurrentLang()) as Lang;
  const {
    auth: { register },
    role,
  } = await getTrans(lang);
  const formFields = [
    {
      id: "full_name",
      label: register.full_name.label,
      type: "text",
      placeholder: register.full_name.label,
      required: true,
    },
    {
      id: "email",
      label: register.email.label,
      type: "email",
      placeholder: register.email.placeholder,
      required: true,
    },
    {
      id: "password",
      label: register.password.label,
      type: "password",
      placeholder: register.password.placeholder,
      required: true,
    },
    {
      id: "confirmPassword",
      label: register.confirmPassword.label,
      type: "password",
      placeholder: register.confirmPassword.placeholder,
      required: true,
    },
    {
      name: "role",
      label: register.role.label,
      type: "select",
      placeholder: register.role.placeholder,
      options: [
        { value: "admin", label: role.admin },
        { value: "moderator", label: role.moderator },
        { value: "user", label: role.user },
      ],
      required: true,
    },
  ];

  const buttonData = {
    value: register.submit,
    className: "w-full",
    loading: <SpinnerMini />,
  };
  return (
    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1 className="header">{register.title}</h1>
      <Form
        formAction={signup}
        formFields={formFields}
        buttonData={buttonData}
      />
    </div>
  );
}

export default SignupPage;
