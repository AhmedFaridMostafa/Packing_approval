import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const AdminDashboardLoading = () => (
  <div className="flex flex-col gap-8">
    {/* Welcome banner */}
    <div className="bg-primary/5 border-primary/20 rounded-2xl border p-6 sm:p-8">
      <Skeleton className="h-8 w-72" />
      <Skeleton className="mt-2 h-5 w-96 max-w-2xl" />
    </div>

    {/* Stats cards */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="rounded-2xl p-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-3 h-8 w-16" />
        </Card>
      ))}
    </div>

    {/* Quick actions */}
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-32 rounded-xl" />
      ))}
    </div>

    {/* Recent history */}
    <Card className="rounded-2xl p-6">
      <Skeleton className="h-6 w-40" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    </Card>
  </div>
);

export default AdminDashboardLoading;
