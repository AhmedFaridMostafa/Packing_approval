import type { LucideIcon } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface SidebarNavigationItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

const SidebarNavigationItem = ({
  title,
  href,
  icon: Icon,
  isActive,
}: SidebarNavigationItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="hover:bg-primary/10 hover:text-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground font-medium transition-colors"
      >
        <Link href={href} className="flex items-center gap-3">
          <Icon className="h-4 w-4 shrink-0" />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarNavigationItem;
