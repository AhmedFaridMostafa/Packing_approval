import { getCountryWithRegions } from "@/server/services/country.service";
import { getTranslations } from "next-intl/server";
import { apiSlugSchema } from "@/lib/validations";
import { apiNotFound, apiSuccess, handleApiError } from "@/lib/api-response";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const [t, { slug }] = await Promise.all([
    getTranslations("Validation"),
    params,
  ]);

  try {
    const validation = apiSlugSchema(t).parse(slug);

    const result = await getCountryWithRegions(validation);

    if (!result) return apiNotFound(t);

    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error, t);
  }
}
