import { Card } from "@/components/ui/card";
import type { _Translator } from "next-intl";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeletedCountryRow from "./DeletedCountryRow";

interface DeletedCountriesTableProps {
  countries: DeletedCountry[];
  t: _Translator;
  isRTL: boolean;
}

const DeletedCountriesTable = ({
  countries,
  t,
  isRTL,
}: DeletedCountriesTableProps) => {
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
                {t("table.columns.deletedAt")}
              </TableHead>

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
              <DeletedCountryRow
                key={country.id}
                country={country}
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

export default DeletedCountriesTable;
