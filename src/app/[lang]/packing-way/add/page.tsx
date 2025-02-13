import { Metadata } from "next";
import SpinnerMini from "@/components/SpinnerMini";
import { addPackingWay } from "@/server/actions";
import Form from "@/components/form/Form";
import { Categories, Country, User } from "@/type/interfaces";
import {
  getCategories,
  getCountries,
  getCurrentUser,
} from "@/server/data-service";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getCurrentLang } from "@/lib/getCurrentLang";
import getTrans from "@/lib/translation";

export const metadata: Metadata = {
  title: { absolute: "Add Packing Way" },
};

async function Page() {
  const user = (await getCurrentUser()) as User;
  if (!user) redirect("/");
  const [countries, category] = (await Promise.all([
    getCountries(),
    getCategories(),
  ])) as [Country[], Categories[]];
  const lang = await getCurrentLang();
  const {
    packingWay: { addTitle, form },
  } = await getTrans(lang);
  const formFields = [
    {
      id: "title",
      label: form.title.label,
      type: "text",
      placeholder: form.title.placeholder,
      required: true,
      autoFocus: true,
    },
    {
      id: "description",
      type: "textarea",
      label: form.description.label,
      rows: 4,
      placeholder: form.description.placeholder,
      required: true,
    },
    {
      id: "title_ar",
      label: form.title_ar.label,
      type: "text",
      placeholder: form.title_ar.placeholder,
      required: true,
      autoFocus: true,
    },
    {
      id: "description_ar",
      type: "textarea",
      label: form.description_ar.label,
      rows: 4,
      placeholder: form.description_ar.placeholder,
      required: true,
    },
    {
      name: "country",
      type: "select",
      label: form.country.label,
      placeholder: form.country.placeholder,
      options: countries.map((country) => ({
        value: `${country.account}%${country.country_name.en}%${country.id}%${country.country_name.ar}`,
        label: (
          <div className="flex items-center gap-2">
            <Image
              width={20}
              height={20}
              className="h-auto w-5"
              src={country.flag_url}
              alt={country.country_name.en}
            />
            <span className="ms-3">
              {country.country_name[lang]} ({country.account})
            </span>
          </div>
        ),
      })),
      required: true,
    },
    {
      name: "category",
      type: "select",
      label: form.category.label,
      placeholder: form.category.placeholder,
      options: category.map((item) => ({
        value: `${item.id}%${item.name.en}%${item.name.ar}`,
        label: item.name[lang],
      })),
      required: true,
    },
    {
      id: "image",
      label: form.image.label,
      type: "file",
      accept: "image/*",
      required: true,
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
        formAction={addPackingWay}
        formFields={formFields}
        buttonData={buttonData}
      />
    </div>
  );
}
export default Page;
