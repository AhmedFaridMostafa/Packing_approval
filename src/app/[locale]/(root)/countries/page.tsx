import { api } from "@/lib/api";
import { getLocale, getTranslations } from "next-intl/server";
import CountriesTitle from "@/components/countries/CountriesTitle";
import ContainerSearch from "@/components/countries/CountrySearch";
import Pagination from "@/components/Pagination";
import ContainerEmpty from "@/components/countries/CountryEmpty";
import { CountryCard } from "@/components/countries/CountryCard";

export async function generateMetadata() {
  const t = await getTranslations("CountriesPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const CountriesPage = async ({ searchParams }: RouteParams) => {
  const { page, search_query } = await searchParams;
  const currentPage = Number(page) || 1;
  const searchQuery = search_query ?? "";

  const t = await getTranslations("Validation");

  const [result, translate, locale] = await Promise.all([
    api.countries.getCountries(searchQuery, currentPage, t),
    getTranslations("CountriesPage"),
    getLocale(),
  ]);

  if (!result.success) {
    return (
      <section className="bg-surface-container-lowest section-container flex min-h-screen items-center justify-center">
        <p className="text-destructive text-sm">{result.error.message}</p>
      </section>
    );
  }

  const { countries, totalItems, totalPages } = result.data;

  return (
    <section className="bg-surface-container-lowest section-container min-h-screen py-10 sm:py-16">
      <div className="border-border mb-8 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <CountriesTitle totalItems={totalItems} translate={translate} />
        <ContainerSearch searchPlaceholder={translate("search_placeholder")} />
      </div>
      {countries.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {countries.map((country) => (
              <CountryCard
                key={country.id}
                country={country}
                locale={locale}
                translate={translate}
              />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <ContainerEmpty
          title={translate("empty_state_title")}
          description={translate("empty_state_desc")}
          clearText={translate("clear_search")}
        />
      )}
    </section>
  );
};

export default CountriesPage;
