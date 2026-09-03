import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const EditRegionLoading = () => (
  <div className="flex flex-col gap-8">
    {/* Page Header */}
    <div className="border-border flex flex-col gap-3 border-b pb-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-52" />
          <Skeleton className="h-4 w-80" />
        </div>
      </div>
    </div>

    {/* Form (mirrors RegionForm) */}
    <Card className="rounded-2xl p-6">
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        ))}
        <Skeleton className="h-11 w-32 rounded-xl" />
      </div>
    </Card>
  </div>
);

export default EditRegionLoading;
