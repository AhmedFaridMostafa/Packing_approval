import SearchSkeleton from "@/components/skeleton/SearchSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const PackingWaysFilterBarSkeleton = () => (
  <div className="flex flex-col gap-3 sm:flex-row">
    <SearchSkeleton />
    <Skeleton className="h-12 w-full sm:w-52" />
    <Skeleton className="h-12 w-full sm:w-52" />
  </div>
);

export default PackingWaysFilterBarSkeleton;
