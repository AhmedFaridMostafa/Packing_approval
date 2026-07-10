import { db } from "@/drizzle/db";
import {
  categories,
  country,
  packing,
  region,
} from "@/drizzle/schemas/packing.schema";
import slugify from "slugify";
import { eq, and, isNull, type InferInsertModel, asc } from "drizzle-orm";

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

export const getRegionPackingData = async (
  countrySlug: string,
  regionSlug: string,
) => {
  const rows = await db
    .select({
      // Country — identical in every row
      countryId: country.id,
      countrySlug: country.slug,
      countryNameEn: country.name_en,
      countryNameAr: country.name_ar,
      countryFlagUrl: country.flag_url,

      // Region — identical in every row
      regionId: region.id,
      regionSlug: region.slug,
      labelNameEn: region.label_name_en,
      labelNameAr: region.label_name_ar,
      account: region.account,
      labels: region.labels,

      // Packing — unique per row, null when region has no packing ways
      packingId: packing.id,
      titleEn: packing.title_en,
      titleAr: packing.title_ar,
      descriptionEn: packing.description_en,
      descriptionAr: packing.description_ar,
      imageUrl: packing.image_url,

      // Category — null when packing is null
      categoryId: categories.id,
      categoryNameEn: categories.name_en,
      categoryNameAr: categories.name_ar,
      sortOrder: categories.sort_order,
    })
    .from(country)
    .innerJoin(
      region,
      and(
        eq(region.country_id, country.id),
        eq(region.slug, regionSlug),
        isNull(region.deleted_at),
      ),
    )
    .leftJoin(
      packing,
      and(eq(packing.region_id, region.id), isNull(packing.deleted_at)),
    )
    .leftJoin(
      categories,
      and(
        eq(categories.id, packing.category_id),
        isNull(categories.deleted_at),
      ),
    )
    .where(and(eq(country.slug, countrySlug), isNull(country.deleted_at)))
    .orderBy(asc(categories.sort_order), asc(packing.created_at));

  if (rows.length === 0) return null;

  const first = rows[0];

  const countryData = {
    id: first.countryId,
    slug: first.countrySlug,
    name_en: first.countryNameEn,
    name_ar: first.countryNameAr,
    flag_url: first.countryFlagUrl,
  };

  const regionData = {
    id: first.regionId,
    slug: first.regionSlug,
    label_name_en: first.labelNameEn,
    label_name_ar: first.labelNameAr,
    account: first.account,
    labels: first.labels,
  };

  const categoryMap = new Map<number, CategoryGroup>();

  for (const row of rows) {
    // Skip the null-packing row that appears when region has no packing ways
    if (!row.packingId || !row.categoryId) continue;

    if (!categoryMap.has(row.categoryId)) {
      categoryMap.set(row.categoryId, {
        category: {
          id: row.categoryId,
          name_en: row.categoryNameEn!,
          name_ar: row.categoryNameAr!,
          sort_order: row.sortOrder!,
        },
        items: [],
      });
    }

    categoryMap.get(row.categoryId)!.items.push({
      id: row.packingId,
      title_en: row.titleEn!,
      title_ar: row.titleAr!,
      description_en: row.descriptionEn,
      description_ar: row.descriptionAr,
      image_url: row.imageUrl,
    });
  }

  const groupedPacking = Array.from(categoryMap.values());

  return {
    country: countryData,
    region: regionData,
    groupedPacking,
    totalGuidelines: groupedPacking.reduce((sum, g) => sum + g.items.length, 0),
  };
};
