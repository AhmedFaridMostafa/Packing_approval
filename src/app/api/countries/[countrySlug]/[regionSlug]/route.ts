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
  const [t, { countrySlug, regionSlug }] = await Promise.all([
    getTranslations("Validation"),
    params,
  ]);
  try {
    const validation = regionParamsSchema(t).parse({ countrySlug, regionSlug });
    const result = await getRegionPackingData(
      validation.countrySlug,
      validation.regionSlug,
    );
    if (!result) return apiNotFound(t);
    return apiSuccess(result);
  } catch (error) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
