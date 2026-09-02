import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

import { api } from "@/lib/api";
import { ROUTES } from "@/constants/routes";

import ErrorState from "@/components/shared/ErrorState";
import CategoriesHeader from "@/components/admin/categories/CategoriesHeader";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";
import CategoriesEmptyState from "@/components/admin/categories/CategoriesEmptyState";
import CategoriesReorder from "@/components/admin/categories/CategoriesReorder";
import CategoryFormDialog from "@/components/admin/categories/CategoryFormDialog";

export async function generateMetadata() {
  const t = await getTranslations("AdminCategoriesPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const AdminCategoriesPage = async ({ searchParams }: RouteParams) => {
  const requestHeaders = await headers();

  const [result, { view, dialog, id }, t] = await Promise.all([
    api.categories.getAdminCategories(requestHeaders),
    searchParams,
    getTranslations("AdminCategoriesPage"),
  ]);

  if (!result.success)
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );

  const categories = result.data;

  // ── Normalize invalid URL state ───────────────────────────────────────
  if (view === "reorder" && categories.length < 2)
    redirect(ROUTES.ADMIN_CATEGORIES);

  let editingCategory: CategoryWithCount | undefined;

  if (dialog === "edit") {
    const numericId = id ? parseInt(id) : NaN;
    editingCategory = !isNaN(numericId)
      ? categories.find((c) => c.id === numericId)
      : undefined;
    if (!editingCategory) redirect(ROUTES.ADMIN_CATEGORIES);
  }

  const tableLabels = {
    nameEn: t("table.name_en"),
    nameAr: t("table.name_ar"),
    sortOrder: t("table.sort_order"),
    guidelinesCount: t("table.guidelines_count"),
    actions: t("table.actions"),
    edit: t("edit_category"),
  };

  return (
    <div className="flex flex-col gap-6">
      {view === "reorder" ? (
        <CategoriesReorder categories={categories} />
      ) : (
        <>
          <CategoriesHeader
            count={categories.length}
            labels={{
              title: t("title"),
              itemsCount: t("items_count", { count: categories.length }),
              addCategory: t("add_category"),
              reorderCategories: t("reorder_categories"),
            }}
          />

          {categories.length === 0 ? (
            <CategoriesEmptyState
              labels={{
                title: t("empty.title"),
                description: t("empty.description"),
                addCategory: t("add_category"),
              }}
            />
          ) : (
            <CategoriesTable categories={categories} labels={tableLabels} />
          )}
        </>
      )}

      <CategoryFormDialog
        key={dialog === "edit" ? `edit-${editingCategory?.id}` : "create"}
        open={Boolean(dialog)}
        mode={dialog === "edit" ? "edit" : "create"}
        category={editingCategory}
      />
    </div>
  );
};

export default AdminCategoriesPage;
