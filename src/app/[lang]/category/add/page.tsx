import { Metadata } from "next";
import SpinnerMini from "@/components/SpinnerMini";
import { addCategory } from "@/server/actions";
import Form from "@/components/form/Form";
import { User } from "@/type/interfaces";
import { getCurrentUser } from "@/server/data-service";
import { redirect } from "next/navigation";

import hasPermission from "@/server/handlePermissions";
import { getCurrentLang } from "@/lib/getCurrentLang";
import getTrans from "@/lib/translation";

export const metadata: Metadata = {
  title: { absolute: "Add Category" },
};

const buttonData = {
  value: "Add Category",
  className: "w-full",
  loading: <SpinnerMini />,
};

async function Page() {
  const user = (await getCurrentUser()) as User | null;
  if (!user || !hasPermission(user.role, "create:category")) redirect("/");
  const lang = await getCurrentLang();
  const { categories } = await getTrans(lang);
  const formFields = [
    {
      id: "category",
      label: categories.form.category.label,
      type: "text",
      placeholder: categories.form.category.placeholder,
      required: true,
      autoFocus: true,
    },
    {
      id: "category_ar",
      label: categories.form.category_ar.label,
      type: "text",
      placeholder: categories.form.category_ar.placeholder,
      required: true,
    },
  ];

  return (
    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1 className="header">{categories.title}</h1>
      <Form
        formAction={addCategory}
        formFields={formFields}
        buttonData={buttonData}
      />
    </div>
  );
}
export default Page;
