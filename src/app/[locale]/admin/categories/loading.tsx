import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const AdminCategoriesLoading = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-44 rounded-xl" />
          <Skeleton className="h-11 w-36 rounded-xl" />
        </div>
      </div>

      {/* Table */}
      <Card className="border-border bg-card overflow-hidden rounded-2xl shadow-sm">
        <div className="space-y-4 p-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminCategoriesLoading;
