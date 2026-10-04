import { db } from "@/drizzle/db";
import {
  packingHistory,
  country,
  region,
  categories,
  type PackingRow,
} from "@/drizzle/schemas/packing.schema";
import { and, desc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { ITEMS_PER_PAGE } from "@/constants";

type Tx = Parameters<Parameters<(typeof db)["transaction"]>[0]>[0];
export type DbOrTx = typeof db | Tx;

export const logPackingHistory = async (
  data: {
    packing_id: string | null;
    region_id: number;
    country_id: number;
    category_id: number;
    action: "CREATE" | "UPDATE" | "DELETE";
    changed_by_id: string | null;
    changed_by_name: string;
    changed_by_email: string;
    snapshot_before: PackingRow | null;
    snapshot_after: PackingRow | null;
  },
  tx: DbOrTx = db, // ← defaults to db, callers pass their tx
) => {
  const [historyRecord] = await tx
    .insert(packingHistory)
    .values({ ...data, change_timestamp: new Date() })
    .returning();

  return historyRecord;
};

export type PackingHistoryAction = "CREATE" | "UPDATE" | "DELETE";

const titleEn = sql<string | null>`coalesce(${packingHistory.snapshot_after}->>'title_en', ${packingHistory.snapshot_before}->>'title_en')`;
const titleAr = sql<string | null>`coalesce(${packingHistory.snapshot_after}->>'title_ar', ${packingHistory.snapshot_before}->>'title_ar')`;

export const getPackingHistoryPaginated = async ({
  q,
  country_id,
  region_id,
  category_id,
  action,
  currentPage = 1,
}: {
  q?: string;
  country_id?: number;
  region_id?: number;
  category_id?: number;
  action?: PackingHistoryAction;
  currentPage?: number;
}) => {
  const page = Math.max(1, currentPage);
  const filters: SQL[] = [];
  if (country_id) filters.push(eq(country.id, country_id));
  if (region_id) filters.push(eq(region.id, region_id));
  if (category_id) filters.push(eq(categories.id, category_id));
  if (action) filters.push(eq(packingHistory.action, action));
  if (q)
    filters.push(
      or(
        ilike(titleEn, `%${q}%`),
        ilike(titleAr, `%${q}%`),
        ilike(packingHistory.changed_by_name, `%${q}%`),
        ilike(packingHistory.changed_by_email, `%${q}%`),
      ) as SQL,
    );

  const rows = await db
    .select({
      id: packingHistory.id,
      action: packingHistory.action,
      packing_id: packingHistory.packing_id,
      changed_by_name: packingHistory.changed_by_name,
      changed_by_email: packingHistory.changed_by_email,
      change_timestamp: packingHistory.change_timestamp,
      country_id: country.id,
      country_name_en: country.name_en,
      country_name_ar: country.name_ar,
      region_id: region.id,
      region_name_en: region.label_name_en,
      region_name_ar: region.label_name_ar,
      category_id: categories.id,
      category_name_en: categories.name_en,
      category_name_ar: categories.name_ar,
      title_en: titleEn,
      title_ar: titleAr,
      snapshot_before: packingHistory.snapshot_before,
      snapshot_after: packingHistory.snapshot_after,
      total_count: sql<number>`cast(count(*) over() as integer)`,
    })
    .from(packingHistory)
    .innerJoin(country, eq(packingHistory.country_id, country.id))
    .innerJoin(region, eq(packingHistory.region_id, region.id))
    .innerJoin(categories, eq(packingHistory.category_id, categories.id))
    .where(filters.length > 0 ? and(...filters) : undefined)
    .orderBy(desc(packingHistory.change_timestamp))
    .limit(ITEMS_PER_PAGE)
    .offset((page - 1) * ITEMS_PER_PAGE);

  const totalItems = rows[0]?.total_count ?? 0;
  return {
    history: rows.map(({ total_count, ...item }) => {
      void total_count;
      return item;
    }),
    totalItems,
    totalPages: Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE)),
  };
};
