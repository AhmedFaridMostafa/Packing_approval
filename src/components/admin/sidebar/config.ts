import { ROUTES } from "@/constants/routes";
import {
  LayoutDashboard,
  Globe,
  MapPin,
  FolderTree,
  Package,
  History,
  Users,
} from "lucide-react";

export const adminNavigation = [
  {
    key: "dashboard",
    href: ROUTES.ADMIN_PANEL,
    icon: LayoutDashboard,
    exact: true,
  },
  {
    key: "countries",
    href: ROUTES.ADMIN_PANEL_COUNTRIES,
    icon: Globe,
  },
  {
    key: "regions",
    href: ROUTES.ADMIN_PANEL_REGIONS,
    icon: MapPin,
  },
  {
    key: "categories",
    href: ROUTES.ADMIN_PANEL_CATEGORIES_REORDER,
    icon: FolderTree,
  },
  {
    key: "packingWays",
    href: ROUTES.ADMIN_PANEL_PACKING_WAYS_ADD,
    icon: Package,
  },
  {
    key: "history",
    href: ROUTES.ADMIN_PANEL_History,
    icon: History,
  },
  {
    key: "users",
    href: ROUTES.ADMIN_PANEL_Users,
    icon: Users,
  },
] as const;
