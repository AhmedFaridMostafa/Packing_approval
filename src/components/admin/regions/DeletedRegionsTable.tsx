import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DeletedRegionRow from "./DeletedRegionRow";

interface DeletedRegionsTableProps {
  regions: DeletedRegion[];
  t: TranslateFn;
  isRTL: boolean;
}

const DeletedRegionsTable = ({
  regions,
  t,
  isRTL,
}: DeletedRegionsTableProps) => {
  return (
    <Card className="border-border bg-card overflow-hidden rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow className="border-border">
              <TableHead className="w-60 font-bold">
                {t("table.region")}
              </TableHead>

              <TableHead>{t("table.country")}</TableHead>

              <TableHead>{t("table.account")}</TableHead>

              <TableHead>{t("table.labels")}</TableHead>

              <TableHead className="text-center">
                {t("table.guidelines_count")}
              </TableHead>

              <TableHead className="text-center">
                {t("table.deleted_at")}
              </TableHead>

              <TableHead className="text-end">{t("table.actions")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {regions.map((region) => (
              <DeletedRegionRow
                key={region.id}
                region={region}
                isRTL={isRTL}
                labels={{
                  restore: t("actions.restore"),
                  success: t("actions.restore_success"),
                  error: t("actions.restore_error"),
                }}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default DeletedRegionsTable;
