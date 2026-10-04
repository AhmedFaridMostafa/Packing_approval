import { getTranslations } from "next-intl/server";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getPackingHistoryPaginated } from "@/server/services/history.service";
import { ACTIONS } from "@/constants";

const numberParam = (value: string | null) =>
  value ? Number(value) : undefined;

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const params = new URL(request.url).searchParams;
    const values = ["country_id", "region_id", "category_id", "page"].map(
      (key) => {
        const value = numberParam(params.get(key));
        if (!Number.isInteger(value) && value !== undefined)
          throw new Error(t("invalid_id"));
        return value;
      },
    );
    const [country_id, region_id, category_id, page] = values;
    const action = ACTIONS.find((value) => value === params.get("action"));

    return apiSuccess(
      await getPackingHistoryPaginated({
        q: params.get("q") || undefined,
        country_id,
        region_id,
        category_id,
        action,
        currentPage: page,
      }),
    );
  } catch (error: unknown) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
