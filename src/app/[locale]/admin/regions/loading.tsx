import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const AdminRegionsLoading = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-52" />
            <Skeleton className="h-4 w-80" />
          </div>
        </div>

        <Skeleton className="h-11 w-36 rounded-xl" />
      </div>

      {/* Search Bar */}
      <Skeleton className="h-12 w-full max-w-md rounded-xl" />

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

export default AdminRegionsLoading;
