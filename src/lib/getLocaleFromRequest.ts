import { Locale, routing } from "@/i18n/routing";

export function getLocaleFromRequest(
  request?: Request | Headers | null,
): Locale {
  const cookie =
    request instanceof Headers
      ? (request.get("cookie") ?? "")
      : (request?.headers?.get("cookie") ?? "");
  const raw = cookie
    .split("; ")
    .find((r) => r.startsWith("NEXT_LOCALE="))
    ?.split("=")[1];

  return routing.locales.includes(raw as Locale)
    ? (raw as Locale)
    : routing.defaultLocale;
}
