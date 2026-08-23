import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import RegionRow from "./RegionRow";

interface AdminRegionsTableProps {
  regions: RegionWithCountryAndCount[];
  t: TranslateFn;

  isRTL: boolean;
}

const AdminRegionsTable = ({
  regions,
  t,
  isRTL,
}: AdminRegionsTableProps) => {
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

              <TableHead className="text-end">{t("table.actions")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {regions.map((region) => (
              <RegionRow
                key={region.id}
                region={region}
                isRTL={isRTL}
                labels={{
                  view: t("actions.view"),
                  edit: t("actions.edit"),
                  delete: t("actions.delete"),
                  cancel: t("actions.cancel"),
                  confirmTitle: t("actions.delete_confirm_title"),
                  confirmDescription: t("actions.delete_confirm_desc", {
                    name: isRTL ? region.label_name_ar : region.label_name_en,
                  }),
                  success: t("actions.delete_success"),
                  error: t("actions.delete_error"),
                }}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
export default AdminRegionsTable;
