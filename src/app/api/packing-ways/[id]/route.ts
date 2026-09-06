import { NextResponse } from "next/server";
import {
  getPackingWayById,
  updatePackingWay,
  deletePackingWay,
} from "@/server/services/packing.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiPackingSchema, ImageSchema } from "@/lib/validations";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { uploadImage } from "@/server/services/upload.service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getTranslations("Validation");
  try {
    const id = (await params).id;
    const data = await getPackingWayById(id);
    if (!data) {
      return NextResponse.json(
        { success: false, data: null, error: t("not_found") },
        { status: 404 },
      );
    }
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized || !auth.session?.user) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }
    const id = (await params).id;
    const existing = await getPackingWayById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, data: null, error: t("not_found") },
        { status: 404 },
      );
    }
    const formData = await request.formData();
    const imageFile = ImageSchema(t).parse(formData.get("image"));
    const imageUrl = imageFile ? await uploadImage(imageFile, "") : null;

    const body = Object.fromEntries(
      [
        "region_id",
        "category_id",
        "title_en",
        "title_ar",
        "description_en",
        "description_ar",
      ].map((key) => [key, formData.get(key)]),
    );

    const validatedData = apiPackingSchema(t)
      .partial()
      .parse({
        ...body,
        region_id: Number(body.region_id),
        category_id: Number(body.category_id),
        image_url: imageUrl,
      });

    const data = await updatePackingWay(id, validatedData, {
      id: auth.session.user.id,
      name: auth.session.user.name,
      email: auth.session.user.email,
    });
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
    if (!auth.authorized || !auth.session?.user) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const id = (await params).id;
    const existing = await getPackingWayById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, data: null, error: t("not_found") },
        { status: 404 },
      );
    }

    const data = await deletePackingWay(id, {
      id: auth.session.user.id,
      name: auth.session.user.name,
      email: auth.session.user.email,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
