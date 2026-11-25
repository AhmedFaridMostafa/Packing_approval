import { getCountryWithRegions } from "@/server/services/country.service";
import { getTranslations } from "next-intl/server";
import { countryParamsSchema } from "@/lib/validations";
import { apiNotFound, apiSuccess, handleApiError } from "@/lib/api-response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ countrySlug?: string }> },
) {
  const [tApi, { countrySlug }] = await Promise.all([
    getTranslations("api.errors"),
    params,
  ]);

  try {
    const validation = countryParamsSchema(tApi).parse({ countrySlug });
    const result = await getCountryWithRegions(validation.countrySlug);
    if (!result) return apiNotFound(tApi);
    return apiSuccess(result);
  } catch (error) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, tApi);
  }
}
