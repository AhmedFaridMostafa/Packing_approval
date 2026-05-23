import { NextResponse } from "next/server";
import { reorderCategories } from "@/server/services/category.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiCategoryReorderSchema } from "@/lib/validations";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function PUT(request: Request) {
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
    const validatedData = apiCategoryReorderSchema(t).parse(body);

    await reorderCategories(validatedData);
    return apiSuccess({ message: "Categories reordered successfully" });
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
