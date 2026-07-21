import "./globals.css";
import type { Metadata } from "next";
import { Sora, DM_Sans, Cairo, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { locale as getLocale } from "next/root-params";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import AppProviders from "@/components/providers/AppProviders";
import { Spinner } from "@/components/ui/spinner";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { template: "Packing Guide/ %s", default: "Packing Approval System" },
  description: "...",
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        className={cn(
          sora.variable,
          dmSans.variable,
          cairo.variable,
          jetbrainsMono.variable,
          "bg-background text-foreground antialiased",
        )}
      >
        <Suspense fallback={<Spinner />}>
          <AppProviders>{children}</AppProviders>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
