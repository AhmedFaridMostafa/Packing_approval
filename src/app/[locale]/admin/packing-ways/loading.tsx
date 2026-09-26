import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-16 w-96" />
      <Skeleton className="h-12 max-w-md" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
