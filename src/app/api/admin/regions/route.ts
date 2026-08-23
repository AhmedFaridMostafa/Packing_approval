import { createRegion } from "@/server/services/region.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiRegionSchema } from "@/lib/validations";
import {
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const body = await request.json();
    const validatedData = apiRegionSchema(t).parse(body);

    const data = await createRegion(validatedData);

    revalidateTag("all-regions", { expire: 0 });
    revalidateTag("regions-detail", { expire: 0 });

    return apiSuccess(data, 201);
  } catch (error: unknown) {
    console.error(`Error in POST ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
