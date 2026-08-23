import { db } from "@/drizzle/db";
import { country, region, packing } from "@/drizzle/schemas/packing.schema";
import slugify from "slugify";
import {
  and,
  asc,
  eq,
  ilike,
  isNotNull,
  isNull,
  or,
  sql,
  type SQL,
} from "drizzle-orm";
import { ITEMS_PER_PAGE } from "@/constants";

export const getAllActiveCountries = async () => {
  return await db.select().from(country).where(isNull(country.deleted_at));
};

export const getCountries = async ({
  searchQuery,
  currentPage = 1,
}: {
  searchQuery?: string;
  currentPage?: number;
}) => {
  const page = Math.max(1, currentPage);
  const filters: SQL[] = [isNull(country.deleted_at)];

  if (searchQuery) {
    filters.push(
      or(
        ilike(country.name_en, `%${searchQuery}%`),
        ilike(country.name_ar, `%${searchQuery}%`),
      ) as SQL,
    );
  }

  const rows = await db
    .select({
      id: country.id,
      slug: country.slug,
      name_en: country.name_en,
      name_ar: country.name_ar,
      flag_url: country.flag_url,
      region_count: sql<number>`cast(count(distinct ${region.id}) as integer)`,
      guidelines_count: sql<number>`cast(count(distinct ${packing.id}) as integer)`,
      total_count: sql<number>`cast(count(*) over() as integer)`,
    })
    .from(country)
    .leftJoin(
      region,
      and(eq(region.country_id, country.id), isNull(region.deleted_at)),
    )
    .leftJoin(
      packing,
      and(eq(packing.region_id, region.id), isNull(packing.deleted_at)),
    )
    .where(and(...filters))
    .groupBy(country.id)
    .orderBy(country.name_en)
    .limit(ITEMS_PER_PAGE)
    .offset((page - 1) * ITEMS_PER_PAGE);

  const totalItems = rows[0]?.total_count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const countries = rows.map(({ total_count: _, ...rest }) => rest);

  return { countries, totalItems, totalPages };
};

export const getCountryWithRegions = async (slug: string) => {
  const [countryRecord] = await db
    .select({
      id: country.id,
      slug: country.slug,
      name_en: country.name_en,
      name_ar: country.name_ar,
      flag_url: country.flag_url,
    })
    .from(country)
    .where(and(eq(country.slug, slug), isNull(country.deleted_at)))
    .limit(1);

  if (!countryRecord) return null;

  const regions = await db
    .select({
      id: region.id,
      slug: region.slug,
      label_name_en: region.label_name_en,
      label_name_ar: region.label_name_ar,
      account: region.account,
      labels: region.labels,
      guidelines_count: sql<number>`cast(count(${packing.id}) as integer)`,
    })
    .from(region)
    .leftJoin(
      packing,
      and(eq(packing.region_id, region.id), isNull(packing.deleted_at)),
    )
    .where(
      and(eq(region.country_id, countryRecord.id), isNull(region.deleted_at)),
    )
    .groupBy(region.id)
    .orderBy(asc(region.label_name_en));

  const total_guidelines = regions.reduce(
    (sum, r) => sum + r.guidelines_count,
    0,
  );

  return {
    country: countryRecord,
    regions,
    total_guidelines,
  };
};

export const createCountry = async (data: {
  name_en: string;
  name_ar: string;
  flag_url?: string;
}) => {
  const slug = slugify(data.name_en, { lower: true, trim: true });

  const [newCountry] = await db
    .insert(country)
    .values({
      name_en: data.name_en,
      name_ar: data.name_ar,
      flag_url: data.flag_url,
      slug,
    })
    .returning();

  return newCountry;
};

export const updateCountry = async ({
  slug,
  name_en,
  name_ar,
  flag_url,
}: {
  slug: string;
  name_en: string;
  name_ar: string;
  flag_url?: string | undefined;
}) => {
  const updateFields: Record<string, any> = {
    updated_at: new Date(),
    slug: slugify(name_en, { lower: true, trim: true }),
    name_en: name_en,
    name_ar: name_ar,
  };

  if (flag_url !== undefined) updateFields.flag_url = flag_url;

  const [updatedRecord] = await db
    .update(country)
    .set(updateFields)
    .where(and(eq(country.slug, slug), isNull(country.deleted_at)))
    .returning();

  return updatedRecord;
};

export const deleteCountry = async (slug: string) => {
  const [deletedRecord] = await db
    .update(country)
    .set({ deleted_at: new Date() })
    .where(and(eq(country.slug, slug), isNull(country.deleted_at)))
    .returning();

  return deletedRecord;
};

export const getDeletedCountries = async ({
  searchQuery,
  currentPage = 1,
}: {
  searchQuery?: string;
  currentPage?: number;
}) => {
  const page = Math.max(1, currentPage);
  const filters: SQL[] = [isNotNull(country.deleted_at)];

  if (searchQuery) {
    filters.push(
      or(
        ilike(country.name_en, `%${searchQuery}%`),
        ilike(country.name_ar, `%${searchQuery}%`),
      ) as SQL,
    );
  }

  const rows = await db
    .select({
      id: country.id,
      slug: country.slug,
      name_en: country.name_en,
      name_ar: country.name_ar,
      flag_url: country.flag_url,
      deleted_at: country.deleted_at,
      region_count: sql<number>`cast(count(distinct ${region.id}) as integer)`,
      guidelines_count: sql<number>`cast(count(distinct ${packing.id}) as integer)`,
      total_count: sql<number>`cast(count(*) over() as integer)`,
    })
    .from(country)
    .leftJoin(region, eq(region.country_id, country.id))
    .leftJoin(packing, eq(packing.region_id, region.id))
    .where(and(...filters))
    .groupBy(country.id)
    .orderBy(country.deleted_at)
    .limit(ITEMS_PER_PAGE)
    .offset((page - 1) * ITEMS_PER_PAGE);

  const totalItems = rows[0]?.total_count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const countries = rows.map(({ total_count: _, ...rest }) => rest);

  return { countries, totalItems, totalPages };
};

export const restoreCountry = async (slug: string) => {
  const [restoredRecord] = await db
    .update(country)
    .set({ deleted_at: null, updated_at: new Date() })
    .where(and(eq(country.slug, slug), isNotNull(country.deleted_at)))
    .returning();

  return restoredRecord;
};
