import { Link } from "@/i18n/navigation";
import { ArrowUpDown, Globe, MapPin, FolderTree, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

interface AdminQuickActionsProps {
  t: TranslateFn;
}

const AdminQuickActions = ({ t }: AdminQuickActionsProps) => {
  const actions = [
    {
      title: t("quickActions.addCountry"),
      href: ROUTES.ADMIN_COUNTRIES_ADD,
      icon: Globe,
    },
    {
      title: t("quickActions.addRegion"),
      href: ROUTES.ADMIN_REGIONS_ADD,
      icon: MapPin,
    },
    {
      title: t("quickActions.addCategory"),
      href: `${ROUTES.ADMIN_CATEGORIES}?action=add`,
      icon: FolderTree,
    },
    {
      title: t("quickActions.addPackingWay"),
      href: ROUTES.ADMIN_PACKING_WAYS_ADD,
      icon: Package,
    },
    {
      title: t("quickActions.reorderCategories"),
      href: `${ROUTES.ADMIN_CATEGORIES}?view=reorder`,
      icon: ArrowUpDown,
    },
  ];

  return (
    <Card className="border-border bg-card rounded-2xl p-6 shadow-sm">
      <h2 className="font-heading text-on-surface mb-4 text-lg font-bold">
        {t("quickActions.title")}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="border-border bg-surface-container-low hover:border-primary/50 hover:bg-primary/5 group flex items-center gap-3 rounded-xl border p-3.5 transition-all duration-200"
            >
              <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-caption text-on-surface group-hover:text-primary font-semibold transition-colors">
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </Card>
  );
};

export default AdminQuickActions;
