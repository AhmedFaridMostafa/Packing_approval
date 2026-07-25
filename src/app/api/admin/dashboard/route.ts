import { NextResponse } from "next/server";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { getAdminDashboardData } from "@/server/services/admin.service";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const authResult = await checkApiAdmin(request.headers);
    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const data = await getAdminDashboardData(request.headers);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
