import { revalidateTag } from "next/cache";
import { getTranslations } from "next-intl/server";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { apiPackingSchema, ImageSchema } from "@/lib/validations";
import {
  createPackingWay,
  getPackingWaysPaginated,
} from "@/server/services/packing.service";
import { uploadImage } from "@/server/services/upload.service";

const numberParam = (value: string | null) =>
  value ? Number(value) : undefined;

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) return apiUnauthorized(t);

    const params = new URL(request.url).searchParams;
    const values = ["country_id", "region_id", "category_id"].map((key) => {
      const value = numberParam(params.get(key));
      if (!Number.isInteger(value) && value !== undefined)
        throw new Error(t("invalid_id"));
      return numberParam(params.get(key));
    });

    return apiSuccess(
      await getPackingWaysPaginated({
        q: params.get("q") || undefined,
        country_id: values[0],
        region_id: values[1],
        category_id: values[2],
        currentPage: numberParam(params.get("page")),
      }),
    );
  } catch (error) {
    console.error(`Error in GET ${request.url}:`, error);
    return handleApiError(error, t);
  }
}

export async function POST(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized || !auth.session?.user) return apiUnauthorized(t);

    const formData = await request.formData();

    const image = ImageSchema(t).safeParse(formData.get("image"));

    const imageUrl = image.success
      ? await uploadImage(image.data, "packing-ways")
      : null;

    const data = apiPackingSchema(t).parse({
      region_id: Number(formData.get("region_id")),
      category_id: Number(formData.get("category_id")),
      title_en: formData.get("title_en"),
      title_ar: formData.get("title_ar"),
      description_en: formData.get("description_en") || undefined,
      description_ar: formData.get("description_ar") || undefined,
      image_url: imageUrl,
    });

    const result = await createPackingWay(data, {
      id: auth.session.user.id,
      name: auth.session.user.name,
      email: auth.session.user.email,
    });
    revalidateTag("regions-detail", { expire: 0 });
    return apiSuccess(result, 201);
  } catch (error) {
    console.error(`Error in POST ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
