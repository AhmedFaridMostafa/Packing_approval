import { restoreCountry } from "@/server/services/country.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";
import { countryParamsSchema } from "@/lib/validations";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ countrySlug?: string }> },
) {
  const [tApi, { countrySlug }] = await Promise.all([
    getTranslations("api.errors"),
    params,
  ]);
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(tApi);

    const validation = countryParamsSchema(tApi).parse({ countrySlug });

    const restored = await restoreCountry(validation.countrySlug);
    revalidateTag("countries", { expire: 0 });
    revalidateTag(`country-${restored.slug}`, { expire: 0 });

    return apiSuccess(restored);
  } catch (error: unknown) {
    console.error(`Error in POST ${request.url}:`, error);
    return handleApiError(error, tApi);
  }
}
