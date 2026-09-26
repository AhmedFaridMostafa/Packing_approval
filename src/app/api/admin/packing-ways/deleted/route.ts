import { getTranslations } from "next-intl/server";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getDeletedPackingWays } from "@/server/services/packing.service";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);
    const params = new URL(request.url).searchParams;
    const num = (key: string) => {
      const value = params.get(key);
      return value ? Number(value) : undefined;
    };
    return apiSuccess(
      await getDeletedPackingWays({
        q: params.get("q") || undefined,
        country_id: num("country_id"),
        category_id: num("category_id"),
        currentPage: num("page"),
      }),
    );
  } catch (error) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
