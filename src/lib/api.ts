import { API_ROUTES } from "@/constants/routes";
import { fetchHandler } from "./fetch-handler";
import { cacheLife, cacheTag } from "next/cache";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

export const api = {
  home: {
    getHomeData: () =>
      fetchHandler<getHomeDataResponse>(
        `${API_BASE_URL}${API_ROUTES.HOME}`,
        {},
      ),
  },
  countries: {
    getCountries: async (q?: string, page?: number) => {
      "use cache";
      cacheLife("weeks");
      cacheTag("countries");
      const url = new URL(`${API_BASE_URL}${API_ROUTES.COUNTRIES}`);
      if (q) url.searchParams.set("q", q);
      if (page) url.searchParams.set("page", String(page));
      return await fetchHandler<getCountriesResponse>(url.toString(), {
        timeout: 4000,
      });
    },
    getAllActiveCountries: async (headers: Headers) => {
      return await fetchHandler<Country[]>(
        `${API_BASE_URL}${API_ROUTES.COUNTRIES_ADMIN}`,
        {
          headers: headers ? Object.fromEntries(headers.entries()) : {},
          timeout: 4000,
        },
      );
    },
    getCountryWithRegions: async (slug: string) => {
      "use cache";
      cacheLife("weeks");
      cacheTag(`country-${slug}`);

      return fetchHandler<CountryWithRegionsResponse>(
        `${API_BASE_URL}${API_ROUTES.COUNTRY(slug)}`,
        { timeout: 4000 },
      );
    },
    getRegionPackingData: async (countrySlug: string, regionSlug: string) => {
      "use cache";
      cacheLife("weeks");
      cacheTag(`region-packing-${countrySlug}-${regionSlug}`, "regions-detail");
      return fetchHandler<RegionPackingResponse>(
        `${API_BASE_URL}${API_ROUTES.REGION(countrySlug, regionSlug)}`,
        { timeout: 4000 },
      );
    },
    getDeletedCountries: async (
      headers: Headers,
      q?: string,
      page?: number,
    ) => {
      const url = new URL(
        `${API_BASE_URL}${API_ROUTES.COUNTRIES_ADMIN_DELETED}`,
      );
      if (q) url.searchParams.set("q", q);
      if (page) url.searchParams.set("page", String(page));
      return await fetchHandler<getDeletedCountriesResponse>(url.toString(), {
        headers: headers ? Object.fromEntries(headers.entries()) : {},
        timeout: 4000,
      });
    },
  },
  regions: {
    getRegions: async (q?: string, page?: number) => {
      "use cache";
      cacheLife("weeks");
      cacheTag("all-regions");
      const url = new URL(`${API_BASE_URL}${API_ROUTES.REGIONS}`);
      if (page) url.searchParams.set("page", String(page));
      if (q) url.searchParams.set("q", q);
      return await fetchHandler<getRegionsPaginatedResponse>(url.toString(), {
        timeout: 4000,
      });
    },
    getRegionById: async (headers: Headers, id: number) => {
      return await fetchHandler<RegionDetailResponse>(
        `${API_BASE_URL}${API_ROUTES.REGION_ADMIN(id)}`,
        {
          headers: headers ? Object.fromEntries(headers.entries()) : {},
          timeout: 4000,
        },
      );
    },
    getDeletedRegions: async (headers: Headers, q?: string, page?: number) => {
      const url = new URL(`${API_BASE_URL}${API_ROUTES.REGIONS_ADMIN_DELETED}`);
      if (q) url.searchParams.set("q", q);
      if (page) url.searchParams.set("page", String(page));
      return await fetchHandler<getDeletedRegionsResponse>(url.toString(), {
        headers: headers ? Object.fromEntries(headers.entries()) : {},
        timeout: 4000,
      });
    },
  },
  categories: {
    getAdminCategories: async (headers: Headers) => {
      return await fetchHandler<getAdminCategoriesResponse>(
        `${API_BASE_URL}${API_ROUTES.CATEGORIES_ADMIN}`,
        {
          headers: headers ? Object.fromEntries(headers.entries()) : {},
          timeout: 4000,
        },
      );
    },
  },
  admin: {
    getDashboardData: async (headers: Headers) => {
      return await fetchHandler<AdminDashboardResponse>(
        `${API_BASE_URL}${API_ROUTES.ADMIN_DASHBOARD}`,
        {
          headers: headers ? Object.fromEntries(headers.entries()) : {},
          timeout: 5000,
        },
      );
    },
  },
};
