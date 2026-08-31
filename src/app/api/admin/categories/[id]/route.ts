import { NextResponse } from "next/server";
import { updateCategory } from "@/server/services/category.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiCategorySchema } from "@/lib/validations";
import {
  apiNotFound,
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

interface AdminCategoryRouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(
  request: Request,
  { params }: AdminCategoryRouteParams,
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

    const body = await request.json();
    const validatedData = apiCategorySchema(t).partial().parse(body);

    const data = await updateCategory(id, validatedData);
    if (!data) return apiNotFound(t);

    revalidateTag("regions-detail", { expire: 0 });

    return apiSuccess(data);
  } catch (error: unknown) {
    console.error(`Error in PUT ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
