import { db } from "@/drizzle/db";
import { categories, packing, region } from "@/drizzle/schemas/packing.schema";
import { eq, and, isNull, type InferInsertModel } from "drizzle-orm";
import { logPackingHistory } from "./history.service";

type PackingUpdate = Partial<Omit<InferInsertModel<typeof packing>, "id">>;

export const getPackingWays = async (filters?: {
  region_id?: number;
  category_id?: number;
}) => {
  const conditions = [isNull(packing.deleted_at)];
  if (filters?.region_id) {
    conditions.push(eq(packing.region_id, filters.region_id));
  }
  if (filters?.category_id) {
    conditions.push(eq(packing.category_id, filters.category_id));
  }
  return await db
    .select()
    .from(packing)
    .where(and(...conditions));
};

export const getPackingWayById = async (id: string) => {
  const [existingPacking] = await db
    .select()
    .from(packing)
    .where(and(eq(packing.id, id), isNull(packing.deleted_at)));
  return existingPacking;
};

export const createPackingWay = async (
  data: {
    region_id: number;
    category_id: number;
    title_en: string;
    title_ar: string;
    description_en?: string | null;
    description_ar?: string | null;
    image_url?: string | null;
  },
  user: { id: string; name: string; email: string },
) => {
  return await db.transaction(async (tx) => {
    const [regionRecord] = await tx
      .select()
      .from(region)
      .where(eq(region.id, data.region_id));
    if (!regionRecord) throw new Error("Region not found");

    const [newPacking] = await tx
      .insert(packing)
      .values({
        ...data,
        created_by_id: user.id,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning();

    await logPackingHistory(
      {
        packing_id: newPacking.id,
        region_id: newPacking.region_id,
        country_id: regionRecord.country_id,
        category_id: newPacking.category_id,
        action: "CREATE",
        changed_by_id: user.id,
        changed_by_name: user.name,
        changed_by_email: user.email,
        snapshot_before: null,
        snapshot_after: newPacking,
      },
      tx,
    );
    return newPacking;
  });
};

export const updatePackingWay = async (
  id: string,
  data: {
    region_id?: number;
    category_id?: number;
    title_en?: string;
    title_ar?: string;
    description_en?: string | null;
    description_ar?: string | null;
    image_url?: string | null;
  },
  user: { id: string; name: string; email: string },
) => {
  return await db.transaction(async (tx) => {
    const [existingPacking] = await tx
      .select()
      .from(packing)
      .where(and(eq(packing.id, id), isNull(packing.deleted_at)));

    if (!existingPacking) throw new Error("Packing way not found");

    const regionIdToUse = data.region_id ?? existingPacking.region_id;
    const [regionRecord] = await tx
      .select()
      .from(region)
      .where(eq(region.id, regionIdToUse));
    if (!regionRecord) throw new Error("Region not found");

    const categoryIdToUse = data.category_id ?? existingPacking.category_id;
    const [categoryRecord] = await tx
      .select()
      .from(categories)
      .where(eq(categories.id, categoryIdToUse));
    if (!categoryRecord) throw new Error("Category not found");

    const updateData: PackingUpdate = {
      updated_at: new Date(),
      updated_by_id: user.id,
    };
    if (data.region_id !== undefined) updateData.region_id = data.region_id;
    if (data.category_id !== undefined)
      updateData.category_id = data.category_id;
    if (data.title_en !== undefined) updateData.title_en = data.title_en;
    if (data.title_ar !== undefined) updateData.title_ar = data.title_ar;
    if (data.description_en !== undefined)
      updateData.description_en = data.description_en;
    if (data.description_ar !== undefined)
      updateData.description_ar = data.description_ar;
    if (data.image_url !== undefined) updateData.image_url = data.image_url;

    const [updatedPacking] = await tx
      .update(packing)
      .set(updateData)
      .where(eq(packing.id, id))
      .returning();

    await logPackingHistory(
      {
        packing_id: updatedPacking.id,
        region_id: updatedPacking.region_id,
        country_id: regionRecord.country_id,
        category_id: updatedPacking.category_id,
        action: "UPDATE",
        changed_by_id: user.id,
        changed_by_name: user.name,
        changed_by_email: user.email,
        snapshot_before: existingPacking,
        snapshot_after: updatedPacking,
      },
      tx,
    );

    return updatedPacking;
  });
};

export const deletePackingWay = async (
  id: string,
  user: { id: string; name: string; email: string },
) => {
  return await db.transaction(async (tx) => {
    const [existingPacking] = await tx
      .select()
      .from(packing)
      .where(and(eq(packing.id, id), isNull(packing.deleted_at)));
    if (!existingPacking) throw new Error("Packing way not found");

    const [regionRecord] = await tx
      .select()
      .from(region)
      .where(eq(region.id, existingPacking.region_id));
    if (!regionRecord) throw new Error("Region not found");

    const [deletedPacking] = await tx
      .update(packing)
      .set({
        deleted_at: new Date(),
        updated_at: new Date(),
        deleted_by_id: user.id,
      })
      .where(eq(packing.id, id))
      .returning();

    await logPackingHistory(
      {
        packing_id: deletedPacking.id,
        region_id: deletedPacking.region_id,
        country_id: regionRecord.country_id,
        category_id: deletedPacking.category_id,
        action: "DELETE",
        changed_by_id: user.id,
        changed_by_name: user.name,
        changed_by_email: user.email,
        snapshot_before: existingPacking,
        snapshot_after: deletedPacking,
      },
      tx,
    );

    return deletedPacking;
  });
};
