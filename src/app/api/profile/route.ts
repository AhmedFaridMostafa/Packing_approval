import { updateProfile } from "@/server/services/user.service";
import { checkApiAuth } from "@/lib/auth-helpers";
import {
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { apiProfileSchema, ImageSchema } from "@/lib/validations";
import { updateImage, uploadImage } from "@/server/services/upload.service";

export async function PUT(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const authCheck = await checkApiAuth(request.headers);
    if (!authCheck.authorized || !authCheck.session?.user)
      return apiUnauthorized(t);

    const formData = await request.formData();

    const maybeFile = formData.get("image");
    const imageFile =
      maybeFile instanceof File && maybeFile.size > 0
        ? ImageSchema(t).parse(maybeFile)
        : undefined;

    let imageUrl: string | undefined;
    if (imageFile) {
      imageUrl = authCheck.session.user.image
        ? await updateImage(imageFile, `users/${authCheck.session.user.id}`)
        : await uploadImage(imageFile, `users/${authCheck.session.user.id}`);
    }

    const validatedData = apiProfileSchema(t).parse({
      name: formData.get("name") ?? undefined,
      ...(imageUrl ? { image: imageUrl } : {}),
    });

    await updateProfile(request.headers, {
      ...(validatedData.name ? { name: validatedData.name } : {}),
      ...(validatedData.image ? { image: validatedData.image } : {}),
    });

    return apiSuccess<ProfileSource>({
      ...authCheck.session.user,
      ...(validatedData.name ? { name: validatedData.name } : {}),
      ...(validatedData.image ? { image: validatedData.image } : {}),
    });
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
