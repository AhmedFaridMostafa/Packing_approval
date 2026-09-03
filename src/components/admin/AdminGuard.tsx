import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

import SidebarAdmin from "@/components/admin/sidebar";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { ROUTES } from "@/constants/routes";

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard = async ({ children }: AdminGuardProps) => {
  const [requestHeaders, locale] = await Promise.all([
    headers(),
    getLocale(),
  ]);
  const { authorized } = await checkApiAdmin(requestHeaders);
  if (!authorized) redirect({ href: ROUTES.HOME, locale });
  return <SidebarAdmin>{children}</SidebarAdmin>;
};

export default AdminGuard;
