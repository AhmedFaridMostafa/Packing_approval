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
    delete_title: t("actions.delete_title"),
    delete_description: t("actions.delete_description"),
    delete_success: t("actions.delete_success"),
    delete_error: t("actions.delete_error"),
    unknown: t("unknown"),
  };
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow>
              <TableHead>{t("table.packing_way")}</TableHead>
              <TableHead>{t("table.category")}</TableHead>
              <TableHead>{t("table.region")}</TableHead>
              <TableHead>{t("table.country")}</TableHead>
              <TableHead>{t("table.updated")}</TableHead>
              <TableHead className="text-end">{t("table.actions")}</TableHead>
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
