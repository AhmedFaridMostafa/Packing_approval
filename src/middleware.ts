import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/server/middleware";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { i18n, LanguageType } from "./i18n.config";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  const cookieLocale = request.cookies.get(
    process.env.LANG_COOKIE_NAME!,
  )?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as LanguageType)) {
    return cookieLocale;
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: LanguageType[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  let locale = "";

  try {
    locale = matchLocale(languages, locales, i18n.defaultLocale);
  } catch {
    locale = i18n.defaultLocale;
  }
  return locale;
}

export default async function middleware(request: NextRequest) {
  await updateSession(request);
  // update user's auth session
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (lang) => !pathname.startsWith(`/${lang}`),
  );
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const lang = getLocale(request);
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
