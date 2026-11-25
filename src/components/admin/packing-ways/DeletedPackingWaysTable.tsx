import type { _Translator } from "next-intl";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeletedPackingWayRow from "./DeletedPackingWayRow";

const DeletedPackingWaysTable = ({
  packingWays,
  t,
  isRTL,
}: {
  packingWays: DeletedPackingWayItem[];
  t: _Translator;
  isRTL: boolean;
}) => {
  const labels = {
    restore: t("actions.restore"),
    success: t("toasts.restoreSuccess"),
    error: t("toasts.restoreError"),
  };
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.columns.packingWay")}</TableHead>
              <TableHead>{t("table.columns.category")}</TableHead>
              <TableHead>{t("table.columns.country")}</TableHead>
              <TableHead>{t("table.columns.deletedAt")}</TableHead>
              <TableHead className="text-end">{t("table.columns.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packingWays.map((item) => (
              <DeletedPackingWayRow
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
export default DeletedPackingWaysTable;
