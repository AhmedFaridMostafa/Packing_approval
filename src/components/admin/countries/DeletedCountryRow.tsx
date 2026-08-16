import { FileText, Globe, MapPin, CalendarX } from "lucide-react";
import SmartImage from "@/components/shared/SmartImage";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import RestoreCountryButton from "./RestoreCountryButton";
import { formatDate } from "@/lib/utils";

interface DeletedCountryRowProps {
  country: DeletedCountry;
  isRTL: boolean;
  labels: {
    restore: string;
    success: string;
    error: string;
  };
}

const DeletedCountryRow = ({
  country,
  isRTL,
  labels,
}: DeletedCountryRowProps) => {
  const countryName = isRTL ? country.name_ar : country.name_en;
  const deletedDate = formatDate(country.deleted_at, isRTL);

  return (
    <TableRow className="border-border hover:bg-surface-container-low/40 opacity-90 transition-colors">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-11 overflow-hidden rounded-md border grayscale">
            {country.flag_url ? (
              <SmartImage
                src={country.flag_url}
                alt={`${countryName} flag`}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <div className="bg-muted flex h-full w-full items-center justify-center">
                <Globe className="h-4 w-4" />
              </div>
            )}
          </div>

          <div>
            <div className="font-bold">{countryName}</div>
            <div className="text-caption text-on-surface-variant">
              {isRTL ? country.name_en : country.name_ar}
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="outline" className="opacity-70">
          {country.slug}
        </Badge>
      </TableCell>

      <TableCell className="text-center">
        <span className="text-on-surface-variant inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium">
          <CalendarX className="text-destructive h-3.5 w-3.5" />
          {deletedDate}
        </span>
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
        <div className="flex justify-end">
          <RestoreCountryButton slug={country.slug} labels={labels} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DeletedCountryRow;
