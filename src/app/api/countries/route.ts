import { getCountries } from "@/server/services/country.service";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const { searchParams } = new URL(request.url);
    const data = await getCountries({
      searchQuery: searchParams.get("q") || undefined,
      currentPage: searchParams.has("page")
        ? parseInt(searchParams.get("page")!)
        : undefined,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
