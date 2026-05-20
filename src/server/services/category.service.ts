import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schemas/packing.schema";
import { eq, isNull, max, asc } from "drizzle-orm";

export const getCategories = async () => {
  return await db
    .select()
    .from(categories)
    .where(isNull(categories.deleted_at))
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
