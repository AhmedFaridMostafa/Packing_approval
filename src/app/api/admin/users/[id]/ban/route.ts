import {
  banUser,
  getUserById,
  unbanUser,
} from "@/server/services/user.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiNotFound,
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { apiBanUserSchema } from "@/lib/validations";
import { ApiError } from "@/lib/errors";
import { USER_REMOVED_MARKER } from "@/constants";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const resolvedParams = await params;

    if (auth.session?.user.id === resolvedParams.id)
      throw new ApiError(403, t("cannot_ban_self"));

    const target = await getUserById(request.headers, resolvedParams.id);
    if (!target) return apiNotFound(t);

    if (target.banReason === USER_REMOVED_MARKER)
      throw new ApiError(403, t("user_already_removed"));

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
    if (!auth.authorized) return apiUnauthorized(t);

    const resolvedParams = await params;

    if (auth.session?.user.id === resolvedParams.id)
      throw new ApiError(403, t("cannot_unban_self"));

    const target = await getUserById(request.headers, resolvedParams.id);
    if (!target) return apiNotFound(t);

    if (target.banReason === USER_REMOVED_MARKER)
      throw new ApiError(403, t("cannot_unban_removed"));

    const data = await unbanUser(request.headers, resolvedParams.id);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
