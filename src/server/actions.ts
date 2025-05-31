"use server";

import { createAdminClient, createClient } from "./supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  deleteImage,
  moveImageToNewFolder,
  renameImage,
  updateImage,
  uploadImage,
} from "./cloudinary";
import hasPermission, { Permission } from "./handlePermissions";
import { User as UserDB } from "@supabase/supabase-js";
import { Packing, User as UserMD } from "@/type/interfaces";
import {
  categorySchema,
  confirmPasswordSchema,
  countrySchema,
  deleteUserSchema,
  loginSchema,
  packingWaySchema,
  profileSchema,
  roleUpdateSchema,
  signupSchema,
  updatePackingSchema,
  resetPasswordSchema,
  forgotPasswordSchema,
} from "@/lib/validations";

import { cookies } from "next/headers";
import { Lang, LanguageType } from "@/i18n.config";

export async function setLanguageCookie(lang: LanguageType) {
  const cookieStore = await cookies();
  cookieStore.set(process.env.LANG_COOKIE_NAME!, lang, {
    path: "/",
    secure: true,
    sameSite: "lax",
    maxAge: 31536000, // 1 year
  });
}

async function getLanguageCookie(): Promise<LanguageType | undefined> {
  const cookieStore = await cookies();
  const lang = cookieStore.get(process.env.LANG_COOKIE_NAME!);
  return lang?.value as LanguageType | undefined;
}

export type User = UserDB & { user_metadata: UserMD };

interface ActionResponse {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
  data?: unknown;
}

const handleActionError = (
  error: unknown,
  defaultMessage: string,
): ActionResponse => ({
  success: false,
  message: error instanceof Error ? error.message : defaultMessage,
  errors: {},
});

const checkAuth = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Unauthorized access");
  return user;
};

const checkPermission = (
  user: { user_metadata: { role: "user" | "moderator" | "admin" } },
  permission: Permission,
) => {
  if (!hasPermission(user.user_metadata.role, permission)) {
    throw new Error(`You don't have permission to ${permission}`);
  }
};

export async function login(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const lang = (await getLanguageCookie()) as Lang;

    const validatedData = loginSchema(lang).safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword(
      validatedData.data,
    );
    if (error) throw new Error(error.message);
  } catch (error) {
    return handleActionError(error, "Login failed");
  }
  revalidatePath("/", "layout");
  redirect("./");
}

export async function signup(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const user = (await checkAuth()) as User;
    checkPermission(user, "create:user");

    const lang = (await getLanguageCookie()) as Lang;
    const validatedData = signupSchema(lang).safeParse({
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      role: formData.get("role"),
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email: validatedData.data.email,
      password: validatedData.data.confirmPassword,
      options: {
        data: {
          full_name: validatedData.data.full_name,
          role: validatedData.data.role,
          avatar_url: "",
        },
      },
    });
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
    return { success: true, message: "User created successfully", errors: {} };
  } catch (error) {
    return handleActionError(error, "Signup failed");
  }
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateProfile(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const user = (await checkAuth()) as User;
    const avatarFile = formData.get("avatar") as File;

    const lang = (await getLanguageCookie()) as Lang;

    const validatedData = profileSchema(lang).safeParse({
      name: formData.get("name"),
      avatar: avatarFile?.size > 0 ? avatarFile : undefined,
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const updates: { full_name: string; avatar_url?: string } = {
      full_name: validatedData.data.name,
    };

    if (validatedData.data.avatar) {
      const image = await uploadImage(
        validatedData.data.avatar,
        "avatar",
        user.id,
      );
      if (!image?.public_id) throw new Error("Image upload failed");
      updates.avatar_url = image.public_id;
    }

    const supabase = await createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      data: updates,
    });

    if (updateError) throw new Error(updateError.message);

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Profile updated successfully",
      errors: {},
    };
  } catch (error) {
    return handleActionError(error, "Profile update failed");
  }
}

