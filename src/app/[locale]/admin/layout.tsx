import { Suspense } from "react";

import AdminGuard from "@/components/admin/AdminGuard";
import AdminShellSkeleton from "@/components/admin/AdminShellSkeleton";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => (
  <Suspense fallback={<AdminShellSkeleton />}>
    <AdminGuard>{children}</AdminGuard>
  </Suspense>
);

export default AdminLayout;
