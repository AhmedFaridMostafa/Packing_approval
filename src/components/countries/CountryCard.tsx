import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { _Translator } from "next-intl";
import { File, MapPin } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface CountryCardProps {
  country: FeaturedCountry;
  translate: _Translator;
  locale: string;
}

export function CountryCard({ country, translate, locale }: CountryCardProps) {
  const isRTL = locale === "ar";
  const name = isRTL ? country.name_ar : country.name_en;

  return (
    <Link
      href={ROUTES.COUNTRY(country.slug)}
      className="group border-border bg-card hover:border-primary/40 card-hover relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Accent hover background blob */}
      <div aria-hidden="true" className="bg-primary/5 feature-blob" />

      <div>
        {/* Flag Image / Fallback Container */}
        <div className="bg-surface-container-high border-border relative mb-4 aspect-video w-full overflow-hidden rounded-xl border shadow-inner">
          {country.flag_url ? (
            <Image
              src={country.flag_url}
              alt={`${name} flag`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="bg-accent text-primary font-heading flex h-full w-full items-center justify-center text-3xl font-bold select-none">
              {getInitials(country.name_en) || "🌍"}
            </div>
          )}
        </div>

        {/* Country Name */}
        <h3 className="font-heading text-card-title text-on-surface group-hover:text-primary truncate font-semibold transition-colors duration-200">
          {name}
        </h3>
      </div>

      {/* Stats Badges */}
      <div className="border-border/60 relative mt-4 flex flex-wrap gap-2 border-t pt-2">
        <span className="bg-accent text-caption text-primary inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium">
          <MapPin className="size-5" />
          {translate("regions_badge", { count: country.region_count })}
        </span>

        <span className="bg-surface-container-high text-caption text-on-surface-variant inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium">
          <File className="size-5" />
          {translate("guidelines_badge", { count: country.guidelines_count })}
        </span>
      </div>
    </Link>
  );
}
