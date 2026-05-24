import { NextResponse } from "next/server";
import { updateProfile } from "@/server/services/user.service";
import { checkApiAuth } from "@/lib/auth-helpers";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { apiProfileSchema, ImageSchema } from "@/lib/validations";
import { updateImage, uploadImage } from "@/server/services/upload.service";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const authCheck = await checkApiAuth(request.headers);
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }
    return apiSuccess(authCheck.session?.user);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function PUT(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const authCheck = await checkApiAuth(request.headers);
    if (!authCheck.authorized || !authCheck.session?.user.id) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const imageFile = ImageSchema(t).parse(formData.get("image"));
    let imageUrl: string | null = null;
    if (imageFile) {
      imageUrl = authCheck.session.user.image
        ? await updateImage(authCheck.session.user.image, imageFile)
        : await uploadImage(imageFile);
    }
    const body = Object.fromEntries(
      ["name", "image"].map((key) => [key, formData.get(key)]),
    );
    const validatedData = apiProfileSchema(t).parse({
      ...body,
      image: imageUrl,
    });
    const result = await updateProfile(request.headers, {
      name: validatedData.name,
      image: validatedData.image,
    });
    return apiSuccess(result);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