export async function forgotPassword(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const lang = (await getLanguageCookie()) as Lang;

    const validatedData = forgotPasswordSchema(lang).safeParse({
      email: formData.get("email"),
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      validatedData.data.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/user/reset-password`,
      },
    );

    if (error) throw new Error(error.message);

    return {
      success: true,
      message:
        "Password reset email sent successfully. Please check your inbox.",
      errors: {},
    };
  } catch (error) {
    return handleActionError(error, "Failed to send reset email");
  }
}

export async function resetPassword(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const lang = (await getLanguageCookie()) as Lang;
    const validatedData = resetPasswordSchema(lang).safeParse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      token: formData.get("token"),
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the validation errors",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // Use admin client for password reset
    const supabaseAdmin = await createAdminClient();

    // First verify the reset token
    const { data: verifyData, error: verifyError } =
      await supabaseAdmin.auth.verifyOtp({
        token_hash: validatedData.data.token,
        type: "recovery",
      });

    if (verifyError) {
      console.log(verifyError);
      throw new Error("Invalid or expired reset token");
    }

    if (!verifyData?.user) {
      throw new Error("User not found");
    }

    // Update password using admin privileges
    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(verifyData.user.id, {
        password: validatedData.data.password,
      });

    if (updateError) throw new Error(updateError.message);

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Password reset successfully",
      errors: {},
    };
  } catch (error) {
    return handleActionError(error, "Password reset failed");
  }
}

export async function updatePassword(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const user = (await checkAuth()) as User;

    const lang = (await getLanguageCookie()) as Lang;
    const validatedData = confirmPasswordSchema(lang).safeParse({
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "New passwords don't match",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const supabase = await createClient();

    const { error: passwordError } = await supabase.auth.signInWithPassword({
      email: user.email as string,
      password: validatedData.data.currentPassword,
    });

    if (passwordError) {
      return {
        success: false,
        message: "Password update failed",
        errors: { currentPassword: ["Current password is incorrect"] },
      };
    }

    const { error: updateUserError } = await supabase.auth.updateUser({
      password: validatedData.data.confirmPassword,
    });

    if (updateUserError)
      return handleActionError(updateUserError, "Password update failed");

    return {
      success: true,
      message: "Password updated successfully",
      errors: {
        currentPassword: [],
        newPassword: [],
        confirmPassword: [],
      },
    };
  } catch (error) {
    return handleActionError(error, "Password update failed");
  }
}

export async function updateUserRole(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    // 1. Authenticate current user
    const currentUser = (await checkAuth()) as User;

    // 2. Validate input
    const validatedData = roleUpdateSchema.safeParse({
      userId: formData.get("userId"),
      newRole: formData.get("newRole"),
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid form data",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // 3. Check permissions
    checkPermission(currentUser, "update:user_role");

    // 4. Prevent self-role modification
    if (currentUser.id === validatedData.data.userId) {
      throw new Error("You cannot modify your own role");
    }

    // 5. Initialize admin client
    const supabaseAdmin = await createAdminClient();

    // 6. Get existing user metadata
    const {
      data: { user },
      error: fetchError,
    } = await supabaseAdmin.auth.admin.getUserById(validatedData.data.userId);

    if (fetchError || !user) {
      throw new Error("User not found");
    }

    // 7. Update role in metadata
    const newMetadata = {
      ...user.user_metadata,
      role: validatedData.data.newRole,
    };

    // 8. Perform the update
    const { error } = await supabaseAdmin.auth.admin.updateUserById(
      validatedData.data.userId,
      { user_metadata: newMetadata },
    );

    if (error) throw new Error(error.message);

    // 9. Revalidate cache
    revalidatePath("/user/list");

    return {
      success: true,
      message: "User role updated successfully",
      errors: {},
    };
  } catch (error) {
    return handleActionError(error, "Role update failed");
  }
}

export async function deleteUser(userId: string): Promise<ActionResponse> {
  try {
    const currentUser = (await checkAuth()) as User;
    const validatedData = deleteUserSchema.safeParse({
      userId,
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid user ID",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    checkPermission(currentUser, "delete:user");

    if (currentUser.id === validatedData.data.userId)
      throw new Error("You cannot delete your own account");

    const supabaseAdmin = await createAdminClient();

    const {
      data: { user: targetUser },
      error: fetchError,
    } = await supabaseAdmin.auth.admin.getUserById(validatedData.data.userId);

    if (fetchError || !targetUser) throw new Error("User not found");

    if (targetUser.user_metadata?.avatar_url) {
      await deleteImage(targetUser.user_metadata.avatar_url);
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(
      validatedData.data.userId,
    );

    if (error) throw new Error(error.message);

    revalidatePath("/user/list");

    return {
      success: true,
      message: "User deleted successfully",
      errors: {},
    };
  } catch (error) {
    return handleActionError(error, "User deletion failed");
  }
}

// country actions
export async function addCountry(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    // Authentication & Authorization
    const user = (await checkAuth()) as User;
    checkPermission(user, "create:country");
    const [name_en, name_ar, flag] = (formData.get("country") as string).split(
      "%",
    );
    const image = formData.get("image") as File;
    // Validate form data
    const lang = (await getLanguageCookie()) as Lang;

    const validatedData = countrySchema(lang).safeParse({
      label_name: formData.get("label_name"),
      account: formData.get("account"),
      labels: formData.get("labels"),
      country_name: formData.get("country_name") || name_en,
      country_name_ar: formData.get("country_name_ar") || name_ar,
      flag_url: (image.size > 0 && image) || flag,
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }
    // Image handling
    let flagPublicId = "";
    const flagFile = validatedData.data.flag_url;

    if (flagFile instanceof File) {
      const uploadResult = await uploadImage(
        flagFile,
        "country-flags",
        `${validatedData.data.country_name.replace(/\s+/g, "-")}-flag`,
      );
      if (!uploadResult?.public_id)
        throw new Error("Failed to upload flag image");
      flagPublicId = uploadResult.public_id;
    } else if (typeof flagFile === "string") {
      flagPublicId = flagFile;
    }

    // Database insertion
    const supabase = await createClient();
    const { error } = await supabase.from("country").insert([
      {
        label_name: validatedData.data.label_name,
        account: validatedData.data.account,
        labels: validatedData.data.labels,
        country_name: {
          en: validatedData.data.country_name,
          ar: validatedData.data.country_name_ar,
        },
        flag_url: flagPublicId,
      },
    ]);

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Country created successfully",
      errors: {},
    };
  } catch (error) {
    return handleActionError(error, "Country creation failed");
  }
}

// packing way actions
export async function addPackingWay(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const user = (await checkAuth()) as User;
    checkPermission(user, "create:packing_way");

    const lang = (await getLanguageCookie()) as Lang;
    const validatedData = packingWaySchema(lang).safeParse({
      title: formData.get("title"),
      title_ar: formData.get("title_ar"),
      description: formData.get("description"),
      description_ar: formData.get("description_ar"),
      country: formData.get("country"),
      category: formData.get("category"),
      Image: formData.get("image"),
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please correct the form errors",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // 4. Prepare data
    const [account, countryName, countryId] =
      validatedData.data.country.split("%");
    const [categoryId, categoryName] = validatedData.data.category.split("%");

    // 5. Prepare data for insertion
    const fileName =
      `${countryName}-${categoryName}-${validatedData.data.title}`.replace(
        /[^a-zA-Z0-9]/g,
        "_",
      );

    // 6. Upload image with robust error handling
    let imageUploadResult;
    try {
      if (!validatedData.data.Image) throw new Error("Image is required");
      imageUploadResult = await uploadImage(
        validatedData.data.Image,
        categoryName,
        fileName,
      );
      if (!imageUploadResult) throw new Error("Failed to upload image");
    } catch (imageError) {
      return handleActionError(imageError, "Failed to upload image");
    }

    // 7. Insert packing data
    const supabase = await createClient();
    const { error: packingInsertError } = await supabase
      .from("packing")
      .insert([
        {
          region_id: +countryId,
          category_id: +categoryId,
          title: {
            en: validatedData.data.title,
            ar: validatedData.data.title_ar,
          },
          description: {
            en: validatedData.data.description,
            ar: validatedData.data.description_ar,
          },
          image_url: imageUploadResult.public_id,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (packingInsertError) throw new Error(packingInsertError.message);

    // 8. Insert history record
    await addPackingHistory([
      {
        country_id: +countryId,
        category_id: +categoryId,
        change_timestamp: new Date(),
        changed_by: user.email as string,
        change_title: {
          en: validatedData.data.title,
          ar: validatedData.data.title_ar,
        },
        change_description: {
          en: validatedData.data.description,
          ar: validatedData.data.description_ar,
        },
        action: "add",
      },
    ]);

    // 9. Revalidate and return success
    revalidatePath(`/country/${account}-${countryName}-${countryId}`);
    return {
      success: true,
      message: "Packing Way added successfully",
      errors: {},
    };
  } catch (error) {
    return handleActionError(error, "An unexpected error occurred");
  }
}

export async function deletePackingWay(
  packingId: number,
): Promise<ActionResponse> {
  const supabase = await createClient();
  try {
    const user = (await checkAuth()) as User;
    if (!packingId) throw new Error("Packing Way ID is required");
    // Fetch packing data to get image reference
    const { data: packingData, error: fetchError } = (await supabase
      .from("packing")
      .select(
        "id, region_id, image_url, category_id, title, description, country(id, account, country_name)",
      )
      .eq("id", packingId)
      .single()) as { data: Packing; error: unknown };
    if (fetchError || !packingData) throw new Error("Packing Way not found");
    // Delete image from Cloudinary if exists
    if (packingData.image_url) await deleteImage(packingData.image_url);
    // Delete related history records
    await addPackingHistory([
      {
        country_id: packingData.region_id,
        category_id: packingData.category_id,
        change_timestamp: new Date(),
        changed_by: user.email as string,
        change_title: { en: packingData.title.en, ar: packingData.title.ar },
        change_description: {
          en: packingData.description.en,
          ar: packingData.description.ar,
        },
        action: "delete",
      },
    ]);

    // Delete main packing record
    const { error: deleteError } = await supabase
      .from("packing")
      .delete()
      .eq("id", packingId);

    if (deleteError) throw new Error(deleteError.message);

    revalidatePath(
      `/country/${packingData.country.account}-${packingData.country.country_name.en}-${packingData.country.id}`,
    );

    return {
      success: true,
      message: "Packing Way deleted successfully",
      errors: {},
    };
  } catch (error) {
    console.error("Packing Way deletion error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Deletion failed",
      errors: {},
    };
  }
}

export async function updatePackingWay(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const user = (await checkAuth()) as User;
    checkPermission(user, "update:packing_way");

    const image = formData.get("image") as File;
    const lang = (await getLanguageCookie()) as Lang;

    // Parse and validate the ID first to catch conversion issues early
    const idValue = formData.get("id");
    const parsedId = Number(idValue);

    if (!idValue || isNaN(parsedId) || parsedId <= 0) {
      return {
        success: false,
        message: "Invalid packing ID provided",
        errors: { id: ["Valid packing ID is required"] },
      };
    }

    const validatedData = updatePackingSchema(lang).safeParse({
      id: parsedId,
      title: formData.get("title"),
      title_ar: formData.get("title_ar"),
      description: formData.get("description"),
      description_ar: formData.get("description_ar"),
      category: formData.get("category"),
      Image: image && image.size > 0 ? image : undefined,
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please correct the form errors",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // Parse category data and validate
    const categoryValue = validatedData.data.category;
    if (!categoryValue || !categoryValue.includes("%")) {
      return {
        success: false,
        message: "Invalid category format",
        errors: { category: ["Valid category selection is required"] },
      };
    }

    const [categoryIdStr, newCategoryName] = categoryValue.split("%");
    const categoryId = Number(categoryIdStr);

    if (isNaN(categoryId) || categoryId <= 0) {
      return {
        success: false,
        message: "Invalid category ID",
        errors: { category: ["Valid category is required"] },
      };
    }

    const supabase = await createClient();

    // Fetch existing packing data
    const { data: packingData, error: packingError } = (await supabase
      .from("packing")
      .select(
        "id, image_url, region_id, category_id, title, description, country(id, account, country_name), categories(name)",
      )
      .eq("id", validatedData.data.id)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .single()) as { data: Packing; error: any };

    if (packingError || !packingData) {
      throw new Error(packingError?.message || "Packing Way not found");
    }

    // Generate filename
    const fileName =
      `${packingData.country.country_name.en}-${newCategoryName}-${validatedData.data.title}`.replace(
        /[^a-zA-Z0-9]/g,
        "_",
      );

    // Check if category has changed
    const categoryChanged = packingData.category_id !== categoryId;

    let imageUploadResult;
    try {
      if (validatedData.data.Image) {
        // New image uploaded - delete old and upload new

        imageUploadResult = await updateImage(
          validatedData.data.Image,
          newCategoryName,
          fileName,
          packingData.image_url,
        );
      } else if (categoryChanged) {
        // Category changed but no new image - move existing image to new folder

        imageUploadResult = await moveImageToNewFolder(
          packingData.image_url,
          newCategoryName,
          fileName,
        );
      } else if (packingData.image_url !== fileName) {
        // No category change and no new image - just rename if filename changed

        try {
          imageUploadResult = await renameImage(
            packingData.image_url,
            fileName,
          );
        } catch (renameError) {
          console.warn(
            "Rename failed, keeping original image_url:",
            renameError,
          );
          // If rename fails, keep the original image_url
          imageUploadResult = { public_id: packingData.image_url };
        }
      } else {
        // No changes needed to image
        imageUploadResult = { public_id: packingData.image_url };
      }

      if (!imageUploadResult?.public_id) {
        throw new Error("Failed to process image - no public_id returned");
      }
    } catch (imageError) {
      return handleActionError(imageError, "Failed to process image");
    }

    // Update database record
    const { error: updateError } = await supabase
      .from("packing")
      .update({
        category_id: categoryId,
        title: {
          en: validatedData.data.title,
          ar: validatedData.data.title_ar,
        },
        description: {
          en: validatedData.data.description,
          ar: validatedData.data.description_ar,
        },
        image_url: imageUploadResult.public_id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", validatedData.data.id);

    if (updateError) {
      throw new Error(`Database update failed: ${updateError.message}`);
    }

    // Add history record
    await addPackingHistory([
      {
        country_id: packingData.region_id,
        category_id: categoryId,
        change_timestamp: new Date(),
        changed_by: user.email as string,
        change_title: {
          en: validatedData.data.title,
          ar: validatedData.data.title_ar,
        },
        change_description: {
          en: validatedData.data.description,
          ar: validatedData.data.description_ar,
        },
        action: "edit",
      },
    ]);

    // Revalidate the page
    revalidatePath(
      `/country/${packingData.country.account}-${packingData.country.country_name.en}-${packingData.country.id}`,
    );

    return {
      success: true,
      message: "Packing Way updated successfully",
      errors: {},
    };
  } catch (error) {
    console.error("updatePackingWay error:", error);
    return handleActionError(
      error,
      "An unexpected error occurred while updating",
    );
  }
}

// Categories action

export async function addCategory(
  _prevState: unknown,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const user = (await checkAuth()) as User;
    checkPermission(user, "create:category");
    const lang = (await getLanguageCookie()) as Lang;
    const validatedData = categorySchema(lang).safeParse({
      category: formData.get("category"),
      category_ar: formData.get("category_ar"),
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please correct the form errors",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }
    const supabase = await createClient();
    const { error: categoryInsertError } = await supabase
      .from("categories")
      .insert([
        {
          name: {
            en: validatedData.data.category,
            ar: validatedData.data.category_ar,
          },
        },
      ]);

    if (categoryInsertError) throw new Error(categoryInsertError.message);

    return {
      success: true,
      message: "category  added successfully",
      errors: {},
    };
  } catch (error) {
    return handleActionError(
      error,
      "Filed to add category. please try again later",
    );
  }
}

// packing history actions
export async function addPackingHistory(
  data: {
    country_id: number;
    category_id: number;
    change_timestamp: Date;
    changed_by: string;
    change_title: { en: string; ar: string };
    change_description: { en: string; ar: string };
    action: "add" | "edit" | "delete";
  }[],
) {
  const supabase = await createClient();
  const { error } = await supabase.from("packing_history").insert(data);
  if (error) throw new Error(error.message);
}
