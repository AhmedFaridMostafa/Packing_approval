import { db } from "@/drizzle/db";
import { country } from "@/drizzle/schemas/packing.schema";
import slugify from "slugify";
import { isNull } from "drizzle-orm";

export const getCountries = async () => {
  return await db.select().from(country).where(isNull(country.deleted_at));
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
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning();

  return newCountry;
};
