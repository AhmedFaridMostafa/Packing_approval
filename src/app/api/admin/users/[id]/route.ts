import {
  getUserById,
  updateUserRole,
  removeUser,
} from "@/server/services/user.service";
import { USER_REMOVED_MARKER } from "@/constants";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiNotFound,
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { roleUpdateSchema } from "@/lib/validations";
import { ApiError } from "@/lib/errors";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const resolvedParams = await params;
    if (auth.session?.user.id === resolvedParams.id)
      throw new ApiError(403, t("cannot_change_own_role"));

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
    if (!auth.authorized) return apiUnauthorized(t);

    const resolvedParams = await params;
    if (auth.session?.user.id === resolvedParams.id)
      throw new ApiError(403, t("cannot_remove_self"));

    const target = await getUserById(request.headers, resolvedParams.id);
    if (!target) return apiNotFound(t);

    if (target.banReason === USER_REMOVED_MARKER)
      return apiSuccess({ message: t("user_removed") });

    await removeUser(request.headers, resolvedParams.id);
    return apiSuccess({ message: t("user_removed") });
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
