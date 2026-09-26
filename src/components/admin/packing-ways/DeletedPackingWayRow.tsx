import { CalendarX } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import RestorePackingWayButton from "./RestorePackingWayButton";

const DeletedPackingWayRow = ({
  item,
  isRTL,
  labels,
}: {
  item: DeletedPackingWayItem;
  isRTL: boolean;
  labels: { restore: string; success: string; error: string };
}) => {
  const title = isRTL ? item.title_ar : item.title_en;
  const category = isRTL ? item.category_name_ar : item.category_name_en;
  const country = isRTL ? item.country_name_ar : item.country_name_en;
  return (
    <TableRow className="opacity-85">
      <TableCell>
        <p className="font-semibold">{title}</p>
        <p className="text-caption text-muted-foreground">
          {isRTL ? item.title_en : item.title_ar}
        </p>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{category}</Badge>
      </TableCell>
      <TableCell>{country}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-sm">
          <CalendarX className="text-destructive size-4" />
          {formatDate(item.deleted_at, isRTL)}
        </div>
        <p className="text-caption text-muted-foreground">
          {item.deleted_by_name ?? "—"}
        </p>
      </TableCell>
      <TableCell className="text-end">
        <RestorePackingWayButton id={item.id} labels={labels} />
      </TableCell>
    </TableRow>
  );
};

export default DeletedPackingWayRow;
