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
