// lib
import { betterAuth, APIError } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { i18n, locales } from "@better-auth/i18n";
import { admin as adminPlugin } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";
import { routing, type Locale } from "@/i18n/routing";
import { USER_REMOVED_MARKER } from "@/constants";
import { ac, admin, user } from "./permissions";
// DB
import { db } from "@/drizzle/db";
import * as schema from "@/drizzle/schema";
// Emails
import EmailService from "@/emails/emailService";
import { render } from "react-email";
import VerificationEmail, {
  VerificationEmailSubject,
} from "@/emails/components/VerificationEmail";

import ResetPasswordEmail, {
  ResetPasswordEmailSubject,
} from "@/emails/components/ResetPasswordEmail";

// Utils
import { getLocaleFromRequest } from "../getLocaleFromRequest";

// Errors thrown from hooks.before never reach the i18n plugin's after-hook,
// so the frozen-account error is localized here, by hand.
const REMOVED_USER_MESSAGES: Record<Locale, string> = {
  en: "This user has been removed and can no longer be modified.",
  ar: "تمت إزالة هذا المستخدم ولا يمكن تعديله.",
};

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }, request) => {
      const locale = getLocaleFromRequest(request);
      try {
        const html = await render(ResetPasswordEmail({ user, url, locale }));
        await EmailService({
          to: user.email,
          subject: ResetPasswordEmailSubject[locale],
          html,
        });
      } catch (error) {
        console.error("error", error);
      }
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }, request) => {
      const locale = getLocaleFromRequest(request);
      try {
        const html = await render(VerificationEmail({ user, url, locale }));
        await EmailService({
          to: user.email,
          subject: VerificationEmailSubject[locale],
          html,
        });
      } catch (error) {
        console.error("error", error);
      }
    },
  },
  session: { cookieCache: { enabled: true, maxAge: 60 } },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Removed accounts are frozen. This runs on EVERY endpoint (including
      // server-side auth.api.* calls), so return early on non-matching paths.
      const frozenPaths = [
        "/admin/ban-user",
        "/admin/unban-user",
        "/admin/update-user",
      ];
      if (!frozenPaths.includes(ctx.path)) return;

      const userId = ctx.body?.userId as string | undefined;
      if (!userId) return;

      const target = await ctx.context.internalAdapter.findUserById(userId);
      const banReason = (target as { banReason?: string | null } | null)
        ?.banReason;

      // Missing user or not removed: let the endpoint handle it.
      if (banReason !== USER_REMOVED_MARKER) return;

      const locale = getLocaleFromRequest(ctx.request ?? ctx.headers);
      throw new APIError("FORBIDDEN", {
        code: "USER_ACCOUNT_REMOVED",
        message: REMOVED_USER_MESSAGES[locale],
      });
    }),
  },
  plugins: [
    i18n({
      defaultLocale: routing.defaultLocale,
      detection: ["callback", "header"],
      getLocale: (ctx) => getLocaleFromRequest(ctx.request ?? ctx.headers),
      translations: {
        en: locales.en,
        ar: locales.ar,
      },
    }),
    adminPlugin({
      ac,
      defaultRole: "user",
      roles: {
        admin,
        user,
      },
    }),
    nextCookies(),
  ],
  database: drizzleAdapter(db, { provider: "pg", schema, transaction: true }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
