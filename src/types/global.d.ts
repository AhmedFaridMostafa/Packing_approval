type SuccessResponse<T = null> = {
  success: true;
  data: T;
  status?: number;
};

type ErrorResponse = {
  success: false;
  status: number;
  error: {
    message?: string;
    details?: Record<string, string[]>;
  };
};

type APIErrorResponse = NextResponse<ErrorResponse>;
type APISuccessResponse<T = null> = NextResponse<SuccessResponse<T>>;

type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;
type ActionResponse<T = null> = SuccessResponse<T> | ErrorResponse;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

type TranslateFn = (key: string, values?: any) => string;

interface LinkItem {
  href: string;
  text: string;
}

interface HomeStats {
  countries: number;
  regions: number;
  categories: number;
  guidelines: number;
}

interface FeaturedCountry {
  id: number;
  slug: string;
  name_en: string;
  name_ar: string;
  flag_url: string | null;
  region_count: number;
  guidelines_count: number;
}

interface getHomeDataResponse {
  stats: HomeStats;
  featuredCountries: FeaturedCountry[];
}

interface getCountriesResponse {
  countries: FeaturedCountry[];
  totalItems: number;
  totalPages: number;
}

interface DeletedCountry {
  id: number;
  slug: string;
  name_en: string;
  name_ar: string;
  flag_url: string | null;
  deleted_at: Date | string;
  region_count: number;
  guidelines_count: number;
}
interface getDeletedCountriesResponse {
  countries: DeletedCountry[];
  totalItems: number;
  totalPages: number;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
  pathname: string;
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
  pathname: string;
}

interface CountryDetail {
  id: number;
  slug: string;
  name_en: string;
  name_ar: string;
  flag_url: string | null;
}

interface RegionWithCount {
  id: number;
  slug: string;
  label_name_en: string;
  label_name_ar: string;
  account: string;
  labels: string[];
  guidelines_count: number;
}

interface CountryWithRegionsResponse {
  country: CountryDetail;
  regions: RegionWithCount[];
  total_guidelines: number;
}

interface PackingDetail {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  image_url: string | null;
}

interface CategoryDetail {
  id: number;
  name_en: string;
  name_ar: string;
  sort_order: number;
}

interface CategoryGroup {
  category: CategoryDetail;
  items: PackingDetail[];
}

interface RegionPackingResponse {
  country: CountryDetail;
  region: Omit<RegionWithCount, "guidelines_count">;
  groupedPacking: CategoryGroup[];
  totalGuidelines: number;
}

interface RegionWithCountryAndCount {
  id: number;
  slug: string;
  label_name_en: string;
  label_name_ar: string;
  account: string;
  labels: string[];
  country_id?: number;
  country_name_en?: string;
  country_name_ar?: string;
  country_slug?: string;
  country_flag_url?: string | null;
  guidelines_count: number;
}

interface getRegionsPaginatedResponse {
  regions: RegionWithCountryAndCount[];
  totalItems: number;
  totalPages: number;
}

interface AdminDashboardStats {
  countries: number;
  regions: number;
  categories: number;
  guidelines: number;
  users: number;
}

interface RecentHistoryItem {
  id: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  changed_by_name: string;
  changed_by_email: string;
  change_timestamp: string;
  country_name_en: string;
  country_name_ar: string;
  region_name_en: string;
  region_name_ar: string;
  category_name_en: string;
  category_name_ar: string;
  title_en: string;
  title_ar: string;
}

interface AdminDashboardResponse {
  stats: AdminDashboardStats;
  recentHistory: RecentHistoryItem[];
}
