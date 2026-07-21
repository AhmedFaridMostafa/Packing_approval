import { Skeleton } from "@/components/ui/skeleton";

const SearchSkeleton = () => {
  return (
    <div className="relative h-12 w-full max-w-md">
      <Skeleton className="h-full w-full rounded-md" />

      {/* Search icon placeholder */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>

      {/* Clear icon placeholder */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2">
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  );
};

export default SearchSkeleton;
