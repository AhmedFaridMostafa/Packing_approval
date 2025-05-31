import { Metadata } from "next";
import SpinnerMini from "@/components/SpinnerMini";
import { updatePackingWay } from "@/server/actions";
import Form from "@/components/form/Form";
import { Categories, FormFieldComponentProps, User } from "@/type/interfaces";
import {
  getCategories,
  getCurrentUser,
  thePackingWay,
} from "@/server/data-service";
import { redirect } from "next/navigation";
import { getCurrentLang } from "@/lib/getCurrentLang";
import getTrans from "@/lib/translation";

export const metadata: Metadata = {
  title: { absolute: "Add Packing Way" },
};

interface Params {
  itemId: string;
}

async function Page({ params }: { params: Promise<Params> }) {
  const { itemId } = await params;
  const user = (await getCurrentUser()) as User | null;
  if (!user) redirect("/");
  const [packingWay, category] = await Promise.all([
    await thePackingWay(Number(itemId)),
    await getCategories(),
  ]);
  const defaultCategory = category.filter(
    (item) => item.id === packingWay.category_id,
  )[0] as Categories;
  const lang = await getCurrentLang();
  const {
    packingWay: { editTitle, form },
  } = await getTrans(lang);
  const formFields: FormFieldComponentProps[] = [
    { id: "id", type: "hidden", value: itemId },
    {
      id: "title",
      label: form.title.label,
      type: "text",
      placeholder: form.title.placeholder,
      required: true,
      defaultValue: packingWay.title.en,
    },
    {
      id: "description",
      type: "textarea",
      label: form.description.label,
      rows: 4,
      placeholder: form.description.placeholder,
      defaultValue: packingWay.description.en,
    },
    {
      id: "title_ar",
      label: form.title_ar.label,
      type: "text",
      placeholder: form.title_ar.placeholder,
      required: true,
      defaultValue: packingWay.title.ar,
    },
    {
      id: "description_ar",
      type: "textarea",
      label: form.description_ar.label,
      rows: 4,
      placeholder: form.description_ar.placeholder,
      defaultValue: packingWay.description.ar,
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
      defaultValue: `${defaultCategory.id}%${defaultCategory.name.en}%${defaultCategory.name.ar}`,
      required: true,
    },
    {
      id: "image",
      label: form.image.label,
      type: "file",
      accept: "image/*",
    },
  ];
  const buttonData = {
    value: form.editSubmit,
    className: "w-full",
    loading: <SpinnerMini />,
  };
  return (
    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1 className="header">{editTitle}</h1>
      <Form
        formAction={updatePackingWay}
        formFields={formFields}
        buttonData={buttonData}
      />
    </div>
  );
}
export default Page;
