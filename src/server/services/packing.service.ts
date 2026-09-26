import { db } from "@/drizzle/db";
import {
  categories,
  country,
  packing,
  region,
} from "@/drizzle/schemas/packing.schema";
import { user } from "@/drizzle/schemas/auth-schema";
import {
  and,
  asc,
  desc,
  eq,
  ilike,
  isNotNull,
  isNull,
  or,
  sql,
  type InferInsertModel,
  type SQL,
} from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { ITEMS_PER_PAGE } from "@/constants";
import { logPackingHistory } from "./history.service";
import { getAllActiveCountries } from "./country.service";
import { getRegions } from "./region.service";
import { getCategories } from "./category.service";

type Actor = { id: string; name: string; email: string };
type PackingInput = Pick<
  InferInsertModel<typeof packing>,
  | "region_id"
  | "category_id"
  | "title_en"
  | "title_ar"
  | "description_en"
  | "description_ar"
  | "image_url"
>;
const updatedBy = alias(user, "packing_updated_by");
const deletedBy = alias(user, "packing_deleted_by");

const packingSelect = {
  id: packing.id,
  title_en: packing.title_en,
  title_ar: packing.title_ar,
  description_en: packing.description_en,
  description_ar: packing.description_ar,
  image_url: packing.image_url,
  region_id: region.id,
  region_name_en: region.label_name_en,
  region_name_ar: region.label_name_ar,
  region_slug: region.slug,
  country_id: country.id,
  country_name_en: country.name_en,
  country_name_ar: country.name_ar,
  country_slug: country.slug,
  country_flag_url: country.flag_url,
  category_id: categories.id,
  category_name_en: categories.name_en,
  category_name_ar: categories.name_ar,
  created_at: packing.created_at,
  updated_at: packing.updated_at,
  updated_by_name: updatedBy.name,
};

function pagingFilters({
  q,
  country_id,
  region_id,
  category_id,
  deleted,
}: {
  q?: string;
  country_id?: number;
  region_id?: number;
  category_id?: number;
  deleted: boolean;
}) {
  const filters: SQL[] = [
    deleted ? isNotNull(packing.deleted_at) : isNull(packing.deleted_at),
    isNull(region.deleted_at),
    isNull(country.deleted_at),
    isNull(categories.deleted_at),
  ];
  if (country_id) filters.push(eq(country.id, country_id));
  if (region_id) filters.push(eq(region.id, region_id));
  if (category_id) filters.push(eq(categories.id, category_id));
  if (q)
    filters.push(
      or(
        ilike(packing.title_en, `%${q}%`),
        ilike(packing.title_ar, `%${q}%`),
        ilike(packing.description_en, `%${q}%`),
        ilike(packing.description_ar, `%${q}%`),
        ilike(country.name_en, `%${q}%`),
        ilike(country.name_ar, `%${q}%`),
        ilike(region.label_name_en, `%${q}%`),
        ilike(region.label_name_ar, `%${q}%`),
      ) as SQL,
    );
  return filters;
}

export const getPackingWays = async (filters?: {
  region_id?: number;
  category_id?: number;
}) => {
  const conditions = [isNull(packing.deleted_at)];
  if (filters?.region_id)
    conditions.push(eq(packing.region_id, filters.region_id));
  if (filters?.category_id)
    conditions.push(eq(packing.category_id, filters.category_id));
  return db
    .select()
    .from(packing)
    .where(and(...conditions));
};

export const getPackingWaysPaginated = async ({
  q,
  country_id,
  region_id,
  category_id,
  currentPage = 1,
}: {
  q?: string;
  country_id?: number;
  region_id?: number;
  category_id?: number;
  currentPage?: number;
}) => {
  const page = Math.max(1, currentPage);
  const rows = await db
    .select({
      ...packingSelect,
      total_count: sql<number>`cast(count(*) over() as integer)`,
    })
    .from(packing)
    .innerJoin(region, eq(packing.region_id, region.id))
    .innerJoin(country, eq(region.country_id, country.id))
    .innerJoin(categories, eq(packing.category_id, categories.id))
    .leftJoin(updatedBy, eq(packing.updated_by_id, updatedBy.id))
    .where(
      and(
        ...pagingFilters({
          q,
          country_id,
          region_id,
          category_id,
          deleted: false,
        }),
      ),
    )
    .orderBy(desc(packing.updated_at), asc(packing.title_en))
    .limit(ITEMS_PER_PAGE)
    .offset((page - 1) * ITEMS_PER_PAGE);
  const totalItems = rows[0]?.total_count ?? 0;
  return {
    packingWays: rows.map(({ total_count, ...item }) => {
      void total_count;
      return item;
    }),
    totalItems,
    totalPages: Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE)),
  };
};

