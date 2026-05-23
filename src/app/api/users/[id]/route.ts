import { NextResponse } from "next/server";
import {
  getUserById,
  updateUserRole,
  deleteUser,
} from "@/server/services/user.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { roleUpdateSchema } from "@/lib/validations";

export async function GET(
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
    const data = await getUserById(request.headers, resolvedParams.id);
    if (!data) {
      return NextResponse.json(
        { success: false, data: null, error: t("not_found") },
        { status: 404 },
      );
    }
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function PUT(
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
    const body = await request.json();

    const validatedData = roleUpdateSchema(t).parse({
      userId: resolvedParams.id,
      newRole: body.role,
    });

    const data = await updateUserRole(
      request.headers,
      validatedData.userId,
      validatedData.newRole,
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
    // Cannot delete yourself
    if (auth.session?.user.id === resolvedParams.id) {
      return NextResponse.json(
        { success: false, data: null, error: t("cannot_delete_self") },
        { status: 403 },
      );
    }

    await deleteUser(request.headers, resolvedParams.id);
    return apiSuccess({ message: t("user_deleted") });
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
