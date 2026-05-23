import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, USER_ROLES } from "@/constants";

// --- Base Schemas ---

export const nameSchema = (t: TranslateFn) =>
  z
    .string({ error: t("name_required") })
    .trim()
    .min(3, { error: t("name_too_short") })
    .max(50, { error: t("name_too_long") })
    .regex(/^[a-zA-Z\s-']+$/, { error: t("name_format") });

export const passwordSchema = (t: TranslateFn) =>
  z
    .string({ error: t("password_required") })
    .min(8, { error: t("password_too_short") })
    .max(64, { error: t("password_too_long") })
    .regex(/[A-Z]/, { error: t("password_uppercase") })
    .regex(/[a-z]/, { error: t("password_lowercase") })
    .regex(/[0-9]/, { error: t("password_number") });

export const emailSchema = (t: TranslateFn) =>
  z
    .email({ error: t("email_invalid") })
    .min(5, { error: t("email_too_short") })
    .max(254, { error: t("email_too_long") });

export const ImageSchema = (t: TranslateFn) =>
  z
    .instanceof(File, { error: t("image_required") })
    .refine((file) => file.size !== 0, {
      error: t("image_required"),
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      error: t("too_large"),
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      error: t("wrong_type"),
    });

export const titleSchema = (t: TranslateFn) =>
  z
    .string({ error: t("title_required") })
    .trim()
    .min(5, { error: t("title_too_short") })
    .max(50, { error: t("title_too_long") });

export const descriptionSchema = (t: TranslateFn) =>
  z
    .string({ error: t("description_required") })
    .trim()
    .min(10, { error: t("description_too_short") })
    .max(2000, { error: t("description_too_long") });

// --- Composed Schemas ---

export const signinSchema = (t: TranslateFn) =>
  z.object({
    email: emailSchema(t),
    password: passwordSchema(t),
  });

export const signupSchema = (t: TranslateFn) =>
  z.object({
    name: nameSchema(t),
    email: emailSchema(t),
    password: passwordSchema(t),
  });

export const signupAdminSchema = (t: TranslateFn) =>
  signupSchema(t).extend({
    confirmPassword: passwordSchema(t),
    role: z.enum(Object.values(USER_ROLES)).default("user"),
  });

export const profileSchema = (t: TranslateFn) =>
  z.object({
    name: nameSchema(t),
    avatar: z.union([z.undefined(), ImageSchema(t)]),
  });

export const confirmPasswordSchema = (t: TranslateFn) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(1, { error: t("current_password_required") }),
      newPassword: passwordSchema(t),
      confirmPassword: passwordSchema(t),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      error: t("password_mismatch"),
      path: ["confirmPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      error: t("new_password_different"),
      path: ["new_password"],
    });

export const packingWaySchema = (t: TranslateFn) =>
  z.object({
    title: titleSchema(t),
    title_ar: titleSchema(t),
    description: descriptionSchema(t),
    description_ar: descriptionSchema(t),
    country: z.string({ error: t("country_required") }),
    category: z.string({ error: t("category_required") }),
    Image: ImageSchema(t),
  });

export const updatePackingSchema = (t: TranslateFn) =>
  z.object({
    id: z.number({ error: "ID is required" }),
    title: titleSchema(t),
    title_ar: titleSchema(t),
    description: descriptionSchema(t),
    description_ar: descriptionSchema(t),
    Image: z.union([z.undefined(), ImageSchema(t)]),
    category: z.string({ error: t("category_required") }),
  });

export const countrySchema = (t: TranslateFn) =>
  z.object({
    label_name: z
      .string({ error: t("label_name_required") })
      .trim()
      .min(3, { error: t("name_too_short") })
      .max(100, { error: t("name_too_long") }),
    account: z
      .string({ error: t("account_required") })
      .trim()
      .min(3, { error: t("name_too_short") })
      .max(100, { error: t("name_too_long") }),
    labels: z
      .string({ error: t("labels_required") })
      .trim()
      .min(2, { error: t("name_too_short") })
      .max(120, { error: t("name_too_long") }),
    country_name: z
      .string({ error: t("country_name_required") })
      .trim()
      .min(3, { error: t("name_too_short") })
      .max(50, { error: t("name_too_long") }),
    country_name_ar: z
      .string({ error: t("country_name_required") })
      .trim()
      .min(3, { error: t("name_too_short") })
      .max(50, { error: t("name_too_long") }),
    flag_url: z.union([
      ImageSchema(t),
      z.string({ error: t("image_required") }),
    ]),
  });

export const categorySchema = (t: TranslateFn) =>
  z.object({
    category: z.string({ error: t("category_required") }),
    category_ar: z.string({ error: t("category_required") }),
  });

export const forgotPasswordSchema = (t: TranslateFn) =>
  z.object({
    email: emailSchema(t),
  });

export const resetPasswordSchema = (t: TranslateFn) =>
  z
    .object({
      password: passwordSchema(t),
      confirmPassword: passwordSchema(t),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: t("password_mismatch"),
      path: ["confirmPassword"],
    });

// --- Admin Only (Static - No Translation needed usually) ---

export const roleUpdateSchema = (t: TranslateFn) =>
  z.object({
    userId: z.uuid(),
    newRole: z.enum(Object.values(USER_ROLES), { error: t("invalid_role") }),
  });

export const deleteUserSchema = z.object({
  userId: z.uuid(),
});

// --- API Entity Schemas ---

export const apiCountrySchema = (t: TranslateFn) =>
  z.object({
    name_en: z.string().min(1, t("name_en_required")),
    name_ar: z.string().min(1, t("name_ar_required")),
    flag_url: z.url(t("invalid_url")),
  });

export const apiRegionSchema = (t: TranslateFn) =>
  z.object({
    country_id: z.number().positive(t("country_id_required")),
    label_name_en: z.string().min(1, t("label_name_en_required")),
    label_name_ar: z.string().min(1, t("label_name_ar_required")),
    account: z.string().min(1, t("account_required")),
    labels: z.array(z.string()).min(1, t("labels_required")),
  });

export const apiCategorySchema = (t: TranslateFn) =>
  z.object({
    name_en: z.string().min(1, t("name_en_required")),
    name_ar: z.string().min(1, t("name_ar_required")),
  });

export const apiCategoryReorderSchema = (t: TranslateFn) =>
  z.array(
    z.object({
      id: z.number().positive(),
      sort_order: z.number().int(),
    }),
  );

export const apiPackingSchema = (t: TranslateFn) =>
  z.object({
    region_id: z.number().positive(t("region_id_required")),
    category_id: z.number().positive(t("category_id_required")),
    title_en: z.string().min(1, t("title_en_required")),
    title_ar: z.string().min(1, t("title_ar_required")),
    description_en: z.string().min(1, t("description_en_required")),
    description_ar: z.string().min(1, t("description_ar_required")),
    image_url: z.url(t("invalid_url")).optional().nullable(),
  });

export const apiProfileSchema = (t: TranslateFn) =>
  z.object({
    name: z.string().min(1, t("name_required")).optional(),
    image: z.url().optional().nullable(),
  });

export const apiBanUserSchema = (t: TranslateFn) =>
  z.object({
    reason: z.string().optional(),
    expiresIn: z.number().int().positive().optional(),
  });

