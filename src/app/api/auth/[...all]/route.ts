import { auth } from "@/lib/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

import arcjet, {
  BotOptions,
  detectBot,
  EmailOptions,
  protectSignup,
  shield,
  slidingWindow,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next";
import { findIp } from "@arcjet/ip";
import { ROUTES } from "@/constants/routes";
import { getTranslations } from "next-intl/server";

const aj = arcjet({
  key: process.env.ARCJET_API_KEY!,
  characteristics: ["userIdOrIp"],
  rules: [shield({ mode: "LIVE" })],
});

const botSettings = {
  mode: "LIVE",
  allow: ["STRIPE_WEBHOOK"],
} satisfies BotOptions;

const restrictiveRateLimitSettings = {
  mode: "LIVE",
  max: 10,
  interval: "10m",
} satisfies SlidingWindowRateLimitOptions<[]>;
const laxRateLimitSettings = {
  mode: "LIVE",
  max: 60,
  interval: "1m",
} satisfies SlidingWindowRateLimitOptions<[]>;

const emailSettings = {
  mode: "LIVE",
  deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions;

const authHandlers = toNextJsHandler(auth);

export const { GET } = authHandlers;

export async function POST(request: Request) {
  try {
    const clonedRequest = request.clone();
    const decision = await checkArcjet(request);
    if (decision.isDenied()) {
      const t = await getTranslations("Auth.Arcjet");
      if (decision.reason.isRateLimit()) {
        return new Response(t("rate_limit"), { status: 429 });
      } else if (decision.reason.isEmail()) {
        let message: string;
        if (decision.reason.emailTypes.includes("INVALID")) {
          message = t("email_invalid");
        } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
          message = t("email_disposable");
        } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
          message = t("email_no_mx");
        } else {
          message = t("email_generic");
        }
        return Response.json({ message }, { status: 400 });
      } else {
        return new Response(t("access_denied"), { status: 403 });
      }
    }
    const authResponse = await authHandlers.POST(clonedRequest);
    if (!authResponse.ok) {
      console.error("AUTH RESPONSE NOT OK:", authResponse.status);
      const text = await authResponse.clone().text();
      console.error("AUTH RESPONSE BODY:", text);
    }
    return authResponse;
  } catch (error) {
    console.error("DEBUG ERROR:", error);
    return new Response(
      JSON.stringify({
        error: error?.toString(),
        stack: (error as Error)?.stack,
      }),
      { status: 500 },
    );
  }
}

async function checkArcjet(request: Request) {
  const body = (await request.json()) as unknown;
  const session = await auth.api.getSession({ headers: request.headers });
  const userIdOrIp = (session?.user.id ?? findIp(request)) || "127.0.0.1";

  if (request.url.includes(ROUTES.SIGN_UP)) {
    if (
      body &&
      typeof body === "object" &&
      "email" in body &&
      typeof body.email === "string"
    ) {
      return aj
        .withRule(
          protectSignup({
            email: emailSettings,
            bots: botSettings,
            rateLimit: restrictiveRateLimitSettings,
          }),
        )
        .protect(request, { email: body.email, userIdOrIp });
    } else {
      return aj
        .withRule(detectBot(botSettings))
        .withRule(slidingWindow(restrictiveRateLimitSettings))
        .protect(request, { userIdOrIp });
    }
  }

  return aj
    .withRule(detectBot(botSettings))
    .withRule(slidingWindow(laxRateLimitSettings))
    .protect(request, { userIdOrIp });
}
