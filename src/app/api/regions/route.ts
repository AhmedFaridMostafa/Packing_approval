import { NextResponse } from "next/server";
import { getRegions, createRegion } from "@/server/services/region.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiRegionSchema } from "@/lib/validations";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const { searchParams } = new URL(request.url);
    const countryIdStr = searchParams.get("countryId");
    const countryId = countryIdStr ? parseInt(countryIdStr) : undefined;
    const data = await getRegions(countryId);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function POST(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }
    const body = await request.json();
    const validatedData = apiRegionSchema(t).parse(body);
    const data = await createRegion(validatedData);
    return apiSuccess(data, 201);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
