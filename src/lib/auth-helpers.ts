import { auth } from "@/lib/auth/auth";

type BetterAuthSession = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>;

// `user.role` is normalized to the global Role alias ("admin" | "user") —
// never null/undefined like better-auth's raw UserWithRole.
export type ApiAuthSession = Omit<BetterAuthSession, "user"> & {
  user: Omit<BetterAuthSession["user"], "role"> & {
    role: Role;
  };
};

export const getApiAuthSession = (headers: Headers) => {
  return auth.api.getSession({ headers });
};

const normalizeSession = (session: BetterAuthSession): ApiAuthSession => ({
  ...session,
  user: {
    ...session.user,
    role: session.user.role === "admin" ? "admin" : "user",
  },
});

export const checkApiAuth = async (
  headers: Headers,
): Promise<
  | { authorized: false; session: null }
  | { authorized: true; session: ApiAuthSession }
> => {
  const session = await getApiAuthSession(headers);
  if (!session?.user) return { authorized: false, session: null };
  return { authorized: true, session: normalizeSession(session) };
};

export const checkApiAdmin = async (headers: Headers) => {
  const authCheck = await checkApiAuth(headers);
  if (!authCheck.authorized) return { authorized: false, session: null };
  if (authCheck.session.user.role !== "admin")
    return { authorized: false, session: authCheck.session };
  return { authorized: true, session: authCheck.session };
};
