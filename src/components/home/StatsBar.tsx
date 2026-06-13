import { Archive, Earth, Map, Shapes } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface StatsBarProps {
  countries: number;
  regions: number;
  categories: number;
  guidelines: number;
}

export const StatsBar = async ({
  countries,
  regions,
  categories,
  guidelines,
}: StatsBarProps) => {
  const t = await getTranslations("HomePage.stats");

  const stats = [
    { value: countries, label: t("countries"), Icon: Earth },
    { value: regions, label: t("regions"), Icon: Map },
    { value: categories, label: t("categories"), Icon: Shapes },
    { value: guidelines, label: t("guidelines"), Icon: Archive },
  ];

  return (
    <section className="border-border bg-surface-container-low section-container border-y py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8 lg:gap-10">
        {stats.map(({ value, label, Icon }) => (
          <div
            key={label}
            className="bg-surface-container-lowest flex flex-col items-center justify-center gap-1 rounded-lg border px-6 py-8 text-center"
          >
            <Icon className="text-primary size-6 md:size-8 lg:size-10" />
            <h3 className="stat-number tabular-nums">
              {value.toLocaleString()}
            </h3>
            <p className="text-caption text-on-surface-variant font-semibold tracking-wider uppercase">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
