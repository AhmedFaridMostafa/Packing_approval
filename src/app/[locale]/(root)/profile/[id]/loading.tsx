import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const ProfileLoading = () => (
  <section className="bg-surface-container-lowest section-container min-h-screen py-10 sm:py-16">
    {/* Page Header */}
    <div className="mb-8 flex items-center gap-3">
      <Skeleton className="h-12 w-12 rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-4 w-80" />
      </div>
    </div>

    {/* Cards */}
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6">
        <Card className="border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="w-full space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </Card>
        <Card className="border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8">
          <Skeleton className="mb-5 h-6 w-36" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-11 rounded-xl" />
            <Skeleton className="h-11 rounded-xl" />
          </div>
        </Card>
      </div>
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Card className="border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8">
          <Skeleton className="mb-6 h-6 w-44" />
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-11 w-36 rounded-xl" />
            </div>
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </Card>
        <Card className="border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8">
          <Skeleton className="mb-6 h-6 w-44" />
          <div className="space-y-5">
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </Card>
      </div>
    </div>
  </section>
);

export default ProfileLoading;
