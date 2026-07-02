type SuccessResponse<T = null> = {
  success: true;
  data: T;
  status?: number;
};

type ErrorResponse = {
  success: false;
  status: number;
  error: {
    message: string;
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
  label_name_en: string | null;
  label_name_ar: string | null;
  account: string;
  labels: string[];
  guidelines_count: number;
}

interface CountryWithRegionsResponse {
  country: CountryDetail;
  regions: RegionWithCount[];
  total_guidelines: number;
}
