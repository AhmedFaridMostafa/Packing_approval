import { createAdminUser, getUsers } from "@/server/services/user.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { apiAdminCreateUserSchema } from "@/lib/validations";
import { getLocaleFromRequest } from "@/lib/getLocaleFromRequest";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const { searchParams } = new URL(request.url);
    const page = searchParams.has("page")
      ? parseInt(searchParams.get("page")!, 10)
      : 1;
    const q = searchParams.get("q");

    const data = await getUsers(request.headers, {
      page: !isNaN(page) && page > 0 ? page : 1,
      searchQuery: q,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function POST(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const body = await request.json();
    const validated = apiAdminCreateUserSchema(t).parse(body);
    const locale = getLocaleFromRequest(request);
    const data = await createAdminUser(request.headers, locale, {
      name: validated.name,
      email: validated.email,
      password: validated.password,
      role: validated.role,
    });

    return apiSuccess(data, 201);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
