import { PackageOpen } from "lucide-react";

interface RegionHeaderProps {
  countryName: string;
  regionName: string;
  guidelinesBadge: string;
  accountLabel: string;
  region: Omit<RegionWithCount, "guidelines_count">;
}

const RegionHeader = ({
  countryName,
  regionName,
  guidelinesBadge,
  accountLabel,
  region,
}: RegionHeaderProps) => {
  return (
    <div className="bg-surface mb-2 flex flex-col gap-4 rounded-xl px-4 py-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-caption text-on-surface-variant mb-1 font-medium">
          {countryName}
        </p>
        <h1 className="font-heading text-on-surface text-2xl font-bold sm:text-3xl lg:text-4xl">
          {regionName}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="bg-accent text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold">
            <PackageOpen className="h-4 w-4" />

            {guidelinesBadge}
          </span>
          <span className="text-on-surface-variant text-sm">
            {accountLabel}:
            <span className="text-on-surface font-semibold">
              {region.account}
            </span>
          </span>
        </div>
        {region.labels.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {region.labels.map((label) => (
              <span
                key={label}
                className="bg-surface-container-high text-on-surface-variant border-border rounded-lg border px-2.5 py-1 text-xs font-medium"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionHeader;
