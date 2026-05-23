import { auth } from "@/lib/auth/auth";

export const getApiAuthSession = async (headers: Headers) => {
  return await auth.api.getSession({ headers });
};

export const checkApiAuth = async (headers: Headers) => {
  const session = await getApiAuthSession(headers);
  if (!session?.user) return { authorized: false, session: null };
  return { authorized: true, session };
};

export const checkApiAdmin = async (headers: Headers) => {
  const authCheck = await checkApiAuth(headers);
  if (!authCheck.authorized) return { authorized: false, session: null };
  if (authCheck?.session?.user.role !== "admin")
    return { authorized: false, session: authCheck.session };
  return { authorized: true, session: authCheck.session };
};
