import { z } from "zod";
import type { _Translator } from "next-intl";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  USER_REMOVED_MARKER,
  USER_ROLES,
} from "@/constants";

// --- Base Schemas ---

export const nameSchema = (t: _Translator) =>
  z
    .string({ error: t("name.required") })
    .trim()
    .min(3, { error: t("name.tooShort") })
    .max(50, { error: t("name.tooLong") })
    .regex(/^[\p{L}\p{M}\s'-]+$/u, { error: t("name.format") });

export const passwordSchema = (t: _Translator) =>
  z
    .string({ error: t("password.required") })
    .min(8, { error: t("password.tooShort") })
    .max(64, { error: t("password.tooLong") })
    .regex(/[A-Z]/, { error: t("password.uppercase") })
    .regex(/[a-z]/, { error: t("password.lowercase") })
    .regex(/[0-9]/, { error: t("password.number") });

export const emailSchema = (t: _Translator) =>
  z
    .email({ error: t("email.invalid") })
    .min(5, { error: t("email.tooShort") })
    .max(254, { error: t("email.tooLong") });

export const ImageSchema = (t: _Translator) =>
  z
    .file({
      error: t("image.required"),
    })
    .min(1, { error: t("image.required") })
    .max(MAX_FILE_SIZE, { error: t("image.maxSize") })
    .mime(ACCEPTED_IMAGE_TYPES, { error: t("image.wrongType") });

export const titleSchema = (t: _Translator) =>
  z
    .string({ error: t("title.required") })
    .trim()
    .min(5, { error: t("title.tooShort") })
    .max(50, { error: t("title.tooLong") });

export const descriptionSchema = (t: _Translator) =>
  z
    .string({ error: t("description.required") })
    .trim()
    .min(10, { error: t("description.tooShort") })
    .max(2000, { error: t("description.tooLong") });

// --- Composed Schemas ---

export const signinSchema = (t: _Translator) =>
  z.object({
    email: emailSchema(t),
    password: z
      .string({ error: t("password.required") })
      .min(8, { error: t("password.tooShort") })
      .max(64, { error: t("password.tooLong") }),
  });

export const signupSchema = (t: _Translator) =>
  z.object({
    name: nameSchema(t),
    email: emailSchema(t),
    password: passwordSchema(t),
  });

export const signupAdminSchema = (t: _Translator) =>
  signupSchema(t)
    .extend({
      confirmPassword: passwordSchema(t),
      role: z.enum(USER_ROLES).default("user"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: t("password.mismatch"),
      path: ["confirmPassword"],
    });

export const apiAdminCreateUserSchema = (t: _Translator) =>
  signupAdminSchema(t);

export const profileSchema = (t: _Translator) =>
  z.object({
    name: nameSchema(t),
    avatar: z.union([z.undefined(), ImageSchema(t)]),
  });

export const confirmPasswordSchema = (t: _Translator) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(1, { error: t("password.currentRequired") }),
      newPassword: passwordSchema(t),
      confirmPassword: passwordSchema(t),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      error: t("password.mismatch"),
      path: ["confirmPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      error: t("password.mustDiffer"),
      path: ["newPassword"],
    });

export const categorySchema = (t: _Translator) =>
  z.object({
    category: z.string({ error: t("category.required") }),
    category_ar: z.string({ error: t("category.required") }),
  });

export const forgotPasswordSchema = (t: _Translator) =>
  z.object({
    email: emailSchema(t),
  });

export const resetPasswordSchema = (t: _Translator) =>
  z
    .object({
      password: passwordSchema(t),
      confirmPassword: passwordSchema(t),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: t("password.mismatch"),
      path: ["confirmPassword"],
    });

// --- Admin Only (Static - No Translation needed usually) ---

export const roleUpdateSchema = (t: _Translator) =>
  z.object({
    userId: z.string().min(1),
    newRole: z.enum(USER_ROLES, { error: t("role.invalid") }),
  });

// --- API Entity Schemas ---

export const apiCountrySchema = (t: _Translator, tApi: _Translator = t) =>
  z.object({
    slug: slugSchema(tApi).optional(),
    name_en: z.string().min(1, t("nameEn.required")),
    name_ar: z.string().min(1, t("nameAr.required")),
    flag_url: z.union([z.url(t("url.invalid")), z.literal("")]).optional(),
    image_file: ImageSchema(t).optional(),
  });

export const apiRegionSchema = (t: _Translator) =>
  z.object({
    country_id: z.number().positive(t("countryId.required")),
    label_name_en: z.string().min(1, t("labelNameEn.required")),
    label_name_ar: z.string().min(1, t("labelNameAr.required")),
    account: z.string().min(1, t("account.required")),
    labels: z.array(z.string()).min(1, t("labels.required")),
  });

export const regionFormSchema = (t: _Translator) =>
  z.object({
    country_id: z
      .string({ error: t("countryId.required") })
      .min(1, { error: t("countryId.required") }),
    label_name_en: z
      .string({ error: t("labelNameEn.required") })
      .trim()
      .min(1, { error: t("labelNameEn.required") })
      .max(100, { error: t("name.tooLong") }),
    label_name_ar: z
      .string({ error: t("labelNameAr.required") })
      .trim()
      .min(1, { error: t("labelNameAr.required") })
      .max(100, { error: t("name.tooLong") }),
    account: z
      .string({ error: t("account.required") })
      .trim()
      .min(1, { error: t("account.required") })
      .max(100, { error: t("name.tooLong") }),
    labels: z
      .string({ error: t("labels.required") })
      .trim()
      .min(1, { error: t("labels.required") })
      .max(300, { error: t("name.tooLong") }),
  });

export const apiCategorySchema = (t: _Translator) =>
  z.object({
    name_en: z.string().min(1, t("nameEn.required")),
    name_ar: z.string().min(1, t("nameAr.required")),
  });

export const categoryFormSchema = (t: _Translator) =>
  z.object({
    name_en: z
      .string({ error: t("nameEn.required") })
      .trim()
      .min(1, { error: t("nameEn.required") })
      .max(100, { error: t("name.tooLong") }),
    name_ar: z
      .string({ error: t("nameAr.required") })
      .trim()
      .min(1, { error: t("nameAr.required") })
      .max(100, { error: t("name.tooLong") }),
  });

export const apiCategoryReorderSchema = (t: _Translator) =>
  z.array(
    z.object({
      id: z.number().positive({ error: t("categoryId.required") }),
      sort_order: z.number().int({ error: t("sortOrder.invalid") }),
    }),
  );

export const apiPackingSchema = (t: _Translator) =>
  z.object({
    region_id: z.number().positive(t("regionId.required")),
    category_id: z.number().positive(t("categoryId.required")),
    title_en: z.string().min(1, t("titleEn.required")),
    title_ar: z.string().min(1, t("titleAr.required")),
    description_en: z
      .string()
      .min(1, t("descriptionEn.required"))
      .optional()
      .nullable(),
    description_ar: z
      .string()
      .min(1, t("descriptionAr.required"))
      .optional()
      .nullable(),
    image_url: z.url(t("url.invalid")).optional().nullable(),
  });

export const packingWayFormSchema = (t: _Translator) =>
  z.object({
    country_id: z.string().min(1, t("countryId.required")),
    region_id: z.string().min(1, t("regionId.required")),
    category_id: z.string().min(1, t("categoryId.required")),
    title_en: titleSchema(t),
    title_ar: titleSchema(t),
    description_en: z.string().min(1, t("descriptionEn.required")).optional(),
    description_ar: z.string().min(1, t("descriptionAr.required")).optional(),
    image: z.union([z.instanceof(File), z.undefined()]),
  });

export const apiProfileSchema = (t: _Translator) =>
  z.object({
    name: z.string().min(1, t("name.required")).optional(),
    image: z.url().optional().nullable(),
  });

export const apiBanUserSchema = (t: _Translator) =>
  z.object({
    reason: z
      .string()
      .max(500, { error: t("banReason.tooLong") })
      .refine((reason) => reason !== USER_REMOVED_MARKER, {
        error: t("banReason.invalid"),
      })
      .optional(),
    expiresIn: z
      .number()
      .int()
      .positive({ error: t("banExpiresIn.invalid") })
      .optional(),
  });

export const slugSchema = (t: _Translator) =>
  z.string().min(1, t("notFound")).trim();

export const countryParamsSchema = (t: _Translator) =>
  z.object({
    countrySlug: slugSchema(t),
  });

export const regionParamsSchema = (t: _Translator) =>
  z.object({
    countrySlug: slugSchema(t),
    regionSlug: slugSchema(t),
  });

export const regionsParamsSchema = (t: _Translator) =>
  z.object({
    searchQuery: z.string().trim().optional(),
    currentPage: z.coerce
      .number()
      .int()
      .positive({ error: t("page.invalid") })
      .optional()
      .default(1),
  });
