import { getDeletedRegions } from "@/server/services/region.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const { searchParams } = new URL(request.url);

    const data = await getDeletedRegions({
      searchQuery: searchParams.get("q") || undefined,
      currentPage: searchParams.has("page")
        ? parseInt(searchParams.get("page")!)
        : undefined,
    });

    return apiSuccess(data);
  } catch (error: unknown) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
