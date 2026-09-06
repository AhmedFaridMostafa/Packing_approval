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
                {t("table.country")}
              </TableHead>

              <TableHead>{t("table.slug")}</TableHead>

              <TableHead className="text-center">
                {t("table.regions_count")}
              </TableHead>

              <TableHead className="text-center">
                {t("table.guidelines_count")}
              </TableHead>

              <TableHead className="text-end">{t("table.actions")}</TableHead>
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
                  confirmTitle: t("actions.delete_confirm_title"),
                  confirmDescription: t("actions.delete_confirm_desc", {
                    name: isRTL ? country.name_ar : country.name_en,
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
export default AdminCountriesTable;
