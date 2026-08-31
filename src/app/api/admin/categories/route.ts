import {
  getCategoriesWithCounts,
  createCategory,
} from "@/server/services/category.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiCategorySchema } from "@/lib/validations";
import {
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const data = await getCategoriesWithCounts();

    return apiSuccess(data);
  } catch (error: unknown) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, t);
  }
}

export async function POST(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const body = await request.json();
    const validatedData = apiCategorySchema(t).parse(body);

    const data = await createCategory(validatedData);

    revalidateTag("regions-detail", { expire: 0 });

    return apiSuccess(data, 201);
  } catch (error: unknown) {
    console.error(`Error in POST ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
