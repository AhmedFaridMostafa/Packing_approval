import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";

import SidebarAdmin from "@/components/admin/sidebar";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { ROUTES } from "@/constants/routes";
import { getLocale } from "next-intl/server";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const [requestHeaders, locale] = await Promise.all([headers(), getLocale()]);
  const { authorized } = await checkApiAdmin(requestHeaders);
  if (!authorized) redirect({ href: ROUTES.HOME, locale });
  return <SidebarAdmin>{children}</SidebarAdmin>;
};
export default AdminLayout;
