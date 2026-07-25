import { ExternalLink } from "lucide-react";

import { Link } from "@/i18n/navigation";
import Logout from "@/components/shared/Logout";

import {
  SidebarFooter as UISidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface SidebarFooterProps {
  homeTitle: string;
  signOut: string;
}
const SidebarFooter = ({ homeTitle, signOut }: SidebarFooterProps) => {
  return (
    <UISidebarFooter className="border-t-border border-t p-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="hover:bg-accent font-medium">
            <Link href="/" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <span>{homeTitle}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <div className="px-2 py-1">
            <Logout signOut={signOut} />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </UISidebarFooter>
  );
};
export default SidebarFooter;
