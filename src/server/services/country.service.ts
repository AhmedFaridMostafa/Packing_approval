import { db } from "@/drizzle/db";
import { country, region, packing } from "@/drizzle/schemas/packing.schema";
import slugify from "slugify";
import { and, eq, ilike, isNull, or, sql, type SQL } from "drizzle-orm";
import { ITEMS_PER_PAGE } from "@/constants";

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
