import { NextResponse } from "next/server";
import {
  updateRegion,
  deleteRegion,
  getRegionById,
} from "@/server/services/region.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiRegionSchema } from "@/lib/validations";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const id = parseInt((await params).id);
    if (isNaN(id))
      return NextResponse.json(
        { success: false, data: null, error: t("invalid_id") },
        { status: 400 },
      );

    const existing = await getRegionById(id);
    if (!existing)
      return NextResponse.json(
        { success: false, data: null, error: t("not_found") },
        { status: 404 },
      );

    const body = await request.json();
    const validatedData = apiRegionSchema(t).partial().parse(body);

    const data = await updateRegion(id, validatedData);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getTranslations("Validation");

  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const id = parseInt((await params).id);
    if (isNaN(id))
      return NextResponse.json(
        { success: false, data: null, error: t("invalid_id") },
        { status: 400 },
      );

    const existing = await getRegionById(id);
    if (!existing)
      return NextResponse.json(
        { success: false, data: null, error: t("not_found") },
        { status: 404 },
      );

    const data = await deleteRegion(id);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
