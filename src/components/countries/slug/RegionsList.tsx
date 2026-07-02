import RegionsCard from "./RegionsCard";
import RegionsEmpty from "./RegionsEmpty";

interface RegionsListProps {
  t: TranslateFn;
  isRTL: boolean;
  countrySlug: string;
  countryId: number;
  isAdmin: boolean;
  regions: RegionWithCount[];
}

const RegionsList = ({
  t,
  isRTL,
  countrySlug,
  countryId,
  isAdmin,
  regions,
}: RegionsListProps) => {
  // ✅ Fixed: was `< 0` which is never true — empty state never rendered
  if (regions.length === 0) {
    return <RegionsEmpty t={t} isAdmin={isAdmin} countryId={countryId} />;
  }

  return (
    <>
      <h2 className="font-heading text-on-surface-variant mb-6 text-sm font-semibold tracking-wider uppercase">
        {t("regions_grid_title")}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((r) => {
          const labelName = isRTL ? r.label_name_ar : r.label_name_en;
          return (
            <RegionsCard
              key={`${r.id}-${r.slug}`}
              account={r.account}
              guidelines_count={r.guidelines_count}
              labelName={labelName}
              labels={r.labels}
              regionUrl={`/countries/${countrySlug}/${r.slug}`}
              t={t}
            />
          );
        })}
      </div>
    </>
  );
};

export default RegionsList;
