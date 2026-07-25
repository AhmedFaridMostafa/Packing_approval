import { db } from "@/drizzle/db";
import { count, isNull, eq, desc } from "drizzle-orm";
import {
  country,
  region,
  categories,
  packing,
  packingHistory,
} from "@/drizzle/schemas/packing.schema";
import { auth } from "@/lib/auth/auth";

export async function getAdminDashboardData(headers: Headers) {
  const [
    [countryCount],
    [regionCount],
    [categoriesCount],
    [packingCount],
    recentHistoryRows,
    usersResponse,
  ] = await Promise.all([
    db
      .select({ value: count() })
      .from(country)
      .where(isNull(country.deleted_at)),
    db.select({ value: count() }).from(region).where(isNull(region.deleted_at)),
    db
      .select({ value: count() })
      .from(categories)
      .where(isNull(categories.deleted_at)),
    db
      .select({ value: count() })
      .from(packing)
      .where(isNull(packing.deleted_at)),
    db
      .select({
        id: packingHistory.id,
        action: packingHistory.action,
        changed_by_name: packingHistory.changed_by_name,
        changed_by_email: packingHistory.changed_by_email,
        change_timestamp: packingHistory.change_timestamp,
        country_name_en: country.name_en,
        country_name_ar: country.name_ar,
        region_name_en: region.label_name_en,
        region_name_ar: region.label_name_ar,
        category_name_en: categories.name_en,
        category_name_ar: categories.name_ar,
        snapshot_before: packingHistory.snapshot_before,
        snapshot_after: packingHistory.snapshot_after,
      })
      .from(packingHistory)
      .leftJoin(country, eq(packingHistory.country_id, country.id))
      .leftJoin(region, eq(packingHistory.region_id, region.id))
      .leftJoin(categories, eq(packingHistory.category_id, categories.id))
      .orderBy(desc(packingHistory.change_timestamp))
      .limit(5),
    auth.api
      .listUsers({
        headers,
        query: { limit: 1 },
      })
      .catch((error) => {
        console.error("getAdminDashboardData: listUsers failed", error);
        return { total: 0 };
      }),
  ]);

  const stats: AdminDashboardStats = {
    countries: countryCount.value,
    regions: regionCount.value,
    categories: categoriesCount.value,
    guidelines: packingCount.value,
    users: usersResponse.total ?? 0,
  };

  const recentHistory: RecentHistoryItem[] = recentHistoryRows.map((row) => ({
    id: row.id,
    action: row.action,
    changed_by_name: row.changed_by_name,
    changed_by_email: row.changed_by_email,
    change_timestamp: row.change_timestamp.toISOString(),
    country_name_en: row.country_name_en!,
    country_name_ar: row.country_name_ar!,
    region_name_en: row.region_name_en!,
    region_name_ar: row.region_name_ar!,
    category_name_en: row.category_name_en!,
    category_name_ar: row.category_name_ar!,
    title_en: (row.snapshot_after?.title_en ??
      row.snapshot_before?.title_en) as string,
    title_ar: (row.snapshot_after?.title_ar ??
      row.snapshot_before?.title_ar) as string,
  }));

  return {
    stats,
    recentHistory,
  };
}
