import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import {
  getFeaturedCountries,
  getHomeStats,
} from "@/server/services/home.service";

export async function GET() {
  const t = await getTranslations("Validation");
  try {
    const [stats, featuredCountries] = await Promise.all([
      getHomeStats(),
      getFeaturedCountries(),
    ]);
    return apiSuccess({ stats, featuredCountries });
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
