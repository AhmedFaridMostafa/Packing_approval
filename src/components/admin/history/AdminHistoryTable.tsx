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
    create: t("actions.CREATE"),
    update: t("actions.UPDATE"),
    delete: t("actions.DELETE"),
    view: t("actions.view"),
    before: t("details.before"),
    after: t("details.after"),
    region: t("table.region"),
    category: t("table.category"),
    changed_by: t("table.changed_by"),
    date: t("table.date"),
    no_description: t("details.no_description"),
    field_title_en: t("details.field.title_en"),
    field_title_ar: t("details.field.title_ar"),
    field_description_en: t("details.field.description_en"),
    field_description_ar: t("details.field.description_ar"),
    field_image: t("details.field.image"),
  };

  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow>
              <TableHead>{t("table.packing_way")}</TableHead>
              <TableHead>{t("table.action")}</TableHead>
              <TableHead>{t("table.category")}</TableHead>
              <TableHead>{t("table.region")}</TableHead>
              <TableHead>{t("table.country")}</TableHead>
              <TableHead>{t("table.changed_by")}</TableHead>
              <TableHead>{t("table.date")}</TableHead>
              <TableHead className="text-end">{t("table.details")}</TableHead>
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
