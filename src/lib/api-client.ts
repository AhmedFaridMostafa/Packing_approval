import { ROUTES } from "@/constants/routes";
import { fetchHandler } from "./fetch-handler";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

export const apiClient = {
  countries: {
    deleteCountry: async (id: number, t?: TranslateFn) => {
      return fetchHandler<CountryDetail>(
        `${API_BASE_URL}/${ROUTES.COUNTRIES_API}?id=${id}`,
        {
          method: "DELETE",
        },
        t,
      );
    },
  },
};
