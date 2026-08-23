"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { cn, formUrlQuery } from "@/lib/utils";

import { usePathname } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const currentPage = parseInt(searchParams.get("page") || "1");
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    startTransition(() => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        pathname,
        key: "page",
        value: page.toString(),
      });
      router.push(newUrl);
    });
  };

  return (
    <div className="border-border/60 mt-12 flex items-center justify-center gap-2 border-t pt-6">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        aria-label="Previous page"
        className="border-border hover:bg-accent hover:text-primary cursor-pointer rounded-xl transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="rtl-flip h-5 w-5" />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
          aria-label={`Page ${page}`}
          className={cn(
            "border-border h-10 w-10 cursor-pointer rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
            currentPage === page
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-accent hover:text-primary",
          )}
          disabled={isPending}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
        aria-label="Next page"
        className="border-border hover:bg-accent hover:text-primary cursor-pointer rounded-xl transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight className="rtl-flip h-5 w-5" />
      </Button>
    </div>
  );
};

export default Pagination;
