import { API_ROUTES } from "@/constants/routes";
import { fetchHandler } from "./fetch-handler";
import { cacheLife, cacheTag } from "next/cache";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

export const api = {
  home: {
    getHomeData: (t?: TranslateFn) =>
      fetchHandler<getHomeDataResponse>(
        `${API_BASE_URL}/${API_ROUTES.HOME}`,
        {},
        t,
      ),
  },
  countries: {
    getCountries: async (q?: string, page?: number, t?: TranslateFn) => {
      "use cache";
      cacheLife("weeks");
      cacheTag("countries");
      const url = new URL(`${API_BASE_URL}/${API_ROUTES.COUNTRIES}`);
      if (q) url.searchParams.set("q", q);
      if (page) url.searchParams.set("page", String(page));
      return await fetchHandler<getCountriesResponse>(
        url.toString(),
        { timeout: 4000 },
        t,
      );
    },
    getCountryWithRegions: async (slug: string, t?: TranslateFn) => {
      "use cache";
      cacheLife("weeks");
      cacheTag(`country-${slug}`);

      return fetchHandler<CountryWithRegionsResponse>(
        `${API_BASE_URL}/countries/${slug}`,
        { timeout: 4000 },
        t,
      );
    },

    getRegionPackingData: async (
      countrySlug: string,
      regionSlug: string,
      t?: TranslateFn,
    ) => {
      "use cache";
      cacheLife("weeks");
      cacheTag(`region-packing-${countrySlug}-${regionSlug}`);
      return fetchHandler<RegionPackingResponse>(
        `${API_BASE_URL}${API_ROUTES.REGION(countrySlug, regionSlug)}`,
        { timeout: 4000 },
        t,
      );
    },
  },
  regions: {
    getRegions: async (q?: string, page?: number, t?: TranslateFn) => {
      "use cache";
      cacheLife("weeks");
      cacheTag("all-regions");
      const url = new URL(`${API_BASE_URL}/${API_ROUTES.REGIONS}`);
      url.searchParams.set("page", String(page ?? 1));
      if (q) url.searchParams.set("q", q);
      return await fetchHandler<getRegionsPaginatedResponse>(
        url.toString(),
        { timeout: 4000 },
        t,
      );
    },
  },
  admin: {
    getDashboardData: async (headers?: Headers, t?: TranslateFn) => {
      return fetchHandler<AdminDashboardResponse>(
        `${API_BASE_URL}/${API_ROUTES.ADMIN_DASHBOARD}`,
        {
          headers: headers ? Object.fromEntries(headers.entries()) : {},
          timeout: 5000,
        },
        t,
      );
    },
  },
};
