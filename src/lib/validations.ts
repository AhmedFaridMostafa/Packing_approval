import { Lang } from "@/i18n.config";
import { z } from "zod";
const massages = {
  ar: {
    nameRequired: "الاسم مطلوب",
    nameTooShort: "يجب أن يكون الاسم 3 أحرف على الأقل",
    nameTooLong: "يجب ألا يتجاوز الاسم 50 حرفًا",
    nameFormat:
      "يمكن أن يحتوي الاسم على أحرف ومسافات وشرطات وعلامات اقتباس فقط",
    passwordRequired: "كلمة المرور مطلوبة",
    passwordTooShort: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
    passwordTooLong: "يجب ألا تتجاوز كلمة المرور 64 حرفًا",
    passwordUppercase: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل",
    passwordLowercase: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل",
    passwordNumber: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل",
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صالح",
    emailTooShort: "يجب أن يكون البريد الإلكتروني 5 أحرف على الأقل",
    emailTooLong: "يجب ألا يتجاوز البريد الإلكتروني 254 حرفًا",
    imageRequired: "يرجى تحميل صورة",
    imageTooLarge: "يجب أن يكون حجم الملف أقل من 5 ميجابايت",
    imageFormat: "يجب أن يكون الملف بتنسيق JPEG أو PNG أو WEBP",
    titleRequired: "العنوان مطلوب",
    titleTooShort: "يجب أن يكون العنوان 5 أحرف على الأقل",
    titleTooLong: "يجب ألا يتجاوز العنوان 50 حرفًا",
    descriptionRequired: "الوصف مطلوب",
    descriptionTooShort: "يجب أن يكون الوصف 10 أحرف على الأقل",
    descriptionTooLong: "يجب ألا يتجاوز الوصف 2000 حرف",
    passwordMismatch: "كلمات المرور غير متطابقة",
    currentPasswordRequired: "كلمة المرور الحالية مطلوبة",
    newPasswordDifferent:
      "يجب أن تكون كلمة المرور الجديدة مختلفة عن كلمة المرور الحالية",
    formErrors: "يرجى تصحيح الأخطاء في النموذج",
    countryRequired: "الدولة مطلوبة",
    categoryRequired: "الفئة مطلوبة",
    labelNameRequired: "اسم التصنيف مطلوب",
    accountRequired: "الحساب مطلوب",
    labelsRequired: "العلامات مطلوبة",
    countryNameRequired: "اسم الدولة مطلوب",
    resetEmailSent:
      "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
    resetTokenInvalid:
      "رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية",
    passwordResetSuccess: "تم إعادة تعيين كلمة المرور بنجاح",
    passwordResetFailed: "فشل في إعادة تعيين كلمة المرور",
    checkYourEmail: "يرجى التحقق من بريدك الإلكتروني",
    tokenRequired: "رابط إعادة التعيين غير صالح أو منتهي الصلاحية",
  },
  en: {
    nameRequired: "Name is required",
    nameTooShort: "Name must be at least 3 characters",
    nameTooLong: "Name must not exceed 50 characters",
    nameFormat:
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    passwordRequired: "Password is required",
    passwordTooShort: "Password must be at least 8 characters long",
    passwordTooLong: "Password must not exceed 64 characters",
    passwordUppercase: "Password must contain at least one uppercase letter",
    passwordLowercase: "Password must contain at least one lowercase letter",
    passwordNumber: "Password must contain at least one number",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    emailTooShort: "Email must be at least 5 characters",
    emailTooLong: "Email must not exceed 254 characters",
    imageRequired: "Please upload an image",
    imageTooLarge: "File size must be less than 5MB",
    imageFormat: "File must be JPEG, PNG, or WEBP format",
    titleRequired: "Title is required",
    titleTooShort: "Title must be at least 5 characters",
    titleTooLong: "Title must not exceed 50 characters",
    descriptionRequired: "Description is required",
    descriptionTooShort: "Description must be at least 10 characters",
    descriptionTooLong: "Description must not exceed 2000 characters",
    passwordMismatch: "Passwords don't match",
    currentPasswordRequired: "Current password is required",
    newPasswordDifferent:
      "New password must be different from current password",
    formErrors: "Please fix the errors in the form",
    countryRequired: "Country is required",
    categoryRequired: "Category is required",
    labelNameRequired: "Label name is required",
    accountRequired: "Account is required",
    labelsRequired: "Labels are required",
    countryNameRequired: "Country name is required",
    resetEmailSent: "Password reset link has been sent to your email",
    resetTokenInvalid: "Invalid or expired password reset link",
    passwordResetSuccess: "Password reset successfully",
    passwordResetFailed: "Failed to reset password",
    checkYourEmail: "Please check your email",
    tokenRequired: "Invalid or expired reset link",
  },
};

type MessageKeys = keyof (typeof massages)["en"];

const getMessage = (lang: Lang, key: MessageKeys): string => {
  return massages[lang]?.[key];
};

