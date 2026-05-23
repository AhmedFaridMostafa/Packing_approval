import { NextResponse } from "next/server";
import {
  getPackingWays,
  createPackingWay,
} from "@/server/services/packing.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiPackingSchema } from "@/lib/validations";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const { searchParams } = new URL(request.url);
    const regionIdStr = searchParams.get("regionId");
    const categoryIdStr = searchParams.get("categoryId");

    const region_id = regionIdStr ? parseInt(regionIdStr) : undefined;
    const category_id = categoryIdStr ? parseInt(categoryIdStr) : undefined;

    if (
      (regionIdStr && isNaN(region_id!)) ||
      (categoryIdStr && isNaN(category_id!))
    ) {
      return NextResponse.json(
        { success: false, data: null, error: t("invalid_id") },
        { status: 400 },
      );
    }

    const data = await getPackingWays({ region_id, category_id });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function POST(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized || !auth.session?.user) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }
    const body = await request.json();
    const validatedData = apiPackingSchema(t).parse(body);
    const data = await createPackingWay(validatedData, {
      id: auth.session.user.id,
      name: auth.session.user.name,
      email: auth.session.user.email,
    });
    return apiSuccess(data, 201);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
