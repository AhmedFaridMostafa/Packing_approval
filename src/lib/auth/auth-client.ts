import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";
import { ac, admin, user } from "./permissions";
import type { auth } from "@/lib/auth/auth";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({
      ac,
      defaultRole: "user",
      roles: {
        admin,
        user,
      },
    }),
  ],
  baseURL: process.env.NEXT_PUBLIC_SITE_URL!,
});

export const {
  signIn,
  signUp,
  useSession,
  getSession,
  sendVerificationEmail,
  requestPasswordReset,
  resetPassword,
} = authClient;
