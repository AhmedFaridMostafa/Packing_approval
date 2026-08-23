import { Eye, FileText, MapPin, Pencil } from "lucide-react";

import { Link } from "@/i18n/navigation";

import SmartImage from "@/components/shared/SmartImage";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import DeleteRegionButton from "./DeleteRegionButton";
import { ROUTES } from "@/constants/routes";

interface RegionRowProps {
  region: RegionWithCountryAndCount;
  isRTL: boolean;
  labels: {
    view: string;
    edit: string;
    delete: string;
    cancel: string;
    confirmTitle: string;
    confirmDescription: string;
    success: string;
    error: string;
  };
}

const RegionRow = ({ region, isRTL, labels }: RegionRowProps) => {
  const primaryLabel = isRTL ? region.label_name_ar : region.label_name_en;
  const secondaryLabel = isRTL ? region.label_name_en : region.label_name_ar;
  const countryName = isRTL ? region.country_name_ar : region.country_name_en;

  return (
    <TableRow className="border-border hover:bg-surface-container-low/40 transition-colors">
      <TableCell>
        <div>
          <div className="font-bold">{primaryLabel}</div>

          <div className="text-caption">{secondaryLabel}</div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <div className="relative flex h-8 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border">
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
        <Badge variant="outline">{region.account}</Badge>
      </TableCell>

      <TableCell>
        <div className="flex max-w-55 flex-wrap gap-1">
          {region.labels.slice(0, 3).map((label) => (
            <span
              key={label}
              className="bg-surface-container-high text-on-surface-variant rounded-full px-2 py-0.5 text-caption font-medium"
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

      <TableCell className="text-end">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.REGION(region.country_slug!, region.slug)}>
              <Eye className="me-1 h-4 w-4" />
              {labels.view}
            </Link>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link href={ROUTES.ADMIN_REGIONS_EDIT(region.id)}>
              <Pencil className="me-1 h-4 w-4" />
              {labels.edit}
            </Link>
          </Button>

          <DeleteRegionButton id={region.id} labels={labels} />
        </div>
      </TableCell>
    </TableRow>
  );
};
export default RegionRow;
