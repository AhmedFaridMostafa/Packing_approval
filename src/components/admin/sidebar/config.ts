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
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    key: "countries",
    href: "/countries",
    icon: Globe,
  },
  {
    key: "regions",
    href: "/regions",
    icon: MapPin,
  },
  {
    key: "categories",
    href: "/admin/categories/reorder",
    icon: FolderTree,
  },
  {
    key: "packingWays",
    href: "/admin/packing-ways/add",
    icon: Package,
  },
  {
    key: "history",
    href: "/admin/history",
    icon: History,
  },
  {
    key: "users",
    href: "/admin/users",
    icon: Users,
  },
] as const;
