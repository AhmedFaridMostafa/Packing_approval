import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { redirect } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const requireAuth = async (locale: string) => {
  const session = await getSession();

  if (!session?.user) {
    redirect({ href: ROUTES.SIGN_IN, locale });
  }

  return session;
};

export const requireAdmin = async (locale: string) => {
  const session = await requireAuth(locale);

  if (session?.user.role !== "admin") {
    redirect({ href: ROUTES.HOME, locale });
  }

  return session;
};

export const getApiAuthSession = async (request: Request) => {
  return await auth.api.getSession({ headers: request.headers });
};

export const checkApiAuth = async (request: Request) => {
  const session = await getApiAuthSession(request);
  if (!session?.user) return { authorized: false, session: null };
  return { authorized: true, session };
};

export const checkApiAdmin = async (request: Request) => {
  const authCheck = await checkApiAuth(request);
  if (!authCheck.authorized) return { authorized: false, session: null };
  if (authCheck?.session?.user.role !== "admin")
    return { authorized: false, session: authCheck.session };
  return { authorized: true, session: authCheck.session };
};
