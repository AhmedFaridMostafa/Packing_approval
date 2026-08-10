import { Eye, FileText, Globe, MapPin, Pencil } from "lucide-react";

import { Link } from "@/i18n/navigation";

import SmartImage from "@/components/shared/SmartImage";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import DeleteCountryButton from "./DeleteCountryButton";
import { ROUTES } from "@/constants/routes";

interface CountryRowProps {
  country: FeaturedCountry;
  isRTL: boolean;
  validationT?: TranslateFn;
  labels: {
    view: string;
    edit?: string;
    delete: string;
    cancel: string;
    confirmTitle: string;
    confirmDescription: string;
    success: string;
    error: string;
  };
}

const CountryRow = ({ country, isRTL, labels }: CountryRowProps) => {
  const countryName = isRTL ? country.name_ar : country.name_en;

  return (
    <TableRow className="border-border hover:bg-surface-container-low/40 transition-colors">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-11 overflow-hidden rounded-md border">
            {country.flag_url ? (
              <SmartImage
                src={country.flag_url}
                alt={`${countryName} flag`}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <Globe className="h-4 w-4" />
            )}
          </div>

          <div>
            <div className="font-bold">{countryName}</div>

            <div className="text-caption">
              {isRTL ? country.name_en : country.name_ar}
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="outline">{country.slug}</Badge>
      </TableCell>

      <TableCell className="text-center">
        <span className="inline-flex items-center gap-1 rounded-full px-3 py-1">
          <MapPin className="h-3 w-3" />
          {country.region_count}
        </span>
      </TableCell>

      <TableCell className="text-center">
        <span className="inline-flex items-center gap-1 rounded-full px-3 py-1">
          <FileText className="h-3 w-3" />
          {country.guidelines_count}
        </span>
      </TableCell>

      <TableCell className="text-end">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.COUNTRY(country.slug)}>
              <Eye className="mr-1 h-4 w-4" />
              {labels.view}
            </Link>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link href={ROUTES.ADMIN_PANEL_COUNTRIES_EDIT(country.slug)}>
              <Pencil className="mr-1 h-4 w-4" />
              {labels.edit ?? "Edit"}
            </Link>
          </Button>

          <DeleteCountryButton id={country.id} labels={labels} />
        </div>
      </TableCell>
    </TableRow>
  );
};
export default CountryRow;
