import { Eye, MapPin, Pencil } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import SmartImage from "@/components/shared/SmartImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import DeletePackingWayButton from "./DeletePackingWayButton";

interface PackingWayRowProps {
  item: AdminPackingWayItem;
  isRTL: boolean;
  labels: Record<string, string>;
}
const PackingWayRow = ({ item, isRTL, labels }: PackingWayRowProps) => {
  const countryName = isRTL ? item.country_name_ar : item.country_name_en;
  const regionName = isRTL ? item.region_name_ar : item.region_name_en;
  const categoryName = isRTL ? item.category_name_ar : item.category_name_en;
  return (
    <TableRow className="border-border hover:bg-surface-container-low/40">
      <TableCell>
        <div className="flex min-w-56 items-center gap-3">
          <div className="bg-muted relative size-12 shrink-0 overflow-hidden rounded-lg border">
            {item.image_url ? (
              <SmartImage
                src={item.image_url}
                alt={isRTL ? item.title_ar : item.title_en}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <MapPin className="text-muted-foreground m-3 size-6" />
            )}
          </div>
          <div className="[&>*:nth-child(2)]:text-caption [&>*:nth-child(2)]:text-muted-foreground rtl:[&>*:first-child]:text-caption rtl:[&>*:first-child]:text-muted-foreground rtl:[&>*:nth-child(2)]:text-foreground flex flex-col gap-1 rtl:flex-col-reverse [&>*:first-child]:font-semibold rtl:[&>*:first-child]:font-normal rtl:[&>*:nth-child(2)]:text-base rtl:[&>*:nth-child(2)]:font-semibold">
            <p>{item.title_en}</p>
            <p dir="rtl">{item.title_ar}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{categoryName}</Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm">{regionName}</span>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {item.country_flag_url && (
            <SmartImage
              src={item.country_flag_url}
              alt=""
              width={24}
              height={16}
              className="rounded-sm object-cover"
            />
          )}
          <span className="text-sm">{countryName}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          {formatDate(item.updated_at, isRTL)}
          <p className="text-caption text-muted-foreground">
            {item.updated_by_name ?? labels.unknown}
          </p>
        </div>
      </TableCell>
      <TableCell className="text-end">
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link
              href={ROUTES.REGION(item.country_slug, item.region_slug)}
              aria-label={labels.view}
            >
              <Eye className="size-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link
              href={ROUTES.ADMIN_PACKING_WAYS_EDIT(item.id)}
              aria-label={labels.edit}
            >
              <Pencil className="size-4" />
            </Link>
          </Button>
          <DeletePackingWayButton
            id={item.id}
            labels={{
              delete: labels.delete,
              cancel: labels.cancel,
              title: labels.delete_title,
              description: labels.delete_description,
              success: labels.delete_success,
              error: labels.delete_error,
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PackingWayRow;
