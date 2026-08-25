import { NextResponse } from "next/server";
import { restoreRegion } from "@/server/services/region.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiNotFound,
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

interface AdminRegionRestoreRouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: Request,
  { params }: AdminRegionRestoreRouteParams,
) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const id = parseInt((await params).id);
    if (isNaN(id))
      return NextResponse.json(
        { success: false, status: 400, error: { message: t("invalid_id") } },
        { status: 400 },
      );

    const restored = await restoreRegion(id);

    if (!restored) return apiNotFound(t);

    revalidateTag("all-regions", { expire: 0 });
    revalidateTag("regions-detail", { expire: 0 });

    return apiSuccess(restored);
  } catch (error: unknown) {
    console.error(`Error in POST ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
