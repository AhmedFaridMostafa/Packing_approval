import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProviders";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: "Packing Guide/ %s",
    default: "Packing Approval System",
  },
  description: "...",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const LocaleLayout = async ({ params, children }: LocaleLayoutProps) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning={true}
    >
      <body
        className={`${isRTL ? cairo.className : roboto.className} bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default LocaleLayout;
