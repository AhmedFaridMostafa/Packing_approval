import { Link } from "@/i18n/navigation";
import { Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RegionsEmptyProps {
  t: TranslateFn;
  isAdmin: boolean;
  countryId: number;
}

const RegionsEmpty = ({ t, isAdmin, countryId }: RegionsEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-accent text-primary relative mb-6 flex h-24 w-24 items-center justify-center rounded-full">
        <div
          aria-hidden="true"
          className="bg-primary/5 absolute inset-0 animate-pulse rounded-full"
        />
        <Info className="relative z-10 h-10 w-10" />
      </div>

      <h2 className="font-heading text-section-title text-on-surface mb-2 font-bold">
        {t("empty_title")}
      </h2>
      <p className="text-body-base text-on-surface-variant mb-6 max-w-sm leading-relaxed">
        {t("empty_desc")}
      </p>

      {isAdmin && (
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-brand-hover rounded-xl px-5 py-2.5 font-semibold shadow-sm transition-colors"
        >
          <Link
            href={`/admin/regions/add?countryId=${countryId}`}
            className="inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {t("add_region_cta")}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default RegionsEmpty;
