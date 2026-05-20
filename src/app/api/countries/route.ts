import { NextResponse } from "next/server";
import { getCountries, createCountry } from "@/server/services/country.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiCountrySchema } from "@/lib/validations";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";

export async function GET() {
  const t = await getTranslations("Validation");
  try {
    const data = await getCountries();
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function POST(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validatedData = apiCountrySchema(t).parse(body);

    const data = await createCountry(validatedData);
    return apiSuccess(data, 201);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
