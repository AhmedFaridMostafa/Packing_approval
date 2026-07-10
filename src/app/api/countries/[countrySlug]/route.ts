import { getCountryWithRegions } from "@/server/services/country.service";
import { getTranslations } from "next-intl/server";
import { countryParamsSchema } from "@/lib/validations";
import { apiNotFound, apiSuccess, handleApiError } from "@/lib/api-response";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ countrySlug?: string }> },
) {
  const [t, { countrySlug }] = await Promise.all([
    getTranslations("Validation"),
    params,
  ]);

  try {
    const validation = countryParamsSchema(t).parse({ countrySlug });
    const result = await getCountryWithRegions(validation.countrySlug);
    if (!result) return apiNotFound(t);
    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error, t);
  }
}
