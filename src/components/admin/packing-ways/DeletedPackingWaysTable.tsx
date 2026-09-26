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
    success: t("actions.restore_success"),
    error: t("actions.restore_error"),
  };
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.packing_way")}</TableHead>
              <TableHead>{t("table.category")}</TableHead>
              <TableHead>{t("table.country")}</TableHead>
              <TableHead>{t("table.deleted")}</TableHead>
              <TableHead className="text-end">{t("table.actions")}</TableHead>
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
