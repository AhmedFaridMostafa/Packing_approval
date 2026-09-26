import { api } from "@/lib/api";
import PackingWaysFilterControls from "./PackingWaysFilterControls";

interface PackingWaysFilterBarProps {
  requestHeaders: Headers;
  searchPlaceholder: string;
  allCountries: string;
  allCategories: string;
}
const PackingWaysFilterBar = async ({
  requestHeaders,
  searchPlaceholder,
  allCountries,
  allCategories,
}: PackingWaysFilterBarProps) => {
  const [countriesResult, categoriesResult] = await Promise.all([
    api.countries.getAllActiveCountries(requestHeaders),
    api.categories.getAdminCategories(requestHeaders),
  ]);

  return (
    <PackingWaysFilterControls
      countries={countriesResult.success ? countriesResult.data : []}
      categories={categoriesResult.success ? categoriesResult.data : []}
      searchPlaceholder={searchPlaceholder}
      allCountries={allCountries}
      allCategories={allCategories}
    />
  );
};

export default PackingWaysFilterBar;
