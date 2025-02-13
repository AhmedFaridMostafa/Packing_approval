import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { ThemeProvider } from "@/context/ThemeProviders";
import { SliderProvider } from "@/context/SliderContext";
import { Toaster } from "react-hot-toast";
import { Lang } from "@/i18n.config";

export async function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "en" }];
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
    default: "Packing Guide",
  },
  description: "...",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Lang }>;
}>) {
  const lang = (await params).lang as Lang;
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning={true}
    >
      <body
        className={`${lang === "ar" ? cairo.className : roboto.className} bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white`}
        suppressHydrationWarning={true}
        lang={lang}
      >
        <ThemeProvider>
          <SliderProvider>
            <Header />
            <Sidebar />
            <div className="p-4 sm:ml-64">
              <div className="mt-14 rounded-lg p-4">
                <main className="relative mx-auto mt-4 max-w-4xl rounded-lg bg-gray-50 p-6 shadow-lg dark:bg-gray-800">
                  {children}
                </main>
              </div>
            </div>
          </SliderProvider>
        </ThemeProvider>
        <Toaster
          position="top-center"
          gutter={12}
          containerClassName="m-2"
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 6000,
            },
            className:
              "text-lg max-w-[500px] py-4 px-6 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200",
          }}
        />
      </body>
    </html>
  );
}
