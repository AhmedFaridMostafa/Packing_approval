import { Pencil } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

interface CategoryRowProps {
  category: CategoryWithCount;

  labels: {
    edit: string;
  };
}

const CategoryRow = ({ category, labels }: CategoryRowProps) => {
  return (
    <TableRow className="border-border hover:bg-surface-muted even:bg-surface-muted/50 transition-colors">
      <TableCell className="font-bold">{category.name_en}</TableCell>
      <TableCell dir="rtl" className="text-body-base">
        {category.name_ar}
      </TableCell>
      <TableCell className="text-center">
        <Badge
          variant="outline"
          className="text-caption rounded-sm p-3 font-medium"
        >
          {category.sort_order}
        </Badge>
      </TableCell>
      <TableCell className="text-on-surface-variant text-center">
        {category.guidelines_count}
      </TableCell>
      <TableCell className="text-end">
        <div className="flex justify-end">
          <Button
            asChild
            variant="ghost"
            size="icon-sm"
            aria-label={labels.edit}
            title={labels.edit}
            className="text-secondary hover:bg-brand-light hover:text-primary"
          >
            <Link
              href={`${ROUTES.ADMIN_CATEGORIES}?dialog=edit&id=${category.id}`}
            >
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CategoryRow;
