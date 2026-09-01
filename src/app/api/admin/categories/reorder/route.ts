import { reorderCategories } from "@/server/services/category.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiCategoryReorderSchema } from "@/lib/validations";
import {
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

export async function PUT(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const body = await request.json();
    const validatedData = apiCategoryReorderSchema(t).parse(body);

    await reorderCategories(validatedData);

    revalidateTag("regions-detail", { expire: 0 });

    return apiSuccess(null, 201);
  } catch (error: unknown) {
    console.error(`Error in PUT ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
