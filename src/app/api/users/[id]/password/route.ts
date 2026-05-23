import { NextResponse } from "next/server";
import { checkApiAuth } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { confirmPasswordSchema } from "@/lib/validations";
import { setPassword } from "@/server/services/user.service";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getTranslations("Validation");
  try {
    const authCheck = await checkApiAuth(request.headers);
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const resolvedParams = await params;

    if (authCheck.session?.user.id !== resolvedParams.id) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 403 },
      );
    }

    const body = await request.json();
    const validatedData = confirmPasswordSchema(t).parse(body);

    await setPassword(request.headers, validatedData.newPassword);

    return apiSuccess({ message: "Password updated successfully" });
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
