import CardsGrid from "@/components/CardsGrid";
import PackingMessage from "@/components/PackingMessage";
import PackingPDF from "@/components/PackingPDF";
import { Lang } from "@/i18n.config";
import { getCurrentLang } from "@/lib/getCurrentLang";
import getTrans from "@/lib/translation";
import { getCurrentUser, getPackingWay } from "@/server/data-service";
import { GroupedPacking, Packing, User } from "@/type/interfaces";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Params {
  countryData: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { countryData } = await params;
  const [, countryName] = countryData.trim().split("-");
  return { title: countryName };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { countryData } = await params;
  const [account, , countryId] = countryData.trim().split("-");
  const PackingWay: Packing[] = (await getPackingWay(Number(countryId))) || [];
  const user = (await getCurrentUser()) as User | null;
  const lang = (await getCurrentLang()) as Lang;
  const translations = await getTrans(lang);
  if (!PackingWay.length)
    return (
      <PackingMessage
        packingMethods={translations.packingMethods}
        isAuth={!!user}
      />
    );
  const { country } = PackingWay[0];
  if (country.id !== Number(countryId) || country.account !== account)
    notFound();

  const options = {
    edit: translations.edit,
    del: translations.delete,
    cancel: translations.cancel,
    confirm: translations.confirm,
    cardOption: translations.cardOption,
  };

  const groupedData: GroupedPacking = PackingWay.reduce<GroupedPacking>(
    (acc, { categories, ...item }) => {
      const name = categories.name[lang];
      if (!acc[name]) acc[name] = [];
      acc[name].push({ categories, ...item });
      return acc;
    },
    {},
  );
  return (
    <>
      <div className="my-8 flex flex-wrap items-center justify-center gap-2 text-center text-3xl font-bold text-blue-600 dark:text-blue-400">
        <Image
          width={40}
          height={40}
          src={country.flag_url.trim()}
          alt={country.country_name.en}
          className="h-10 w-auto"
          unoptimized
          priority
        />
        <h1>{country.country_name[lang].replaceAll("_", " ")}</h1>
        <span>({account})</span>
        <span>({country.label_name})</span>
        <span>Labels:- ({country.labels})</span>
      </div>
      <div className="flex justify-center">
        <PackingPDF
          key={`${country.country_name[lang].replaceAll("_", " ")}-${Date.now()}`}
          countryName={country.country_name[lang].replaceAll("_", " ")}
          account={account}
          labelName={country.label_name}
          labels={country.labels}
          groupedData={groupedData}
          lang={lang}
        />
      </div>
      <div className="space-y-8">
        {Object.entries(groupedData).map(([key, value]) => {
          return (
            <div key={key}>
              <h2 className="mb-4 text-2xl font-bold capitalize text-blue-600 dark:text-blue-400">
                {key}
              </h2>

              <CardsGrid items={value} user={user} options={options} />
            </div>
          );
        })}
      </div>
    </>
  );
}
