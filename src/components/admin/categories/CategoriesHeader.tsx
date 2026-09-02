import { ArrowUpDown, Plus } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

interface CategoriesHeaderProps {
  count: number;
  labels: {
    title: string;
    itemsCount: string;
    addCategory: string;
    reorderCategories: string;
  };
}

const CategoriesHeader = ({ count, labels }: CategoriesHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <h1 className="font-heading text-on-surface text-2xl font-bold sm:text-3xl">
          {labels.title}
        </h1>
        <span className="bg-surface-container-high text-on-surface-variant text-caption mt-1 rounded-full px-3 py-1 font-semibold">
          {labels.itemsCount.replace("{count}", String(count))}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {count >= 2 && (
          <Button
            asChild
            variant="outline"
            className="border-primary/40 text-primary hover:bg-brand-light hover:text-primary h-11 shrink-0 items-center gap-2 rounded-xl font-semibold shadow-xs"
          >
            <Link href={`${ROUTES.ADMIN_CATEGORIES}?view=reorder`}>
              <ArrowUpDown className="h-4 w-4" />
              {labels.reorderCategories}
            </Link>
          </Button>
        )}

        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 shrink-0 items-center gap-2 rounded-xl font-semibold shadow-xs"
        >
          <Link href={`${ROUTES.ADMIN_CATEGORIES}?dialog=create`}>
            <Plus className="h-4 w-4" />
            {labels.addCategory}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CategoriesHeader;
