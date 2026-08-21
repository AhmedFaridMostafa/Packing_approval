export const ROUTES = {
  HOME: "/",

  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  VERIFY_EMAIL: "/verify-email",
  FORGET_PASSWORD: "/forget-password",
  RESET_PASSWORD: "/reset-password",

  PROFILE: (id: string) => `/profile/${id}`,

  CONTACT: "/contact",

  COUNTRIES: "/countries",
  COUNTRY: (countrySlug: string) => `/countries/${countrySlug}`,
  REGION: (countrySlug: string, regionSlug: string) =>
    `/countries/${countrySlug}/${regionSlug}`,

  REGIONS: "/regions",

  ADMIN: "/admin",
  ADMIN_REGIONS: "/admin/regions",
  ADMIN_REGIONS_ADD: "/admin/regions/add",

  ADMIN_COUNTRIES: "/admin/countries",
  ADMIN_COUNTRIES_ADD: "/admin/countries/add",
  ADMIN_COUNTRIES_DELETED: "/admin/countries/deleted",
  ADMIN_COUNTRIES_EDIT: (countrySlug: string) =>
    `/admin/countries/edit/${countrySlug}`,

  ADMIN_CATEGORIES_ADD: "/admin/categories/add",
  ADMIN_CATEGORIES_REORDER: "/admin/categories/reorder",

  ADMIN_PACKING_WAYS_ADD: "/admin/packing-ways/add",

  ADMIN_HISTORY: "/admin/history",
  ADMIN_USERS: "/admin/users",
} as const;

export const API_ROUTES = {
  HOME: "/api/home",

  AUTH: "/api/auth",

  COUNTRIES: "/api/countries",
  COUNTRIES_ADMIN: "/api/admin/countries",
  COUNTRIES_ADMIN_DELETED: "/api/admin/countries/deleted",
  COUNTRY_ADMIN: (countrySlug: string) => `/api/admin/countries/${countrySlug}`,
  COUNTRY_ADMIN_RESTORE: (countrySlug: string) =>
    `/api/admin/countries/${countrySlug}/restore`,
  COUNTRY: (countrySlug: string) => `/api/countries/${countrySlug}`,
  REGION: (countrySlug: string, regionSlug: string) =>
    `/api/countries/${countrySlug}/${regionSlug}`,

  REGIONS: "/api/regions",
  REGION_BY_ID: (id: string) => `/api/regions/${id}`,

  CATEGORIES: "/api/categories",
  CATEGORIES_REORDER: "/api/categories/reorder",

  PACKING_WAYS: "/api/packing-ways",
  PACKING_WAY: (id: string) => `/api/packing-ways/${id}`,

  PROFILE: "/api/profile",

  USERS: "/api/users",
  USER: (id: string) => `/api/users/${id}`,
  USER_BAN: (id: string) => `/api/users/${id}/ban`,
  USER_PASSWORD: (id: string) => `/api/users/${id}/password`,

  PACKING_HISTORY: "/api/packing-history",

  ADMIN_DASHBOARD: "/api/admin/dashboard",
} as const;
