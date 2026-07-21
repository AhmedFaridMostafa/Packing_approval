import { NextResponse } from "next/server";
import {
  createRegion,
  getRegionsPaginated,
} from "@/server/services/region.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiRegionSchema, regionsParamsSchema } from "@/lib/validations";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const { searchParams } = new URL(request.url);

    const { searchQuery, currentPage } = regionsParamsSchema(t).parse({
      searchQuery: searchParams.get("q"),
      currentPage: searchParams.get("page"),
    });

    const data = await getRegionsPaginated({
      searchQuery,
      currentPage,
    });

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
