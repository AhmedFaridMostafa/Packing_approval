import { Card } from "@/components/ui/card";
import type { _Translator } from "next-intl";
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
  t: _Translator;
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
                {t("table.columns.region")}
              </TableHead>

              <TableHead>{t("table.columns.country")}</TableHead>

              <TableHead>{t("table.columns.account")}</TableHead>

              <TableHead>{t("table.columns.labels")}</TableHead>

              <TableHead className="text-center">
                {t("table.columns.guidelinesCount")}
              </TableHead>

              <TableHead className="text-center">
                {t("table.columns.deletedAt")}
              </TableHead>

              <TableHead className="text-end">
                {t("table.columns.actions")}
              </TableHead>
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
                  success: t("toasts.restoreSuccess"),
                  error: t("toasts.restoreError"),
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
