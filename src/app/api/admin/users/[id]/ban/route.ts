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
  const [t, tApi] = await Promise.all([
    getTranslations("validation"),
    getTranslations("api.errors"),
  ]);
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(tApi);

    const resolvedParams = await params;

    if (auth.session?.user.id === resolvedParams.id)
      throw new ApiError(403, tApi("cannotBanSelf"));

    const target = await getUserById(request.headers, resolvedParams.id);
    if (!target) return apiNotFound(tApi);

    if (target.banReason === USER_REMOVED_MARKER)
      throw new ApiError(403, tApi("userAlreadyRemoved"));

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
    return handleApiError(error, tApi);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getTranslations("api.errors");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const resolvedParams = await params;

    if (auth.session?.user.id === resolvedParams.id)
      throw new ApiError(403, t("cannotUnbanSelf"));

    const target = await getUserById(request.headers, resolvedParams.id);
    if (!target) return apiNotFound(t);

    if (target.banReason === USER_REMOVED_MARKER)
      throw new ApiError(403, t("cannotUnbanRemoved"));

    const data = await unbanUser(request.headers, resolvedParams.id);
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
