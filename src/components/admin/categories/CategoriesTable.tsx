import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import CategoryRow from "./CategoryRow";

interface CategoriesTableProps {
  categories: CategoryWithCount[];
  labels: {
    nameEn: string;
    nameAr: string;
    sortOrder: string;
    guidelinesCount: string;
    actions: string;
    edit: string;
  };
}

const CategoriesTable = ({ categories, labels }: CategoriesTableProps) => {
  return (
    <Card className="border-border bg-card overflow-hidden rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-on-surface-variant text-caption font-semibold tracking-wider uppercase">
                {labels.nameEn}
              </TableHead>
              <TableHead className="text-on-surface-variant text-caption font-semibold tracking-wider uppercase">
                {labels.nameAr}
              </TableHead>
              <TableHead className="text-on-surface-variant text-caption w-28 text-center font-semibold tracking-wider uppercase">
                {labels.sortOrder}
              </TableHead>
              <TableHead className="text-on-surface-variant text-caption text-center font-semibold tracking-wider uppercase">
                {labels.guidelinesCount}
              </TableHead>
              <TableHead className="text-on-surface-variant text-caption w-20 text-end font-semibold tracking-wider uppercase">
                {labels.actions}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category) => (
              <CategoryRow
                key={`${category.id}-${category.name_en}-${category.name_ar}-${category.sort_order}`}
                category={category}
                labels={{
                  edit: labels.edit,
                }}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default CategoriesTable;
