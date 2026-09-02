"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useRouter } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { apiClient } from "@/lib/api-client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import SortableCategoryList from "./SortableCategoryList";

interface CategoriesReorderProps {
  categories: CategoryWithCount[];
}

const CategoriesReorder = ({ categories }: CategoriesReorderProps) => {
  const router = useRouter();
  const t = useTranslations("AdminCategoriesPage");

  const [items, setItems] = useState<CategoryWithCount[]>(categories);
  const [isSaving, startSaving] = useTransition();

  const isDirty = items.some(
    (item, index) => item.sort_order !== categories[index].sort_order,
  );

  const handleSaveOrder = () => {
    if (!isDirty) return;

    startSaving(async () => {
      try {
        const payload = items.map((item, index) => ({
          id: item.id,
          sort_order: index + 1,
        }));

        const response = await apiClient.categories.reorderCategories(payload);

        if (response.success) {
          toast.success(t("reorder.save_success"));
          router.push(ROUTES.ADMIN_CATEGORIES);
          router.refresh();
        } else {
          toast.error(response.error?.message ?? t("reorder.save_error"));
        }
      } catch {
        toast.error(t("reorder.save_error"));
      }
    });
  };

  const handleDiscard = () => {
    if (isSaving) return;
    router.push(ROUTES.ADMIN_CATEGORIES);
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-heading text-on-surface text-2xl font-bold sm:text-3xl">
            {t("reorder.title")}
          </h1>
          <p className="text-body-base text-on-surface-variant mt-0.5 max-w-xl">
            {t("reorder.subtitle")}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Button
            variant="outline"
            onClick={handleDiscard}
            disabled={isSaving}
            className="border-border h-11 items-center gap-2 rounded-xl font-semibold shadow-xs"
          >
            {t("reorder.discard")}
          </Button>

          <Button
            onClick={handleSaveOrder}
            disabled={!isDirty || isSaving}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 items-center gap-2 rounded-xl font-semibold shadow-xs"
          >
            {isSaving ? <Spinner className="h-4 w-4" /> : null}
            {t("reorder.save_changes")}
          </Button>
        </div>
      </div>

      <Card className="border-border bg-card overflow-hidden rounded-2xl shadow-sm">
        <SortableCategoryList items={items} onItemsChange={setItems} />
      </Card>
    </>
  );
};

export default CategoriesReorder;
