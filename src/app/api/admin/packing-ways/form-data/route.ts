import { getTranslations } from "next-intl/server";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getPackingWayFormData } from "@/server/services/packing.service";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const data = await getPackingWayFormData();
    return apiSuccess(data);
  } catch (error: unknown) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
