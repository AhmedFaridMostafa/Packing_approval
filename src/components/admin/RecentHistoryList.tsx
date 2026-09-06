import { Link } from "@/i18n/navigation";
import type { _Translator } from "next-intl";
import { ArrowRight, History, User, Calendar, MapPin, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface RecentHistoryListProps {
  history: RecentHistoryItem[];
  t: _Translator;
  isRTL: boolean;
}

const RecentHistoryList = ({ history, t, isRTL }: RecentHistoryListProps) => {
  const getActionBadge = (action: RecentHistoryItem["action"]) => {
    switch (action) {
      case "CREATE":
        return (
          <Badge className="border-emerald-500/20 bg-emerald-500/10 font-semibold text-emerald-600">
            {t("recentHistory.action.CREATE")}
          </Badge>
        );
      case "UPDATE":
        return (
          <Badge className="border-blue-500/20 bg-blue-500/10 font-semibold text-blue-600">
            {t("recentHistory.action.UPDATE")}
          </Badge>
        );
      case "DELETE":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 font-semibold">
            {t("recentHistory.action.DELETE")}
          </Badge>
        );
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  return (
    <Card className="border-border bg-card rounded-2xl p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-on-surface text-lg font-bold">
            {t("recentHistory.title")}
          </h2>
          <p className="text-caption text-on-surface-variant">
            {t("recentHistory.subtitle")}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="self-start sm:self-auto"
        >
          <Link
            href="/admin/history"
            className="inline-flex items-center gap-1.5 font-semibold"
          >
            <span>{t("recentHistory.viewAll")}</span>
            <ArrowRight className="rtl-flip h-4 w-4" />
          </Link>
        </Button>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-accent text-primary mb-3 flex h-14 w-14 items-center justify-center rounded-full">
            <History className="h-6 w-6" />
          </div>
          <p className="text-caption text-on-surface-variant font-medium">
            {t("recentHistory.empty")}
          </p>
        </div>
      ) : (
        <div className="divide-border/60 flex flex-col divide-y">
          {history.map((item) => {
            const countryName = isRTL
              ? item.country_name_ar
              : item.country_name_en;
            const regionName = isRTL
              ? item.region_name_ar
              : item.region_name_en;
            const categoryName = isRTL
              ? item.category_name_ar
              : item.category_name_en;
            const title = isRTL ? item.title_ar : item.title_en;

            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    {getActionBadge(item.action)}
                    <span className="font-heading text-on-surface font-semibold">
                      {title || categoryName}
                    </span>
                  </div>
                  <div className="text-caption text-on-surface-variant flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="text-primary h-3.5 w-3.5" />
                      {countryName} • {regionName}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      {categoryName}
                    </span>
                  </div>
                </div>

                <div className="text-caption text-on-surface-variant/80 flex flex-col items-start gap-1 sm:items-end">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <User className="text-primary h-3.5 w-3.5" />
                    {item.changed_by_name} ({item.changed_by_email})
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" />
                    {formatDate(item.change_timestamp, isRTL)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
export default RecentHistoryList;
