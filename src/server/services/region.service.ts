import { db } from "@/drizzle/db";
import { region } from "@/drizzle/schemas/packing.schema";
import slugify from "slugify";
import { eq, and, isNull, type InferInsertModel } from "drizzle-orm";

type RegionUpdate = Partial<Omit<InferInsertModel<typeof region>, "id">>;

export const getRegions = async (countryId?: number) => {
  const conditions = [isNull(region.deleted_at)];
  if (countryId) {
    conditions.push(eq(region.country_id, countryId));
  }
  return await db
    .select()
    .from(region)
    .where(and(...conditions));
};

export const getRegionById = async (id: number) => {
  const [existingRegion] = await db
    .select()
    .from(region)
    .where(and(eq(region.id, id), isNull(region.deleted_at)));
  return existingRegion;
};

export const createRegion = async (data: {
  country_id: number;
  label_name_en: string;
  label_name_ar: string;
  account: string;
  labels: string[];
}) => {
  const slug = slugify(data.account, { lower: true, trim: true });

  const [newRegion] = await db
    .insert(region)
    .values({
      country_id: data.country_id,
      label_name_en: data.label_name_en,
      label_name_ar: data.label_name_ar,
      account: data.account,
      labels: data.labels,
      slug,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning();

  return newRegion;
};

export const updateRegion = async (
  id: number,
  data: {
    label_name_en?: string;
    label_name_ar?: string;
    account?: string;
    labels?: string[];
  },
) => {
  const updateData: RegionUpdate = { updated_at: new Date() };
  if (data.label_name_en) updateData.label_name_en = data.label_name_en;
  if (data.label_name_ar) updateData.label_name_ar = data.label_name_ar;
  if (data.account) {
    updateData.account = data.account;
    updateData.slug = slugify(data.account, { lower: true, trim: true });
  }
  if (data.labels) updateData.labels = data.labels;

  const [updatedRegion] = await db
    .update(region)
    .set(updateData)
    .where(eq(region.id, id))
    .returning();

  return updatedRegion;
};

export const deleteRegion = async (id: number) => {
  const [deletedRegion] = await db
    .update(region)
    .set({ deleted_at: new Date(), updated_at: new Date() })
    .where(eq(region.id, id))
    .returning();

  return deletedRegion;
};
