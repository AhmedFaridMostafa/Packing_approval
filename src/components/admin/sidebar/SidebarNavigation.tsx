"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { adminNavigation } from "./config";
import SidebarNavigationItem from "./SidebarNavigationItem";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

const SidebarNavigation = () => {
  const t = useTranslations("AdminLayout");
  const pathname = usePathname();

  return (
    <SidebarContent className="px-2 py-4">
      <SidebarGroup>
        <SidebarGroupLabel className="text-caption text-on-surface-variant/70 font-bold tracking-wider uppercase">
          Navigation
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            {adminNavigation.map((item) => {
              const exact = "exact" in item ? item.exact : false;
              const isActive = exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <SidebarNavigationItem
                  key={item.href}
                  title={t(item.key)}
                  href={item.href}
                  icon={item.icon}
                  isActive={isActive}
                />
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
export default SidebarNavigation;
