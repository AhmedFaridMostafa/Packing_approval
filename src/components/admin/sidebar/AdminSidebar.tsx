import { Sidebar } from "@/components/ui/sidebar";

import SidebarBrand from "./SidebarBrand";
import SidebarNavigation from "./SidebarNavigation";
import SidebarFooter from "./SidebarFooter";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  title: string;
  homeTitle: string;
  signOut: string;
  isRtl: boolean;
}
const AdminSidebar = ({
  title,
  homeTitle,
  signOut,
  isRtl,
}: AdminSidebarProps) => {
  return (
    <Sidebar
      side={isRtl ? "right" : "left"}
      className={cn(
        "bg-surface-container-lowest border-y-0",
        isRtl ? "border-r-0 border-l" : "border-r border-l-0",
      )}
    >
      <SidebarBrand title={title} />
      <SidebarNavigation />
      <SidebarFooter homeTitle={homeTitle} signOut={signOut} />
    </Sidebar>
  );
};

export default AdminSidebar;
