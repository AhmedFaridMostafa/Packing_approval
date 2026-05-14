import {
  pgTable,
  pgEnum,
  serial,
  integer,
  text,
  jsonb,
  timestamp,
  uuid,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

import { user } from "./auth-schema";

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export const packingActionEnum = pgEnum("packing_action", [
  "CREATE",
  "UPDATE",
  "DELETE",
]);

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const timestamps = {
  created_at: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  updated_at: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  deleted_at: timestamp("deleted_at", {
    mode: "date",
    withTimezone: true,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// COUNTRY
// ─────────────────────────────────────────────────────────────────────────────

export const country = pgTable(
  "country",
  {
    id: serial("id").primaryKey(),

    slug: text("slug").notNull().unique(),

    name_en: text("name_en").notNull(),
    name_ar: text("name_ar").notNull(),

    flag_url: text("flag_url"),

    ...timestamps,
  },
  (table) => [
    index("country_slug_idx").on(table.slug),
    index("country_deleted_at_idx").on(table.deleted_at),
  ],
);

// ─────────────────────────────────────────────────────────────────────────────
// REGION
// ─────────────────────────────────────────────────────────────────────────────

export const region = pgTable(
  "region",
  {
    id: serial("id").primaryKey(),

    country_id: integer("country_id")
      .notNull()
      .references(() => country.id, { onDelete: "restrict" }),

    slug: text("slug").notNull(),

    label_name_en: text("label_name_en"),
    label_name_ar: text("label_name_ar"),

    account: text("account").notNull(),
    labels: text("labels").array().notNull().default([]),

    ...timestamps,
  },
  (table) => [
    uniqueIndex("region_country_slug_unique").on(table.country_id, table.slug),
    index("region_country_id_idx").on(table.country_id),
    index("region_slug_idx").on(table.slug),
    index("region_deleted_at_idx").on(table.deleted_at),
  ],
);

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),

    name_en: text("name_en").notNull().unique(),
    name_ar: text("name_ar").notNull().unique(),

    sort_order: integer("sort_order").notNull(),

    ...timestamps,
  },
  (table) => [
    index("categories_sort_order_idx").on(table.sort_order),
    index("categories_deleted_at_idx").on(table.deleted_at),
  ],
);

// ─────────────────────────────────────────────────────────────────────────────
// PACKING
// ─────────────────────────────────────────────────────────────────────────────

export const packing = pgTable(
  "packing",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    region_id: integer("region_id")
      .notNull()
      .references(() => region.id, { onDelete: "restrict" }),

    category_id: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),

    title_en: text("title_en").notNull(),
    title_ar: text("title_ar").notNull(),

    description_en: text("description_en"),
    description_ar: text("description_ar"),

    image_url: text("image_url"),

    // Ownership tracking — SET NULL if the admin account is later deleted
    created_by_id: text("created_by_id").references(() => user.id, {
      onDelete: "set null",
    }),

    updated_by_id: text("updated_by_id").references(() => user.id, {
      onDelete: "set null",
    }),

    deleted_by_id: text("deleted_by_id").references(() => user.id, {
      onDelete: "set null",
    }),

    ...timestamps,
  },
  (table) => [
    index("packing_region_id_idx").on(table.region_id),
    index("packing_category_id_idx").on(table.category_id),
    index("packing_deleted_at_idx").on(table.deleted_at),
    index("packing_created_by_idx").on(table.created_by_id),
    index("packing_updated_by_idx").on(table.updated_by_id),
  ],
);

// ─────────────────────────────────────────────────────────────────────────────
// PACKING HISTORY (AUDIT LOG)
// ─────────────────────────────────────────────────────────────────────────────

export const packingHistory = pgTable(
  "packing_history",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    packing_id: uuid("packing_id").references(() => packing.id, {
      onDelete: "set null",
    }),

    region_id: integer("region_id")
      .notNull()
      .references(() => region.id, { onDelete: "restrict" }),

    country_id: integer("country_id")
      .notNull()
      .references(() => country.id, { onDelete: "restrict" }),

    category_id: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),

    action: packingActionEnum("action").notNull(),

    changed_by_id: text("changed_by_id").references(() => user.id, {
      onDelete: "set null",
    }),

    changed_by_name: text("changed_by_name").notNull(),
    changed_by_email: text("changed_by_email").notNull(),

    change_timestamp: timestamp("change_timestamp", {
      mode: "date",
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    snapshot_before: jsonb("snapshot_before"),
    snapshot_after: jsonb("snapshot_after"),
  },
  (table) => [
    index("history_packing_id_idx").on(table.packing_id),
    index("history_region_id_idx").on(table.region_id),
    index("history_country_id_idx").on(table.country_id),
    index("history_category_id_idx").on(table.category_id),
    index("history_changed_by_id_idx").on(table.changed_by_id),
    index("history_timestamp_idx").on(table.change_timestamp),
  ],
);

// ─────────────────────────────────────────────────────────────────────────────
// RELATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const countryRelations = relations(country, ({ many }) => ({
  regions: many(region),
  history: many(packingHistory),
}));

export const regionRelations = relations(region, ({ one, many }) => ({
  country: one(country, {
    fields: [region.country_id],
    references: [country.id],
  }),
  packing: many(packing),
  history: many(packingHistory),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  packing: many(packing),
  history: many(packingHistory),
}));

export const packingRelations = relations(packing, ({ one, many }) => ({
  region: one(region, {
    fields: [packing.region_id],
    references: [region.id],
  }),
  category: one(categories, {
    fields: [packing.category_id],
    references: [categories.id],
  }),

  createdBy: one(user, {
    fields: [packing.created_by_id],
    references: [user.id],
    relationName: "packing_created_by",
  }),
  updatedBy: one(user, {
    fields: [packing.updated_by_id],
    references: [user.id],
    relationName: "packing_updated_by",
  }),
  deletedBy: one(user, {
    fields: [packing.deleted_by_id],
    references: [user.id],
    relationName: "packing_deleted_by",
  }),

  history: many(packingHistory),
}));

export const packingHistoryRelations = relations(packingHistory, ({ one }) => ({
  packing: one(packing, {
    fields: [packingHistory.packing_id],
    references: [packing.id],
  }),
  region: one(region, {
    fields: [packingHistory.region_id],
    references: [region.id],
  }),
  country: one(country, {
    fields: [packingHistory.country_id],
    references: [country.id],
  }),
  category: one(categories, {
    fields: [packingHistory.category_id],
    references: [categories.id],
  }),
  changedBy: one(user, {
    fields: [packingHistory.changed_by_id],
    references: [user.id],
    relationName: "history_changed_by",
  }),
}));
