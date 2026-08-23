import { getRegionsPaginated } from "@/server/services/region.service";
import { regionsParamsSchema } from "@/lib/validations";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const { searchParams } = new URL(request.url);

    const { searchQuery, currentPage } = regionsParamsSchema(t).parse({
      searchQuery: searchParams.get("q") ?? "",
      currentPage: searchParams.get("page") ?? 1,
    });

    const data = await getRegionsPaginated({
      searchQuery,
      currentPage,
    });

    return apiSuccess(data);
  } catch (error: unknown) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
