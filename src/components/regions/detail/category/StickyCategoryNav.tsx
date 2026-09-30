"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StickyCategoryNavProps {
  groupedPacking: CategoryGroup[];
  isRTL: boolean;
  children?: React.ReactNode;
}

const StickyCategoryNav = ({
  groupedPacking,
  isRTL,
  children,
}: StickyCategoryNavProps) => {
  const [activeCategory, setActiveCategory] = useState(
    groupedPacking[0].category.id ?? 0,
  );
  useEffect(() => {
    const sections =
      document.querySelectorAll<HTMLElement>("[data-category-id]");

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleSections.length) return;

        const id = Number(
          (visibleSections[0].target as HTMLElement).dataset.categoryId,
        );

        setActiveCategory((prev) => (prev === id ? prev : id));
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: [0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: number) => {
    const section = document.getElementById(`category-${id}`);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveCategory((prev) => (prev === id ? prev : id));
  };

  if (groupedPacking.length <= 1) return null;

  return (
    <div className="sticky-nav">
      <div className="flex flex-wrap items-center justify-around gap-2">
        <nav className="scrollbar-hide flex space-x-1 overflow-x-auto py-3 rtl:space-x-reverse">
          {groupedPacking.map((group) => {
            const category = group.category;
            const catName = isRTL ? category.name_ar : category.name_en;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={cn(
                  "shrink-0 px-4 py-2 text-sm font-semibold capitalize transition-all",
                  "active:scale-95",
                )}
                onClick={() => handleClick(category.id)}
              >
                {catName}
              </Button>
            );
          })}
        </nav>
        {children}
      </div>
    </div>
  );
};

export default StickyCategoryNav;
