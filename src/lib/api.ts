import { ROUTES } from "@/constants/routes";
import { fetchHandler } from "./fetch-handler";
import { cacheLife, cacheTag } from "next/cache";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

export const api = {
  home: {
    getHomeData: (t?: TranslateFn) =>
      fetchHandler<getHomeDataResponse>(
        `${API_BASE_URL}/${ROUTES.HOME_API}`,
        {},
        t,
      ),
  },
  countries: {
    getCountries: async (q?: string, page?: number, t?: TranslateFn) => {
      "use cache";
      cacheLife("days");
      cacheTag("countries");
      const url = new URL(`${API_BASE_URL}/${ROUTES.COUNTRIES_API}`);
      if (q) url.searchParams.set("q", q);
      if (page) url.searchParams.set("page", String(page));
      return await fetchHandler<getCountriesResponse>(url.toString(), {}, t);
    },
  },
};
