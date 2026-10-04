import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const HistoryTableSkeleton = () => (
  <Card className="overflow-hidden rounded-2xl">
    <div className="space-y-4 p-4">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-14 w-full" />
      ))}
    </div>
  </Card>
);

export default HistoryTableSkeleton;
