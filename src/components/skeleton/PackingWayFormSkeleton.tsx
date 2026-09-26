import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PackingWayFormSkeletonProps {
  mode: "create" | "edit";
}

const PackingWayFormSkeleton = ({ mode }: PackingWayFormSkeletonProps) => {
  return (
    <section className="space-y-8">
      {/* Page Header Skeleton */}
      <div className="border-border border-b pb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-12 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
        </div>
      </div>

      {/* Form & Previews Grid */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column: Form Card */}
        <div className="lg:col-span-7">
          <Card className="border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8">
            <div className="space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                {/* Country Selection */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Region Selection */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Category Selection */}
                <div className="space-y-2 md:col-span-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Title English */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Title Arabic */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Description English */}
                <div className="space-y-2 md:col-span-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-24 w-full rounded-md" />
                </div>

                {/* Description Arabic */}
                <div className="space-y-2 md:col-span-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-24 w-full rounded-md" />
                </div>

                {/* Image Upload Area */}
                <div className="space-y-2 md:col-span-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="border-border/60 flex h-44 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6">
                    <Skeleton className="size-10 rounded-full" />
                    <Skeleton className="h-4 w-44" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
          </Card>
        </div>

        {/* Right Column: Previews */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 flex flex-col gap-6">
            {/* Saved Version Preview Card (Only shown in edit mode) */}
            {mode === "edit" && (
              <Card className="border-border bg-surface-container-low/40 rounded-2xl p-5 shadow-xs">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-8 rounded-lg" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>

                <div className="border-border bg-card overflow-hidden rounded-xl border shadow-xs">
                  <Skeleton className="aspect-4/3 w-full rounded-none" />
                  <div className="space-y-3 p-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Skeleton className="h-5 w-16 rounded-md" />
                      <Skeleton className="h-5 w-24 rounded-md" />
                      <Skeleton className="h-4 w-16 rounded-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <Skeleton className="h-3.5 w-full" />
                      <Skeleton className="h-3.5 w-4/5" />
                    </div>
                    <div className="border-border/60 mt-3 flex items-center justify-between border-t pt-2.5">
                      <Skeleton className="h-3.5 w-24" />
                      <Skeleton className="h-3.5 w-20" />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Live Draft Preview Card */}
            <Card className="border-primary/20 bg-card rounded-2xl p-5 shadow-sm">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-8 rounded-lg" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              <div className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
                <Skeleton className="aspect-4/3 w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Skeleton className="h-5 w-16 rounded-md" />
                    <Skeleton className="h-5 w-24 rounded-md" />
                    <Skeleton className="h-4 w-16 rounded-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-5/6" />
                    <Skeleton className="h-3.5 w-2/3" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackingWayFormSkeleton;
