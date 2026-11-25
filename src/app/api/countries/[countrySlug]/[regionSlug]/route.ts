import { getTranslations } from "next-intl/server";
import { regionParamsSchema } from "@/lib/validations";
import { apiNotFound, apiSuccess, handleApiError } from "@/lib/api-response";
import { getRegionPackingData } from "@/server/services/region.service";

export async function GET(
  request: Request,
  {
    params,
  }: { params: Promise<{ countrySlug?: string; regionSlug?: string }> },
) {
  const [tApi, { countrySlug, regionSlug }] = await Promise.all([
    getTranslations("api.errors"),
    params,
  ]);
  try {
    const validation = regionParamsSchema(tApi).parse({ countrySlug, regionSlug });
    const result = await getRegionPackingData(
      validation.countrySlug,
      validation.regionSlug,
    );
    if (!result) return apiNotFound(tApi);
    return apiSuccess(result);
  } catch (error) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, tApi);
  }
}
