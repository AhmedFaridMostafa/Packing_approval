import { NextResponse } from "next/server";
import { restoreCountry } from "@/server/services/country.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";
import { countryParamsSchema } from "@/lib/validations";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ countrySlug?: string }> },
) {
  const [t, { countrySlug }] = await Promise.all([
    getTranslations("Validation"),
    params,
  ]);
  try {
    const validation = countryParamsSchema(t).parse({ countrySlug });
    const auth = await checkApiAdmin(request.headers);

    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const restored = await restoreCountry(validation.countrySlug);
    revalidateTag("countries", { expire: 0 });
    revalidateTag(`country-${restored.slug}`, { expire: 0 });

    return apiSuccess(restored);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
