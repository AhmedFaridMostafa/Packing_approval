import { headers } from "next/headers";
import { getLocale, getTranslations } from "next-intl/server";
import AdminStatsCards from "@/components/admin/AdminStatsCards";
import AdminQuickActions from "@/components/admin/AdminQuickActions";
import RecentHistoryList from "@/components/admin/RecentHistoryList";
import { api } from "@/lib/api";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { redirect } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import ErrorState from "@/components/shared/ErrorState";

export async function generateMetadata() {
  const t = await getTranslations("AdminDashboard.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const AdminDashboardPage = async () => {
  const [requestHeaders, t, locale] = await Promise.all([
    headers(),
    getTranslations("AdminDashboard"),
    getLocale(),
  ]);

  const [{ authorized, session }, dashboardData] = await Promise.all([
    checkApiAdmin(requestHeaders),
    api.admin.getDashboardData(requestHeaders),
  ]);

  if (!authorized) redirect({ href: ROUTES.HOME, locale });

  if (!dashboardData.success)
    return (
      <ErrorState
        layout="page"
        message={dashboardData.error.message}
        status={dashboardData.status}
      />
    );

  const isRTL = locale === "ar";
  const userName = session?.user?.name || "Admin";

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner */}
      <div className="bg-primary/5 border-primary/20 rounded-2xl border p-6 sm:p-8">
        <h1 className="font-heading text-on-surface text-2xl font-bold sm:text-3xl">
          {t("welcome", { name: userName })}
        </h1>
        <p className="text-body-base text-on-surface-variant mt-2 max-w-2xl">
          {t("subtitle")}
        </p>
      </div>

      {/* Admin Stats Cards */}
      <AdminStatsCards stats={dashboardData.data.stats} t={t} />

      {/* Quick Actions Bar */}
      <AdminQuickActions t={t} />

      {/* Recent Audit History Log */}
      <RecentHistoryList
        history={dashboardData.data.recentHistory}
        t={t}
        isRTL={isRTL}
      />
    </div>
  );
};
export default AdminDashboardPage;
