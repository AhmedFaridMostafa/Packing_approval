import { Metadata } from "next";
import SpinnerMini from "@/components/SpinnerMini";
import { addCountry } from "@/server/actions";
import Form from "@/components/form/Form";
import { User } from "@/type/interfaces";
import { getAllCountries, getCurrentUser } from "@/server/data-service";
import { redirect } from "next/navigation";
import Image from "next/image";
import hasPermission from "@/server/handlePermissions";
import getTrans from "@/lib/translation";
import { getCurrentLang } from "@/lib/getCurrentLang";

export const metadata: Metadata = {
  title: { absolute: "Add Country" },
};

async function Page() {
  const user = (await getCurrentUser()) as User | null;
  if (!user || !hasPermission(user.role, "create:country")) redirect("/");
  const countries = await getAllCountries();
  const lang = await getCurrentLang();
  const {
    country: { addTitle, form },
  } = await getTrans(lang);
  const formFields = [
    {
      id: "label_name",
      label: form.label_name.label,
      type: "text",
      placeholder: form.label_name.placeholder,
      required: true,
      autoFocus: true,
    },
    {
      id: "account",
      type: "text",
      label: form.account.label,
      placeholder: form.account.placeholder,
      required: true,
    },
    {
      id: "labels",
      label: form.labels.label,
      type: "text",
      placeholder: form.labels.placeholder,
      required: true,
    },
    {
      name: "country",
      type: "select",
      label: form.country.label,
      options: countries.map(
        (country: { name_en: string; name_ar: string; flag: string }) => ({
          value: `${country.name_en}%${country.name_ar}%${country.flag}`,
          label: (
            <div className="flex items-center gap-2">
              <Image
                width={20}
                height={20}
                className="h-auto w-5"
                src={country.flag}
                alt={country.name_en}
              />
              <span className="ms-3">
                {country.name_en} - {country.name_ar}
              </span>
            </div>
          ),
        }),
      ),
      isClearable: true,
      placeholder: form.country.placeholder,
    },
    {
      id: "country_name",
      label: form.country_name.label,
      type: "text",
      placeholder: form.country_name.placeholder,
    },
    {
      id: "country_name_ar",
      label: form.country_name_ar.label,
      type: "text",
      placeholder: form.country_name_ar.placeholder,
    },
    {
      id: "image",
      label: form.image.label,
      type: "file",
      accept: "image/*",
    },
  ];
  const buttonData = {
    value: form.addSubmit,
    className: "w-full",
    loading: <SpinnerMini />,
  };

  return (
    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1 className="header">{addTitle}</h1>
      <Form
        formAction={addCountry}
        formFields={formFields}
        buttonData={buttonData}
      />
    </div>
  );
}
export default Page;
