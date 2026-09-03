// lib
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { i18n } from "@better-auth/i18n";
import { admin as adminPlugin } from "better-auth/plugins";
import { routing } from "@/i18n/routing";
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

// Error Messages
const arAuthError = {
  INVALID_EMAIL_OR_PASSWORD: "البريد الإلكتروني أو كلمة المرور غير صالحة",
  USER_NOT_FOUND: "المستخدم غير موجود",
  USER_ALREADY_EXISTS: "هذا الحساب موجود بالفعل",
  INVALID_EMAIL: "البريد الإلكتروني غير صالح",
  INVALID_PASSWORD: "كلمة المرور غير صحيحة",
  PASSWORD_TOO_SHORT: "كلمة المرور قصيرة جداً",
  EMAIL_NOT_VERIFIED: "يرجى التحقق من بريدك الإلكتروني أولاً",
  SESSION_EXPIRED: "انتهت الجلسة، يرجى تسجيل الدخول مجدداً",
  UNAUTHORIZED: "غير مصرح لك بالقيام بهذا الإجراء",
  INVALID_CODE: "الرمز المدخل غير صحيح",
  EXPIRED_CODE: "انتهت صلاحية هذا الرمز",
  TOO_MANY_REQUESTS: "محاولات كثيرة جداً، يرجى الانتظار قليلاً",
  INTERNAL_SERVER_ERROR: "حدث خطأ في النظام، يرجى المحاولة لاحقاً",
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
  plugins: [
    i18n({
      defaultLocale: routing.defaultLocale,
      detection: ["callback", "header"],
      getLocale: (ctx) => getLocaleFromRequest(ctx.request),
      translations: {
        ar: arAuthError,
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
