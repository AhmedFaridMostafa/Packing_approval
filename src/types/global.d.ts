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

type APISuccessResponse<T = null> = NextResponse<
  Omit<SuccessResponse<T>>,
  "status"
>;
type APIErrorResponse = NextResponse<Omit<ErrorResponse, "status">>;

type ActionResponse<T = null> = SuccessResponse<T> | ErrorResponse;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<
    Record<string, string> & {
      search_query?: string;
      page?: string;
      country_id?: string;
      region_id?: string;
      category_id?: string;
      action?: string;
    }
  >;
}

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

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
  pathname: string;
}

interface Country {
  id: number;
  slug: string;
  name_en: string;
  name_ar: string;
  flag_url: string | null;
}

interface Region {
  id: number;
  slug: string;
  label_name_en: string;
  label_name_ar: string;
  account: string;
  labels: string[];
}
interface RegionWithCount extends Region {
  guidelines_count: number;
}

interface CountryWithRegionsResponse {
  country: Country;
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
  country: Country;
  region: Region;
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

interface Category {
  id: number;
  name_en: string;
  name_ar: string;
  sort_order: number;
}

interface CategoryWithCount extends Category {
  guidelines_count: number;
}

type getAdminCategoriesResponse = CategoryWithCount[];

interface DeletedRegion {
  id: number;
  slug: string;
  label_name_en: string;
  label_name_ar: string;
  account: string;
  labels: string[];
  deleted_at: Date | string;
  country_id?: number;
  country_slug?: string;
  country_name_en?: string;
  country_name_ar?: string;
  country_flag_url?: string | null;
  guidelines_count: number;
}
interface getDeletedRegionsResponse {
  regions: DeletedRegion[];
  totalItems: number;
  totalPages: number;
}

interface RegionDetailResponse {
  region: Region;
  country: Country;
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

interface AdminPackingWayItem {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  image_url: string | null;
  region_id: number;
  region_name_en: string;
  region_name_ar: string;
  region_slug: string;
  country_id: number;
  country_name_en: string;
  country_name_ar: string;
  country_slug: string;
  country_flag_url: string | null;
  category_id: number;
  category_name_en: string;
  category_name_ar: string;
  created_at: Date | string;
  updated_at: Date | string;
  updated_by_name: string | null;
}

interface getAdminPackingWaysResponse {
  packingWays: AdminPackingWayItem[];
  totalItems: number;
  totalPages: number;
}

interface DeletedPackingWayItem extends AdminPackingWayItem {
  deleted_at: Date | string;
  deleted_by_name: string | null;
  deleted_by_email: string | null;
}

interface getDeletedPackingWaysResponse {
  packingWays: DeletedPackingWayItem[];
  totalItems: number;
  totalPages: number;
}

type PackingWayDetail = AdminPackingWayItem;

interface PackingSnapshot {
  id: string;
  region_id: number;
  category_id: number;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  image_url: string | null;
  created_by_id: string | null;
  updated_by_id: string | null;
  deleted_by_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface AdminHistoryItem {
  id: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  packing_id: string | null;
  changed_by_name: string;
  changed_by_email: string;
  change_timestamp: string;
  country_id: number;
  country_name_en: string;
  country_name_ar: string;
  region_id: number;
  region_name_en: string;
  region_name_ar: string;
  category_id: number;
  category_name_en: string;
  category_name_ar: string;
  title_en: string | null;
  title_ar: string | null;
  snapshot_before: PackingSnapshot | null;
  snapshot_after: PackingSnapshot | null;
}

interface getPackingHistoryResponse {
  history: AdminHistoryItem[];
  totalItems: number;
  totalPages: number;
}

interface RegionOption {
  id: number;
  label_name_en: string;
  label_name_ar: string;
  account: string;
}

interface PackingWayFormData {
  countries: Country[];
  regionsByCountry: Record<number, RegionOption[]>;
  categories: Category[];
}
