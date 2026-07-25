import { Globe, MapPin, FolderTree, Package, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AdminStatsCardsProps {
  stats: AdminDashboardStats;
  t: TranslateFn;
}

const AdminStatsCards = ({ stats, t }: AdminStatsCardsProps) => {
  const cards = [
    {
      title: t("stats.countries"),
      value: stats.countries,
      icon: Globe,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: t("stats.regions"),
      value: stats.regions,
      icon: MapPin,
      color: "text-indigo-500 bg-indigo-500/10",
    },
    {
      title: t("stats.categories"),
      value: stats.categories,
      icon: FolderTree,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      title: t("stats.guidelines"),
      value: stats.guidelines,
      icon: Package,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      title: t("stats.users"),
      value: stats.users,
      icon: Users,
      color: "text-amber-500 bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className="border-border bg-card relative overflow-hidden rounded-2xl p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-caption text-on-surface-variant/80 font-medium">
                  {card.title}
                </span>
                <span className="font-heading text-on-surface mt-2 text-3xl font-bold">
                  {card.value}
                </span>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminStatsCards;
