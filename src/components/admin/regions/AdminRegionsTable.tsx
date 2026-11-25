import { Card } from "@/components/ui/card";
import type { _Translator } from "next-intl";
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
  t: _Translator;

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
                {t("table.columns.region")}
              </TableHead>

              <TableHead>{t("table.columns.country")}</TableHead>

              <TableHead>{t("table.columns.account")}</TableHead>

              <TableHead>{t("table.columns.labels")}</TableHead>

              <TableHead className="text-center">
                {t("table.columns.guidelinesCount")}
              </TableHead>

              <TableHead className="text-end">
                {t("table.columns.actions")}
              </TableHead>
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
                  confirmTitle: t("dialogs.delete.title"),
                  confirmDescription: t("dialogs.delete.description", {
                    name: isRTL ? region.label_name_ar : region.label_name_en,
                  }),
                  success: t("toasts.deleteSuccess"),
                  error: t("toasts.deleteError"),
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
