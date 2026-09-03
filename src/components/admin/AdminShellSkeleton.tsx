import { Skeleton } from "@/components/ui/skeleton";

const AdminShellSkeleton = () => (
  <div className="bg-surface-container-lowest flex min-h-screen">
    <aside className="bg-surface-container-lowest hidden w-64 shrink-0 border-r p-4 lg:block">
      <div className="space-y-4">
        <Skeleton className="h-10 w-32" />
        <div className="space-y-2 pt-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </aside>

    <div className="flex min-w-0 flex-1 flex-col">
      <div className="border-b-border flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-96" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-2xl" />
            ))}
          </div>
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </main>
    </div>
  </div>
);

export default AdminShellSkeleton;
