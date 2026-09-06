import { API_ROUTES } from "@/constants/routes";
import { fetchHandler } from "./fetch-handler";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

export const apiClient = {
  countries: {
    createCountry: async (data: {
      name_en: string;
      name_ar: string;
      flag_url?: string;
      image_file?: File;
    }) => {
      const formData = new FormData();
      formData.append("name_en", data.name_en);
      formData.append("name_ar", data.name_ar);
      if (data.flag_url) formData.append("flag_url", data.flag_url);
      if (data.image_file) formData.append("image_file", data.image_file);

      return fetchHandler<Country>(
        `${API_BASE_URL}${API_ROUTES.COUNTRIES_ADMIN}`,
        {
          method: "POST",
          body: formData,
          timeout: 120000,
        },
      );
    },

    updateCountry: async (data: {
      slug: string;
      name_en?: string;
      name_ar?: string;
      flag_url?: string;
      image_file?: File;
    }) => {
      const formData = new FormData();
      if (data.name_en) formData.append("name_en", data.name_en);
      if (data.name_ar) formData.append("name_ar", data.name_ar);
      if (data.flag_url) formData.append("flag_url", data.flag_url);
      if (data.image_file) formData.append("image_file", data.image_file);

      return fetchHandler<Country>(
        `${API_BASE_URL}${API_ROUTES.COUNTRY_ADMIN(data.slug)}`,
        {
          method: "PUT",
          body: formData,
          timeout: 120000,
        },
      );
    },

    deleteCountry: async (slug: string) => {
      return fetchHandler<Country>(
        `${API_BASE_URL}${API_ROUTES.COUNTRY_ADMIN(slug)}`,
        {
          method: "DELETE",
        },
      );
    },

    restoreCountry: async (slug: string) => {
      return fetchHandler<Country>(
        `${API_BASE_URL}${API_ROUTES.COUNTRY_ADMIN_RESTORE(slug)}`,
        {
          method: "POST",
        },
      );
    },
  },

  regions: {
    createRegion: async (data: {
      country_id: number;
      label_name_en: string;
      label_name_ar: string;
      account: string;
      labels: string[];
    }) => {
      return fetchHandler<Region>(
        `${API_BASE_URL}${API_ROUTES.REGIONS_ADMIN}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          timeout: 120000,
        },
      );
    },

    updateRegion: async (
      id: number,
      data: {
        label_name_en?: string;
        label_name_ar?: string;
        account?: string;
        labels?: string[];
      },
    ) => {
      return fetchHandler<Region>(
        `${API_BASE_URL}${API_ROUTES.REGION_ADMIN(id)}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          timeout: 120000,
        },
      );
    },

    deleteRegion: async (id: number) => {
      return fetchHandler<Region>(
        `${API_BASE_URL}${API_ROUTES.REGION_ADMIN(id)}`,
        {
          method: "DELETE",
        },
      );
    },

    restoreRegion: async (id: number) => {
      return fetchHandler<Region>(
        `${API_BASE_URL}${API_ROUTES.REGIONS_ADMIN_RESTORE(id)}`,
        {
          method: "POST",
        },
      );
    },
  },

  categories: {
    createCategory: async (data: { name_en: string; name_ar: string }) => {
      return fetchHandler<Category>(
        `${API_BASE_URL}${API_ROUTES.CATEGORIES_ADMIN}`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
    },

    updateCategory: async (
      id: number,
      data: { name_en?: string; name_ar?: string },
    ) => {
      return fetchHandler<Category>(
        `${API_BASE_URL}${API_ROUTES.CATEGORY_ADMIN(id)}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        },
      );
    },

    reorderCategories: async (
      updates: { id: number; sort_order: number }[],
    ) => {
      return fetchHandler<{ message: string }>(
        `${API_BASE_URL}${API_ROUTES.CATEGORIES_ADMIN_REORDER}`,
        {
          method: "PUT",
          body: JSON.stringify(updates),
        },
      );
    },
  },
};
