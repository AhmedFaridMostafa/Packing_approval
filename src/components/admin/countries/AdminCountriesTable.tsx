import { Card } from "@/components/ui/card";
import type { _Translator } from "next-intl";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CountryRow from "./CountryRow";

interface AdminCountriesTableProps {
  countries: FeaturedCountry[];
  t: _Translator;

  isRTL: boolean;
}

const AdminCountriesTable = ({
  countries,
  t,
  isRTL,
}: AdminCountriesTableProps) => {
  return (
    <Card className="border-border bg-card overflow-hidden rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow className="border-border">
              <TableHead className="w-75 font-bold">
                {t("table.columns.country")}
              </TableHead>

              <TableHead>{t("table.columns.slug")}</TableHead>

              <TableHead className="text-center">
                {t("table.columns.regionsCount")}
              </TableHead>

              <TableHead className="text-center">
                {t("table.columns.guidelinesCount")}
              </TableHead>

              <TableHead className="text-end">
                {t("table.columns.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {countries.map((country) => (
              <CountryRow
                key={country.id}
                country={country}
                isRTL={isRTL}
                labels={{
                  view: t("actions.view"),
                  edit: t("actions.edit"),
                  delete: t("actions.delete"),
                  cancel: t("actions.cancel"),
                  confirmTitle: t("dialogs.delete.title"),
                  confirmDescription: t("dialogs.delete.description", {
                    name: isRTL ? country.name_ar : country.name_en,
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
export default AdminCountriesTable;
