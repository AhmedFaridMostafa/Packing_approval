import { Skeleton } from "@/components/ui/skeleton";
import { ITEMS_PER_PAGE } from "@/constants";

const CountriesSkeleton = () => {
  return (
    <section className="bg-surface-container-lowest section-container min-h-screen py-10 sm:py-16">
      <div className="border-border mb-8 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-72" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-lg" />
        ))}
      </div>
    </section>
  );
};

export default CountriesSkeleton;
