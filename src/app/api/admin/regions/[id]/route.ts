import { NextResponse } from "next/server";
import {
  updateRegion,
  deleteRegion,
  getRegionWithCountryById,
} from "@/server/services/region.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiRegionSchema } from "@/lib/validations";
import {
  apiNotFound,
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

interface AdminRegionRouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  { params }: AdminRegionRouteParams,
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

    const data = await getRegionWithCountryById(id);
    if (!data) return apiNotFound(t);

    return apiSuccess(data);
  } catch (error: unknown) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, t);
  }
}

export async function PUT(
  request: Request,
  { params }: AdminRegionRouteParams,
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

    const existing = await getRegionWithCountryById(id);
    if (!existing) return apiNotFound(t);

    const body = await request.json();
    const validatedData = apiRegionSchema(t).partial().parse(body);

    const data = await updateRegion(id, validatedData);

    revalidateTag("all-regions", { expire: 0 });
    revalidateTag("regions-detail", { expire: 0 });

    return apiSuccess(data);
  } catch (error: unknown) {
    console.error(`Error in PUT ${request.url}:`, error);
    return handleApiError(error, t);
  }
}

export async function DELETE(
  request: Request,
  { params }: AdminRegionRouteParams,
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

    const existing = await getRegionWithCountryById(id);
    if (!existing) return apiNotFound(t);

    const data = await deleteRegion(id);

    revalidateTag("all-regions", { expire: 0 });
    revalidateTag("regions-detail", { expire: 0 });

    return apiSuccess(data);
  } catch (error: unknown) {
    console.error(`Error in DELETE ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
