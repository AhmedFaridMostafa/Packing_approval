import { LayoutList, Plus } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

interface CategoriesEmptyStateProps {
  labels: {
    title: string;
    description: string;
    addCategory: string;
  };
}

const CategoriesEmptyState = ({ labels }: CategoriesEmptyStateProps) => {
  return (
    <div className="border-border bg-card flex flex-col items-center justify-center rounded-2xl border py-20 text-center shadow-sm">
      <LayoutList className="text-on-surface-variant/30 mb-4 h-16 w-16" />
      <h2 className="font-heading text-on-surface mb-1 text-xl font-bold">
        {labels.title}
      </h2>
      <p className="text-on-surface-variant text-body-base max-w-sm">
        {labels.description}
      </p>
      <Button asChild className="mt-6 rounded-xl font-semibold shadow-xs">
        <Link href={`${ROUTES.ADMIN_CATEGORIES}?dialog=create`}>
          <Plus className="h-5 w-5" />
          {labels.addCategory}
        </Link>
      </Button>
    </div>
  );
};

export default CategoriesEmptyState;
