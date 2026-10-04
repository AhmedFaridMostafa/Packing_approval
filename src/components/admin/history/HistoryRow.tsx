import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { ActionBadge } from "@/components/admin/ActionBadge";
import HistoryDetailsDialog, {
  type HistoryRowLabels,
} from "./HistoryDetailsDialog";

interface HistoryRowProps {
  item: AdminHistoryItem;
  isRTL: boolean;
  labels: HistoryRowLabels;
}

const HistoryRow = ({ item, isRTL, labels }: HistoryRowProps) => {
  const countryName = isRTL ? item.country_name_ar : item.country_name_en;
  const regionName = isRTL ? item.region_name_ar : item.region_name_en;
  const categoryName = isRTL ? item.category_name_ar : item.category_name_en;

  return (
    <TableRow className="border-border hover:bg-surface-container-low/40">
      <TableCell>
        <div className="rtl:[&>*:nth-child(2)]:text-foreground rtl:[&>*:first-child]:text-caption rtl:[&>*:first-child]:text-muted-foreground flex min-w-56 flex-col gap-1 [&>*:first-child]:font-semibold rtl:[&>*:first-child]:font-normal rtl:[&>*:nth-child(2)]:text-base rtl:[&>*:nth-child(2)]:font-semibold">
          <p>{item.title_en ?? "—"}</p>
          <p dir="rtl">{item.title_ar ?? "—"}</p>
        </div>
      </TableCell>
      <TableCell>
        <ActionBadge action={item.action}>
          {labels[item.action.toLowerCase() as keyof HistoryRowLabels]}
        </ActionBadge>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{categoryName}</Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm">{regionName}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">{countryName}</span>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          {item.changed_by_name}
          <p className="text-caption text-muted-foreground">
            {item.changed_by_email}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          {formatDate(item.change_timestamp, isRTL)}
        </div>
      </TableCell>
      <TableCell className="text-end">
        <HistoryDetailsDialog item={item} isRTL={isRTL} labels={labels} />
      </TableCell>
    </TableRow>
  );
};

export default HistoryRow;
