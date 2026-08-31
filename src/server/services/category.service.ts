import { db } from "@/drizzle/db";
import { categories, packing } from "@/drizzle/schemas/packing.schema";
import { eq, isNull, max, asc, and, sql } from "drizzle-orm";

export const getCategoriesWithCounts = async () => {
  return await db
    .select({
      id: categories.id,
      name_en: categories.name_en,
      name_ar: categories.name_ar,
      sort_order: categories.sort_order,
      guidelines_count: sql<number>`cast(count(${packing.id}) as integer)`,
    })
    .from(categories)
    .leftJoin(
      packing,
      and(eq(packing.category_id, categories.id), isNull(packing.deleted_at)),
    )
    .where(isNull(categories.deleted_at))
    .groupBy(categories.id)
    .orderBy(asc(categories.sort_order));
};

export const createCategory = async (data: {
  name_en: string;
  name_ar: string;
}) => {
  const [result] = await db
    .select({ maxSort: max(categories.sort_order) })
    .from(categories);

  const nextSortOrder = (result?.maxSort ?? 0) + 1;

  const [newCategory] = await db
    .insert(categories)
    .values({
      name_en: data.name_en,
      name_ar: data.name_ar,
      sort_order: nextSortOrder,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning();

  return newCategory;
};

export const updateCategory = async (
  id: number,
  data: { name_en?: string; name_ar?: string },
) => {
  const updateData: Partial<typeof categories.$inferInsert> = {
    updated_at: new Date(),
  };
  if (data.name_en) updateData.name_en = data.name_en;
  if (data.name_ar) updateData.name_ar = data.name_ar;

  const [updatedCategory] = await db
    .update(categories)
    .set(updateData)
    .where(and(eq(categories.id, id), isNull(categories.deleted_at)))
    .returning();

  return updatedCategory;
};

export const reorderCategories = async (
  updates: { id: number; sort_order: number }[],
) => {
  await db.transaction(async (tx) => {
    await Promise.all(
      updates.map((update) =>
        tx
          .update(categories)
          .set({ sort_order: update.sort_order, updated_at: new Date() })
          .where(eq(categories.id, update.id)),
      ),
    );
  });
  return true;
};