export const getDeletedPackingWays = async ({
  q,
  country_id,
  category_id,
  currentPage = 1,
}: {
  q?: string;
  country_id?: number;
  category_id?: number;
  currentPage?: number;
}) => {
  const page = Math.max(1, currentPage);
  const rows = await db
    .select({
      ...packingSelect,
      deleted_at: packing.deleted_at,
      deleted_by_name: deletedBy.name,
      deleted_by_email: deletedBy.email,
      total_count: sql<number>`cast(count(*) over() as integer)`,
    })
    .from(packing)
    .innerJoin(region, eq(packing.region_id, region.id))
    .innerJoin(country, eq(region.country_id, country.id))
    .innerJoin(categories, eq(packing.category_id, categories.id))
    .leftJoin(updatedBy, eq(packing.updated_by_id, updatedBy.id))
    .leftJoin(deletedBy, eq(packing.deleted_by_id, deletedBy.id))
    .where(and(...pagingFilters({ q, country_id, category_id, deleted: true })))
    .orderBy(desc(packing.deleted_at))
    .limit(ITEMS_PER_PAGE)
    .offset((page - 1) * ITEMS_PER_PAGE);
  const totalItems = rows[0]?.total_count ?? 0;
  return {
    packingWays: rows.map(({ total_count, ...item }) => {
      void total_count;
      return item;
    }),
    totalItems,
    totalPages: Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE)),
  };
};

export const getPackingWayById = async (id: string) => {
  const [item] = await db
    .select()
    .from(packing)
    .where(and(eq(packing.id, id), isNull(packing.deleted_at)));
  return item;
};

export const getPackingWayDetailById = async (id: string) => {
  const [item] = await db
    .select(packingSelect)
    .from(packing)
    .innerJoin(region, eq(packing.region_id, region.id))
    .innerJoin(country, eq(region.country_id, country.id))
    .innerJoin(categories, eq(packing.category_id, categories.id))
    .leftJoin(updatedBy, eq(packing.updated_by_id, updatedBy.id))
    .where(
      and(
        eq(packing.id, id),
        isNull(packing.deleted_at),
        isNull(region.deleted_at),
        isNull(country.deleted_at),
        isNull(categories.deleted_at),
      ),
    );
  return item;
};

async function assertParentRecords(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  regionId: number,
  categoryId: number,
) {
  const [[regionRecord], [categoryRecord]] = await Promise.all([
    tx
      .select()
      .from(region)
      .where(and(eq(region.id, regionId), isNull(region.deleted_at))),
    tx
      .select()
      .from(categories)
      .where(and(eq(categories.id, categoryId), isNull(categories.deleted_at))),
  ]);
  if (!regionRecord) throw new Error("Region not found");
  if (!categoryRecord) throw new Error("Category not found");
  return regionRecord;
}

export const createPackingWay = async (data: PackingInput, actor: Actor) =>
  db.transaction(async (tx) => {
    const regionRecord = await assertParentRecords(
      tx,
      data.region_id,
      data.category_id,
    );
    const now = new Date();

    const [created] = await tx
      .insert(packing)
      .values({
        ...data,
        created_by_id: actor.id,
        updated_by_id: actor.id,
        created_at: now,
        updated_at: now,
      })
      .returning();

    await logPackingHistory(
      {
        packing_id: created.id,
        region_id: created.region_id,
        country_id: regionRecord.country_id,
        category_id: created.category_id,
        action: "CREATE",
        changed_by_id: actor.id,
        changed_by_name: actor.name,
        changed_by_email: actor.email,
        snapshot_before: null,
        snapshot_after: created,
      },
      tx,
    );

    return created;
  });

