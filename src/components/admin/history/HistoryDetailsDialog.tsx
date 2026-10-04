"use client";

import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SmartImage from "@/components/shared/SmartImage";
import { formatDate } from "@/lib/utils";
import { ActionBadge } from "@/components/admin/ActionBadge";

export interface HistoryRowLabels {
  create: string;
  update: string;
  delete: string;
  view: string;
  before: string;
  after: string;
  region: string;
  category: string;
  changed_by: string;
  date: string;
  no_description: string;
  field_title_en: string;
  field_title_ar: string;
  field_description_en: string;
  field_description_ar: string;
  field_image: string;
}

interface SnapshotPanelProps {
  title: string;
  snapshot: PackingSnapshot;
  labels: HistoryRowLabels;
}

const SnapshotPanel = ({ title, snapshot, labels }: SnapshotPanelProps) => (
  <div className="border-border bg-surface-container-low/40 space-y-3 rounded-xl border p-4">
    <p className="font-heading text-on-surface text-sm font-bold">{title}</p>
    <div className="space-y-3 text-sm">
      <div>
        <p className="text-muted-foreground text-xs">{labels.field_title_en}</p>
        <p className="text-on-surface font-medium">{snapshot.title_en}</p>
      </div>
      <div dir="rtl">
        <p className="text-muted-foreground text-xs">{labels.field_title_ar}</p>
        <p className="text-on-surface font-medium">{snapshot.title_ar}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">
          {labels.field_description_en}
        </p>
        <p className="text-on-surface-variant whitespace-pre-wrap">
          {snapshot.description_en ?? labels.no_description}
        </p>
      </div>
      <div dir="rtl">
        <p className="text-muted-foreground text-xs">
          {labels.field_description_ar}
        </p>
        <p className="text-on-surface-variant whitespace-pre-wrap">
          {snapshot.description_ar ?? labels.no_description}
        </p>
      </div>
      {snapshot.image_url && (
        <div>
          <p className="text-muted-foreground text-xs">{labels.field_image}</p>
          <div className="bg-muted relative mt-1 h-28 w-full overflow-hidden rounded-lg border">
            <SmartImage
              src={snapshot.image_url}
              alt={snapshot.title_en}
              fill
              sizes="(min-width: 640px) 320px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

interface HistoryDetailsDialogProps {
  item: AdminHistoryItem;
  isRTL: boolean;
  labels: HistoryRowLabels;
}

const HistoryDetailsDialog = ({
  item,
  isRTL,
  labels,
}: HistoryDetailsDialogProps) => {
  const showBefore = item.action === "UPDATE" || item.action === "DELETE";
  const showAfter = item.action === "UPDATE" || item.action === "CREATE";
  const regionName = isRTL ? item.region_name_ar : item.region_name_en;
  const categoryName = isRTL ? item.category_name_ar : item.category_name_en;
  const title = isRTL ? item.title_ar : item.title_en;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={labels.view}>
          <Eye className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-center gap-2">
            <ActionBadge action={item.action}>
              {labels[item.action.toLowerCase() as keyof HistoryRowLabels]}
            </ActionBadge>
            <span>{title ?? "—"}</span>
          </DialogTitle>
          <DialogDescription>
            {labels.region}: {regionName} • {labels.category}: {categoryName}
          </DialogDescription>
        </DialogHeader>

        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span>
            {labels.changed_by}: {item.changed_by_name} ({item.changed_by_email}
            )
          </span>
          <span>
            {labels.date}: {formatDate(item.change_timestamp, isRTL)}
          </span>
        </div>

        <div
          className={
            item.action === "UPDATE" ? "grid gap-4 sm:grid-cols-2" : "space-y-4"
          }
        >
          {showBefore && item.snapshot_before && (
            <SnapshotPanel
              title={labels.before}
              snapshot={item.snapshot_before}
              labels={labels}
            />
          )}
          {showAfter && item.snapshot_after && (
            <SnapshotPanel
              title={labels.after}
              snapshot={item.snapshot_after}
              labels={labels}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryDetailsDialog;
