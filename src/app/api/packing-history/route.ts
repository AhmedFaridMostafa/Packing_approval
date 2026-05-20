import { NextResponse } from "next/server";
import { getPackingHistory } from "@/server/services/history.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const packing_id = searchParams.get("packing_id") || undefined;
    const region_id = searchParams.has("region_id") ? parseInt(searchParams.get("region_id")!) : undefined;
    const country_id = searchParams.has("country_id") ? parseInt(searchParams.get("country_id")!) : undefined;
    const category_id = searchParams.has("category_id") ? parseInt(searchParams.get("category_id")!) : undefined;
    const action = searchParams.get("action") as "CREATE" | "UPDATE" | "DELETE" | undefined;
    const page = searchParams.has("page") ? parseInt(searchParams.get("page")!) : 1;
    const limit = searchParams.has("limit") ? parseInt(searchParams.get("limit")!) : 50;

    const data = await getPackingHistory({
      packing_id,
      region_id: region_id && !isNaN(region_id) ? region_id : undefined,
      country_id: country_id && !isNaN(country_id) ? country_id : undefined,
      category_id: category_id && !isNaN(category_id) ? category_id : undefined,
      action: action && ["CREATE", "UPDATE", "DELETE"].includes(action) ? action : undefined,
      page: !isNaN(page) && page > 0 ? page : 1,
      limit: !isNaN(limit) && limit > 0 ? limit : 50,
    });

    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