export const nameSchema = (lang: Lang) =>
  z
    .string({ required_error: getMessage(lang, "nameRequired") })
    .trim()
    .min(3, getMessage(lang, "nameTooShort"))
    .max(50, getMessage(lang, "nameTooLong"))
    .regex(/^[a-zA-Z\s-']+$/, getMessage(lang, "nameFormat"));

export const passwordSchema = (lang: Lang) =>
  z
    .string({ required_error: getMessage(lang, "passwordRequired") })
    .min(8, getMessage(lang, "passwordTooShort"))
    .max(64, getMessage(lang, "passwordTooLong"))
    .regex(/[A-Z]/, getMessage(lang, "passwordUppercase"))
    .regex(/[a-z]/, getMessage(lang, "passwordLowercase"))
    .regex(/[0-9]/, getMessage(lang, "passwordNumber"));

export const emailSchema = (lang: Lang) =>
  z
    .string({ required_error: getMessage(lang, "emailRequired") })
    .trim()
    .email(getMessage(lang, "emailInvalid"))
    .min(5, getMessage(lang, "emailTooShort"))
    .max(254, getMessage(lang, "emailTooLong"));

export const ImageSchema = (lang: Lang) =>
  z
    .instanceof(File, { message: "Must be a valid file" })
    .refine((file) => file.size !== 0, getMessage(lang, "imageRequired"))
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      getMessage(lang, "imageTooLarge"),
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      getMessage(lang, "imageFormat"),
    );

export const titleSchema = (lang: Lang) =>
  z
    .string({ required_error: getMessage(lang, "titleRequired") })
    .trim()
    .min(5, getMessage(lang, "titleTooShort"))
    .max(50, getMessage(lang, "titleTooLong"));

export const descriptionSchema = (lang: Lang) =>
  z
    .string({ required_error: getMessage(lang, "descriptionRequired") })
    .trim()
    .min(10, getMessage(lang, "descriptionTooShort"))
    .max(2000, getMessage(lang, "descriptionTooLong"));

// Composed schemas
export const confirmPasswordSchema = (lang: Lang) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(1, getMessage(lang, "currentPasswordRequired")),
      newPassword: passwordSchema(lang),
      confirmPassword: passwordSchema(lang),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: getMessage(lang, "passwordMismatch"),
      path: ["confirmPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: getMessage(lang, "newPasswordDifferent"),
      path: ["newPassword"],
    });

export const profileSchema = (lang: Lang) =>
  z.object({
    name: nameSchema(lang),
    avatar: z.union([z.undefined(), ImageSchema(lang)]),
  });

export const loginSchema = (lang: Lang) =>
  z.object({
    email: emailSchema(lang),
    password: passwordSchema(lang),
  });

export const signupSchema = (lang: Lang) =>
  z
    .object({
      full_name: nameSchema(lang),
      email: emailSchema(lang),
      password: passwordSchema(lang),
      confirmPassword: passwordSchema(lang),
      role: z.enum(["admin", "user", "moderator"]),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: getMessage(lang, "passwordMismatch"),
      path: ["confirmPassword"],
    });

export const roleUpdateSchema = z.object({
  userId: z.string().uuid(),
  newRole: z.enum(["admin", "moderator", "user"]),
});

export const deleteUserSchema = z.object({
  userId: z.string().uuid(),
});

export const packingWaySchema = (lang: Lang) =>
  z.object({
    title: titleSchema(lang),
    title_ar: titleSchema(lang),
    description: descriptionSchema(lang),
    description_ar: descriptionSchema(lang),
    country: z.string({ required_error: getMessage(lang, "countryRequired") }),
    category: z.string({
      required_error: getMessage(lang, "categoryRequired"),
    }),
    Image: ImageSchema(lang),
  });

export const updatePackingSchema = (lang: Lang) =>
  z.object({
    id: z.number({ required_error: "ID is required" }),
    title: titleSchema(lang),
    title_ar: titleSchema(lang),
    description: descriptionSchema(lang),
    description_ar: descriptionSchema(lang),
    Image: z.union([z.undefined(), ImageSchema(lang)]),
    category: z.string({
      required_error: getMessage(lang, "categoryRequired"),
    }),
  });

export const countrySchema = (lang: Lang) =>
  z.object({
    label_name: z
      .string({ required_error: getMessage(lang, "labelNameRequired") })
      .trim()
      .min(3, getMessage(lang, "nameTooShort"))
      .max(100, getMessage(lang, "nameTooLong")),
    account: z
      .string({ required_error: getMessage(lang, "accountRequired") })
      .trim()
      .min(3, getMessage(lang, "nameTooShort"))
      .max(100, getMessage(lang, "nameTooLong")),
    labels: z
      .string({ required_error: getMessage(lang, "labelsRequired") })
      .trim()
      .min(2, getMessage(lang, "nameTooShort"))
      .max(120, getMessage(lang, "nameTooLong")),
    country_name: z
      .string({ required_error: getMessage(lang, "countryNameRequired") })
      .trim()
      .min(3, getMessage(lang, "nameTooShort"))
      .max(50, getMessage(lang, "nameTooLong")),
    country_name_ar: z
      .string({ required_error: getMessage(lang, "countryNameRequired") })
      .trim()
      .min(3, getMessage(lang, "nameTooShort"))
      .max(50, getMessage(lang, "nameTooLong")),
    flag_url: z.union([
      ImageSchema(lang),
      z.string({ required_error: getMessage(lang, "imageRequired") }),
    ]),
  });

export const categorySchema = (lang: Lang) =>
  z.object({
    category: z.string({
      required_error: getMessage(lang, "categoryRequired"),
    }),
    category_ar: z.string({
      required_error: getMessage(lang, "categoryRequired"),
    }),
  });

export const forgotPasswordSchema = (lang: Lang) =>
  z.object({
    email: emailSchema(lang),
  });

export const resetPasswordSchema = (lang: Lang) =>
  z
    .object({
      password: passwordSchema(lang),
      confirmPassword: passwordSchema(lang),
      token: z.string().min(1, getMessage(lang, "tokenRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: getMessage(lang, "passwordMismatch"),
      path: ["confirmPassword"],
    });
