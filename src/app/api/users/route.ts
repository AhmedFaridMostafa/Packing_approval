import { NextResponse } from "next/server";
import { getUsers } from "@/server/services/user.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.has("page")
      ? parseInt(searchParams.get("page")!)
      : 1;
    const limit = searchParams.has("limit")
      ? parseInt(searchParams.get("limit")!)
      : 50;

    const data = await getUsers(request.headers, {
      page: !isNaN(page) && page > 0 ? page : 1,
      limit: !isNaN(limit) && limit > 0 ? limit : 50,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
