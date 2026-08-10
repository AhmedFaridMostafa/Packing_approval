"use client";

import { ExternalLink } from "lucide-react";

import { Link } from "@/i18n/navigation";
import Logout from "@/components/shared/Logout";

import {
  SidebarFooter as UISidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/routes";

interface SidebarFooterProps {
  homeTitle: string;
  signOut: string;
}
const SidebarFooter = ({ homeTitle, signOut }: SidebarFooterProps) => {
  return (
    <UISidebarFooter className="border-t-border border-t p-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href={ROUTES.HOME}
              className="hover:bg-accent flex items-center gap-2 font-medium"
            >
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
