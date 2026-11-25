import type { _Translator } from "next-intl";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PackingWayRow from "./PackingWayRow";

interface AdminPackingWaysTableProps {
  packingWays: AdminPackingWayItem[];
  t: _Translator;
  isRTL: boolean;
}

const AdminPackingWaysTable = ({
  packingWays,
  t,
  isRTL,
}: AdminPackingWaysTableProps) => {
  const labels = {
    view: t("actions.view"),
    edit: t("actions.edit"),
    delete: t("actions.delete"),
    cancel: t("actions.cancel"),
    delete_title: t("dialogs.delete.title"),
    delete_description: t("dialogs.delete.description"),
    delete_success: t("toasts.deleteSuccess"),
    delete_error: t("toasts.deleteError"),
    unknown: t("unknown"),
  };
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow>
              <TableHead>{t("table.columns.packingWay")}</TableHead>
              <TableHead>{t("table.columns.category")}</TableHead>
              <TableHead>{t("table.columns.region")}</TableHead>
              <TableHead>{t("table.columns.country")}</TableHead>
              <TableHead>{t("table.columns.updatedAt")}</TableHead>
              <TableHead className="text-end">{t("table.columns.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packingWays.map((item) => (
              <PackingWayRow
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

export default AdminPackingWaysTable;
