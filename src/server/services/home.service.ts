import { db } from "@/drizzle/db";
import { count, isNull, eq, and, sql, desc } from "drizzle-orm";
import {
  country,
  region,
  categories,
  packing,
} from "@/drizzle/schemas/packing.schema";

export async function getHomeStats() {
  const [[countryCount], [regionCount], [categoriesCount], [packingCount]] =
    await Promise.all([
      db
        .select({ value: count() })
        .from(country)
        .where(isNull(country.deleted_at)),
      db
        .select({ value: count() })
        .from(region)
        .where(isNull(region.deleted_at)),
      db
        .select({ value: count() })
        .from(categories)
        .where(isNull(categories.deleted_at)),
      db
        .select({ value: count() })
        .from(packing)
        .where(isNull(packing.deleted_at)),
    ]);

  return {
    countries: countryCount.value,
    regions: regionCount.value,
    categories: categoriesCount.value,
    guidelines: packingCount.value,
  };
}

export async function getFeaturedCountries() {
  return db
    .select({
      id: country.id,
      slug: country.slug,
      name_en: country.name_en,
      name_ar: country.name_ar,
      flag_url: country.flag_url,
      region_count: sql<number>`cast(count(distinct ${region.id}) as integer)`,
      guidelines_count: sql<number>`cast(count(distinct ${packing.id}) as integer)`,
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
    .where(isNull(country.deleted_at))
    .groupBy(country.id)
    .orderBy(desc(sql<number>`count(distinct ${packing.id})`))
    .limit(8);
}
