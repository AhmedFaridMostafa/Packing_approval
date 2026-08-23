import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SmartImage from "@/components/shared/SmartImage";

interface CountryHeaderProps {
  isRTL: boolean;
  country: Country;
  isAdmin: boolean;
  guidelinesBadge: string;
  addRegionCta: string;
}

const CountryHeader = ({
  isRTL,
  country,
  isAdmin,
  guidelinesBadge,
  addRegionCta,
}: CountryHeaderProps) => {
  const countryName = isRTL ? country.name_ar : country.name_en;

  return (
    <div className="bg-surface border-border mb-10 flex flex-col gap-6 rounded-xl border-b px-4 py-8 md:flex-row md:items-center md:justify-between">
      {/* Country identity */}
      <div className="flex items-center gap-4">
        {country.flag_url ? (
          <div className="border-border relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border shadow-md">
            <SmartImage
              src={country.flag_url}
              alt={`${countryName} flag`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="bg-accent border-border flex h-12 w-16 shrink-0 items-center justify-center rounded-xl border text-2xl shadow-md select-none">
            🌍
          </div>
        )}
        <div>
          <h1 className="font-heading text-on-surface text-2xl font-bold sm:text-3xl">
            {countryName}
          </h1>
          <p className="text-caption text-primary mt-1.5 flex items-center gap-1.5 font-semibold tracking-wider uppercase">
            <span className="bg-primary h-2 w-2 rounded-full" />
            {guidelinesBadge}
          </p>
        </div>
      </div>

      {isAdmin && (
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-brand-hover rounded-xl px-5 py-2.5 font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5"
        >
          <Link
            href={`/admin/regions/add?countryId=${country.id}`}
            className="inline-flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            {addRegionCta}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default CountryHeader;
