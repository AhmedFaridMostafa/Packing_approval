import { API_ROUTES } from "@/constants/routes";
import { fetchHandler } from "./fetch-handler";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

export const apiClient = {
  countries: {
    createCountry: async (
      data: {
        name_en: string;
        name_ar: string;
        flag_url?: string;
        image_file?: File;
      },
      t?: TranslateFn,
    ) => {
      const formData = new FormData();
      formData.append("name_en", data.name_en);
      formData.append("name_ar", data.name_ar);
      if (data.flag_url) formData.append("flag_url", data.flag_url);
      if (data.image_file) formData.append("image_file", data.image_file);

      return fetchHandler<CountryDetail>(
        `${API_BASE_URL}${API_ROUTES.COUNTRIES}`,
        {
          method: "POST",
          body: formData,
          timeout: 120000,
        },
        t,
      );
    },
    updateCountry: async (
      data: {
        slug: string;
        name_en?: string;
        name_ar?: string;
        flag_url?: string;
        image_file?: File;
      },
      t?: TranslateFn,
    ) => {
      const formData = new FormData();
      if (data.name_en) formData.append("name_en", data.name_en);
      if (data.name_ar) formData.append("name_ar", data.name_ar);
      if (data.flag_url) formData.append("flag_url", data.flag_url);
      if (data.image_file) formData.append("image_file", data.image_file);

      return fetchHandler<CountryDetail>(
        `${API_BASE_URL}${API_ROUTES.COUNTRY(data.slug)}`,
        {
          method: "PUT",
          body: formData,
          timeout: 120000,
        },
        t,
      );
    },
    deleteCountry: async (slug: string, t?: TranslateFn) => {
      return fetchHandler<CountryDetail>(
        `${API_BASE_URL}${API_ROUTES.COUNTRY(slug)}`,
        {
          method: "DELETE",
        },
        t,
      );
    },
  },
};
