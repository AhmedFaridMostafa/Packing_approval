import { NextResponse } from "next/server";
import { banUser, unbanUser } from "@/server/services/user.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { apiBanUserSchema } from "@/lib/validations";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const resolvedParams = await params;

    if (auth.session?.user.id === resolvedParams.id) {
      return NextResponse.json(
        { success: false, data: null, error: t("cannot_ban_self") },
        { status: 403 },
      );
    }

    const body = await request.json().catch(() => ({}));
    const validatedData = apiBanUserSchema(t).parse(body);

    const data = await banUser(
      request.headers,
      resolvedParams.id,
      validatedData.reason,
      validatedData.expiresIn,
    );

    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const resolvedParams = await params;

    // Cannot unban yourself
    if (auth.session?.user.id === resolvedParams.id) {
      return NextResponse.json(
        { success: false, data: null, error: t("cannot_unban_self") },
        { status: 403 },
      );
    }

    const data = await unbanUser(request.headers, resolvedParams.id);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
