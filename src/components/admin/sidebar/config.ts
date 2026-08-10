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
    href: ROUTES.ADMIN,
    icon: LayoutDashboard,
    exact: true,
  },
  {
    key: "countries",
    href: ROUTES.ADMIN_COUNTRIES,
    icon: Globe,
  },
  {
    key: "regions",
    href: ROUTES.ADMIN_REGIONS,
    icon: MapPin,
  },
  {
    key: "categories",
    href: ROUTES.ADMIN_CATEGORIES_REORDER,
    icon: FolderTree,
  },
  {
    key: "packingWays",
    href: ROUTES.ADMIN_PACKING_WAYS_ADD,
    icon: Package,
  },
  {
    key: "history",
    href: ROUTES.ADMIN_HISTORY,
    icon: History,
  },
  {
    key: "users",
    href: ROUTES.ADMIN_USERS,
    icon: Users,
  },
] as const;
