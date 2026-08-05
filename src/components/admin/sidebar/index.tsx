import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { adminNavigation } from "./config";
import { getLocale, getTranslations } from "next-intl/server";

interface SidebarAdminProps {
  children: React.ReactNode;
}

const SidebarAdmin = async ({ children }: SidebarAdminProps) => {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("AdminLayout"),
  ]);
  const isRtl = locale === "ar";

  const navigationLabels = adminNavigation.reduce<Record<string, string>>(
    (acc, item) => {
      acc[item.key] = t(item.key);
      return acc;
    },
    {},
  );

  return (
    <SidebarProvider>
      <AdminSidebar
        isRtl={isRtl}
        title={t("title")}
        homeTitle={t("home")}
        signOut={t("signOut")}
        navigationLabels={navigationLabels}
      />
      <SidebarInset className="bg-surface-container-lowest min-h-screen">
        <AdminHeader title={t("title")} />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarAdmin;
