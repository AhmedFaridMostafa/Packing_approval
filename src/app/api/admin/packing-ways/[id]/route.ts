import { revalidateTag } from "next/cache";
import { getTranslations } from "next-intl/server";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiNotFound,
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { apiPackingSchema, ImageSchema } from "@/lib/validations";
import {
  deletePackingWay,
  getPackingWayDetailById,
  updatePackingWay,
} from "@/server/services/packing.service";
import { uploadImage } from "@/server/services/upload.service";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);
    const item = await getPackingWayDetailById((await params).id);
    return item ? apiSuccess(item) : apiNotFound(t);
  } catch (error) {
    return handleApiError(error, t);
  }
}

export async function PUT(request: Request, { params }: Params) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized || !auth.session) return apiUnauthorized(t);
    const id = (await params).id;
    const existing = await getPackingWayDetailById(id);

    if (!existing) return apiNotFound(t);

    const formData = await request.formData();

    const image = ImageSchema(t).safeParse(formData.get("image"));

    const imageUrl = image.success
      ? await uploadImage(image.data, "packing-ways")
      : existing.image_url;

    const parsed = apiPackingSchema(t).parse({
      region_id: Number(formData.get("region_id")),
      category_id: Number(formData.get("category_id")),
      title_en: formData.get("title_en"),
      title_ar: formData.get("title_ar"),
      description_en: formData.get("description_en") || undefined,
      description_ar: formData.get("description_ar") || undefined,
      image_url: imageUrl,
    });

    const result = await updatePackingWay(id, parsed, auth.session.user);

    revalidateTag("regions-detail", { expire: 0 });
    return apiSuccess(result);
  } catch (error) {
    console.error(`Error in PUT ${request.url}:`, error);
    return handleApiError(error, t);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized || !auth.session) return apiUnauthorized(t);
    const id = (await params).id;
    const result = await deletePackingWay(id, auth.session.user);
    revalidateTag("regions-detail", { expire: 0 });
    return apiSuccess(result);
  } catch (error) {
    console.error(`Error in DELETE ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
