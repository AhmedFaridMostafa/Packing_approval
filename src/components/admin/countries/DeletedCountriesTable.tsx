import { Card } from "@/components/ui/card";
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
  t: TranslateFn;
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
                {t("table.country")}
              </TableHead>

              <TableHead>{t("table.slug")}</TableHead>

              <TableHead className="text-center">
                {t("table.deleted_at")}
              </TableHead>

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
              <DeletedCountryRow
                key={country.id}
                country={country}
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

export default DeletedCountriesTable;
