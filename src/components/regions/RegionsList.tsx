import { ROUTES } from "@/constants/routes";
import RegionsCard from "@/components/regions/RegionsCard";

interface RegionsListProps {
  translate: TranslateFn;
  isRTL: boolean;
  countrySlug?: string;
  regions: RegionWithCountryAndCount[];
}

const RegionsList = ({
  regions,
  translate,
  isRTL,
  countrySlug,
}: RegionsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {regions.map((region) => {
        const labelName = isRTL ? region.label_name_ar : region.label_name_en;

        const countryName = isRTL
          ? region?.country_name_ar
          : region?.country_name_en;

        return (
          <RegionsCard
            key={`${region.id}-${region.slug}`}
            t={translate}
            regionUrl={ROUTES.REGION(
              (countrySlug ?? region.country_slug) as string,
              region.slug,
            )}
            labelName={labelName}
            labels={region.labels}
            account={region.account}
            guidelines_count={region.guidelines_count}
            countryName={countryName}
            country_flag_url={region?.country_flag_url}
          />
        );
      })}
    </div>
  );
};

export default RegionsList;