export const updatePackingWay = async (
  id: string,
  data: PackingInput,
  actor: Actor,
) =>
  db.transaction(async (tx) => {
    const [existing] = await tx
      .select()
      .from(packing)
      .where(and(eq(packing.id, id), isNull(packing.deleted_at)));
    if (!existing) throw new Error("Packing way not found");

    const regionRecord = await assertParentRecords(
      tx,
      data.region_id,
      data.category_id,
    );

    const [updated] = await tx
      .update(packing)
      .set({ ...data, updated_at: new Date(), updated_by_id: actor.id })
      .where(and(eq(packing.id, id), isNull(packing.deleted_at)))
      .returning();

    if (!updated) throw new Error("Packing way not found");

    await logPackingHistory(
      {
        packing_id: updated.id,
        region_id: updated.region_id,
        country_id: regionRecord.country_id,
        category_id: updated.category_id,
        action: "UPDATE",
        changed_by_id: actor.id,
        changed_by_name: actor.name,
        changed_by_email: actor.email,
        snapshot_before: existing,
        snapshot_after: updated,
      },
      tx,
    );

    return updated;
  });

export const deletePackingWay = async (id: string, actor: Actor) =>
  db.transaction(async (tx) => {
    const [existing] = await tx
      .select()
      .from(packing)
      .innerJoin(region, eq(packing.region_id, region.id))
      .innerJoin(country, eq(region.country_id, country.id))
      .where(and(eq(packing.id, id), isNull(packing.deleted_at)));

    if (!existing) throw new Error("Packing way not found");

    const [deleted] = await tx
      .update(packing)
      .set({
        deleted_at: new Date(),
        updated_at: new Date(),
        updated_by_id: actor.id,
        deleted_by_id: actor.id,
      })
      .where(and(eq(packing.id, id), isNull(packing.deleted_at)))
      .returning();

    if (!deleted) throw new Error("Packing way not found");

    await logPackingHistory(
      {
        packing_id: deleted.id,
        region_id: deleted.region_id,
        country_id: existing.country.id,
        category_id: deleted.category_id,
        action: "DELETE",
        changed_by_id: actor.id,
        changed_by_name: actor.name,
        changed_by_email: actor.email,
        snapshot_before: existing.packing,
        snapshot_after: deleted,
      },
      tx,
    );

    return deleted;
  });

export const restorePackingWay = async (id: string, actor: Actor) =>
  db.transaction(async (tx) => {
    const [existing] = await tx
      .select()
      .from(packing)
      .innerJoin(region, eq(packing.region_id, region.id))
      .innerJoin(country, eq(region.country_id, country.id))
      .where(and(eq(packing.id, id), isNotNull(packing.deleted_at)));

    if (!existing) throw new Error("Packing way not found");

    const [restored] = await tx
      .update(packing)
      .set({
        deleted_at: null,
        deleted_by_id: null,
        updated_at: new Date(),
        updated_by_id: actor.id,
      })
      .where(eq(packing.id, id))
      .returning();

    if (!restored) throw new Error("Packing way not found");

    await logPackingHistory(
      {
        packing_id: restored.id,
        region_id: restored.region_id,
        country_id: existing.country.id,
        category_id: restored.category_id,
        action: "UPDATE",
        changed_by_id: actor.id,
        changed_by_name: actor.name,
        changed_by_email: actor.email,
        snapshot_before: existing.packing,
        snapshot_after: restored,
      },
      tx,
    );

    return restored;
  });

export const getPackingWayFormData = async (): Promise<PackingWayFormData> => {
  const [countries, regions, categories] = await Promise.all([
    getAllActiveCountries(),
    getRegions(),
    getCategories(),
  ]);

  const regionsByCountry: Record<number, RegionOption[]> = {};

  for (const r of regions) {
    (regionsByCountry[r.country_id] ??= []).push({
      id: r.id,
      label_name_en: r.label_name_en,
      label_name_ar: r.label_name_ar,
      account: r.account,
    });
  }

  return { countries, regionsByCountry, categories };
};
