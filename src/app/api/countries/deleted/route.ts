import { NextResponse } from "next/server";
import { getDeletedCountries } from "@/server/services/country.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);

    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const data = await getDeletedCountries({
      searchQuery: searchParams.get("q") || undefined,
      currentPage: searchParams.has("page")
        ? parseInt(searchParams.get("page")!)
        : undefined,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
