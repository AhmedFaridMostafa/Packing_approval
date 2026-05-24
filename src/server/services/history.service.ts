import { db } from "@/drizzle/db";
import {
  packingHistory,
  type PackingRow,
} from "@/drizzle/schemas/packing.schema";
import { eq, desc, and, SQL } from "drizzle-orm";
import { MAX_PAGINATION_LIMIT } from "@/constants";

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

export const getPackingHistory = async (params: {
  packing_id?: string;
  region_id?: number;
  country_id?: number;
  category_id?: number;
  action?: "CREATE" | "UPDATE" | "DELETE";
  page?: number;
  limit?: number;
}) => {
  const page = Math.max(params.page || 1, 1);
  const limit = Math.min(Math.max(params.limit || 50, 1), MAX_PAGINATION_LIMIT);
  const offset = (page - 1) * limit;

  const filters: SQL[] = [];
  if (params.packing_id)
    filters.push(eq(packingHistory.packing_id, params.packing_id));
  if (params.region_id)
    filters.push(eq(packingHistory.region_id, params.region_id));
  if (params.country_id)
    filters.push(eq(packingHistory.country_id, params.country_id));
  if (params.category_id)
    filters.push(eq(packingHistory.category_id, params.category_id));
  if (params.action) filters.push(eq(packingHistory.action, params.action));

  return await db
    .select()
    .from(packingHistory)
    .where(filters.length > 0 ? and(...filters) : undefined)
    .orderBy(desc(packingHistory.change_timestamp))
    .limit(limit)
    .offset(offset);
};
