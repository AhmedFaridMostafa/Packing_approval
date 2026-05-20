import { db } from "@/drizzle/db";
import { packingHistory } from "@/drizzle/schemas/packing.schema";
import { eq, desc, and, SQL } from "drizzle-orm";
import { MAX_PAGINATION_LIMIT } from "@/constants";

export const logPackingHistory = async (data: {
  packing_id: string | null;
  region_id: number;
  country_id: number;
  category_id: number;
  action: "CREATE" | "UPDATE" | "DELETE";
  changed_by_id: string | null;
  changed_by_name: string;
  changed_by_email: string;
  snapshot_before: any | null;
  snapshot_after: any | null;
}) => {
  const [historyRecord] = await db
    .insert(packingHistory)
    .values({
      packing_id: data.packing_id,
      region_id: data.region_id,
      country_id: data.country_id,
      category_id: data.category_id,
      action: data.action,
      changed_by_id: data.changed_by_id,
      changed_by_name: data.changed_by_name,
      changed_by_email: data.changed_by_email,
      change_timestamp: new Date(),
      snapshot_before: data.snapshot_before,
      snapshot_after: data.snapshot_after,
    })
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

  if (params.packing_id) filters.push(eq(packingHistory.packing_id, params.packing_id));
  if (params.region_id) filters.push(eq(packingHistory.region_id, params.region_id));
  if (params.country_id) filters.push(eq(packingHistory.country_id, params.country_id));
  if (params.category_id) filters.push(eq(packingHistory.category_id, params.category_id));
  if (params.action) filters.push(eq(packingHistory.action, params.action));

  const whereClause = filters.length > 0 ? and(...filters) : undefined;

  const data = await db
    .select()
    .from(packingHistory)
    .where(whereClause)
    .orderBy(desc(packingHistory.change_timestamp))
    .limit(limit)
    .offset(offset);

  return data;
};
