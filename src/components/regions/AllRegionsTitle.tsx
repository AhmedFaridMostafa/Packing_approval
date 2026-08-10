import { Building2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ROUTES } from "@/constants/routes";

interface AllRegionsTitleProps {
  t: TranslateFn;
  totalItems: number;
  isAdmin: boolean;
}

const AllRegionsTitle = ({ t, totalItems, isAdmin }: AllRegionsTitleProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        {/* Icon badge */}
        <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
          <Building2 className="h-6 w-6" />
        </div>

        <div>
          <h1 className="font-heading text-on-surface text-2xl font-bold sm:text-3xl">
            {t("title")}
          </h1>
          <p className="text-caption text-primary mt-1 font-semibold tracking-wider uppercase">
            {t("total_badge", { count: totalItems })}
          </p>
        </div>
      </div>

      {isAdmin && (
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-brand-hover rounded-xl px-5 py-2.5 font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5"
        >
          <Link
            href={ROUTES.ADMIN_REGIONS_ADD}
            className="inline-flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            {t("add_region_cta")}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AllRegionsTitle;
