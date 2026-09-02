"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

interface SortableCategoryItemProps {
  category: CategoryWithCount;
  index: number;
}

const SortableCategoryItem = ({
  category,
  index,
}: SortableCategoryItemProps) => {
  const t = useTranslations("AdminCategoriesPage.reorder");
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn(
        "border-border relative z-10 flex items-center border-b px-4 py-3 transition-colors last:border-b-0",
        isDragging
          ? "border-primary bg-brand-light shadow-md"
          : "bg-surface hover:bg-surface-container-low",
      )}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={t("drag_handle", { name: category.name_en })}
        className={cn(
          "text-outline-variant hover:text-primary flex w-10 shrink-0 cursor-grab touch-none transition-colors active:cursor-grabbing",
          isDragging && "text-primary",
        )}
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
        <span className="text-on-surface truncate font-semibold">
          {category.name_en}
        </span>
        <span dir="rtl" className="text-on-surface-variant text-sm">
          {category.name_ar}
        </span>
      </div>

      <div className="flex w-20 shrink-0 justify-center">
        <span
          className={cn(
            "rounded border px-2 py-1 font-mono text-xs",
            isDragging
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-surface-muted text-on-surface",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </li>
  );
};

interface SortableCategoryListProps {
  items: CategoryWithCount[];
  onItemsChange: (items: CategoryWithCount[]) => void;
}

const SortableCategoryList = ({
  items,
  onItemsChange,
}: SortableCategoryListProps) => {
  const t = useTranslations("AdminCategoriesPage.reorder");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    onItemsChange(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {/* List Header (Utility) */}
        <div className="text-on-surface-variant border-border bg-surface-muted text-caption flex items-center border-b px-4 py-3 font-medium tracking-wider uppercase">
          <div className="w-10" />
          <div className="flex-1">{t("list_header")}</div>
          <div className="w-20 shrink-0 text-center">{t("rank_header")}</div>
        </div>

        <ul className="flex flex-col" aria-label={t("list_header")}>
          {items.map((category, index) => (
            <SortableCategoryItem
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default SortableCategoryList;
