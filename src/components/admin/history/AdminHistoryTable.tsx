import type { _Translator } from "next-intl";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HistoryRow from "./HistoryRow";
import type { HistoryRowLabels } from "./HistoryDetailsDialog";

interface AdminHistoryTableProps {
  history: AdminHistoryItem[];
  t: _Translator;
  isRTL: boolean;
}

const AdminHistoryTable = ({ history, t, isRTL }: AdminHistoryTableProps) => {
  const labels: HistoryRowLabels = {
    create: t("actionTypes.create"),
    update: t("actionTypes.update"),
    delete: t("actionTypes.delete"),
    view: t("actions.view"),
    before: t("details.before"),
    after: t("details.after"),
    region: t("table.columns.region"),
    category: t("table.columns.category"),
    changed_by: t("table.columns.changedBy"),
    date: t("table.columns.date"),
    no_description: t("details.noDescription"),
    field_title_en: t("details.field.titleEn"),
    field_title_ar: t("details.field.titleAr"),
    field_description_en: t("details.field.descriptionEn"),
    field_description_ar: t("details.field.descriptionAr"),
    field_image: t("details.field.image"),
  };

  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow>
              <TableHead>{t("table.columns.packingWay")}</TableHead>
              <TableHead>{t("table.columns.action")}</TableHead>
              <TableHead>{t("table.columns.category")}</TableHead>
              <TableHead>{t("table.columns.region")}</TableHead>
              <TableHead>{t("table.columns.country")}</TableHead>
              <TableHead>{t("table.columns.changedBy")}</TableHead>
              <TableHead>{t("table.columns.date")}</TableHead>
              <TableHead className="text-end">{t("table.columns.details")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <HistoryRow
                key={item.id}
                item={item}
                isRTL={isRTL}
                labels={labels}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AdminHistoryTable;
