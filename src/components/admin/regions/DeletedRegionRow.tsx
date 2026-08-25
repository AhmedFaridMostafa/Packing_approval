import { CalendarX, FileText, MapPin } from "lucide-react";

import SmartImage from "@/components/shared/SmartImage";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import RestoreRegionButton from "./RestoreRegionButton";
import { formatDate } from "@/lib/utils";

interface DeletedRegionRowProps {
  region: DeletedRegion;
  isRTL: boolean;
  labels: {
    restore: string;
    success: string;
    error: string;
  };
}

const DeletedRegionRow = ({ region, isRTL, labels }: DeletedRegionRowProps) => {
  const primaryLabel = isRTL ? region.label_name_ar : region.label_name_en;
  const secondaryLabel = isRTL ? region.label_name_en : region.label_name_ar;
  const countryName = isRTL ? region.country_name_ar : region.country_name_en;
  const deletedDate = formatDate(region.deleted_at, isRTL);

  return (
    <TableRow className="border-border hover:bg-surface-container-low/40 opacity-90 transition-colors">
      <TableCell>
        <div>
          <div className="font-bold">{primaryLabel}</div>

          <div className="text-caption text-on-surface-variant">
            {secondaryLabel}
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <div className="relative flex h-8 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border grayscale">
            {region.country_flag_url ? (
              <SmartImage
                src={region.country_flag_url}
                alt={`${countryName} flag`}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <MapPin className="h-4 w-4" />
            )}
          </div>

          <span className="text-body-sm font-medium">{countryName}</span>
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="outline" className="opacity-70">
          {region.account}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="flex max-w-55 flex-wrap gap-1">
          {region.labels.slice(0, 3).map((label) => (
            <span
              key={label}
              className="bg-surface-container-high text-on-surface-variant text-caption rounded-full px-2 py-0.5 font-medium"
            >
              {label}
            </span>
          ))}

          {region.labels.length > 3 && (
            <span className="text-on-surface-variant text-caption font-medium">
              +{region.labels.length - 3}
            </span>
          )}
        </div>
      </TableCell>

      <TableCell className="text-center">
        <span className="inline-flex items-center gap-1 rounded-full px-3 py-1">
          <FileText className="h-3 w-3" />
          {region.guidelines_count}
        </span>
      </TableCell>

      <TableCell className="text-center">
        <span className="text-on-surface-variant inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium">
          <CalendarX className="text-destructive h-3.5 w-3.5" />
          {deletedDate}
        </span>
      </TableCell>

      <TableCell className="text-end">
        <div className="flex justify-end">
          <RestoreRegionButton id={region.id} labels={labels} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DeletedRegionRow;
