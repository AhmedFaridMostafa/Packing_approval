import HistoryFilterBarSkeleton from "@/components/skeleton/HistoryFilterBarSkeleton";
import HistoryTableSkeleton from "@/components/skeleton/HistoryTableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => (
  <div className="flex flex-col gap-6">
    <div className="flex items-center gap-3">
      <Skeleton className="size-12 rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
    </div>
    <HistoryFilterBarSkeleton />
    <HistoryTableSkeleton />
  </div>
);

export default Loading;
