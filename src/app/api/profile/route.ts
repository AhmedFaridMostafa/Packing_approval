import { NextResponse } from "next/server";
import { updateProfile } from "@/server/services/user.service";
import { checkApiAuth } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { apiProfileSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const authCheck = await checkApiAuth(request.headers);
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }
    return apiSuccess(authCheck.session?.user);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function PUT(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const authCheck = await checkApiAuth(request.headers);
    if (!authCheck.authorized || !authCheck.session?.user.id) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }
    const body = await request.json();
    const validatedData = apiProfileSchema(t).parse(body);
    const result = await updateProfile(request.headers, {
      name: validatedData.name,
      image: validatedData.image,
    });
    return apiSuccess(result);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
