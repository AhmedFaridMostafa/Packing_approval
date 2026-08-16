import {
  deleteCountry,
  getCountryWithRegions,
  updateCountry,
} from "@/server/services/country.service";
import { getTranslations } from "next-intl/server";
import { apiCountrySchema, countryParamsSchema } from "@/lib/validations";
import { apiNotFound, apiSuccess, handleApiError } from "@/lib/api-response";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { NextResponse } from "next/server";
import {
  cloneImageFromUrl,
  uploadImage,
} from "@/server/services/upload.service";
import { revalidateTag } from "next/cache";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ countrySlug?: string }> },
) {
  const [t, { countrySlug }] = await Promise.all([
    getTranslations("Validation"),
    params,
  ]);

  try {
    const validation = countryParamsSchema(t).parse({ countrySlug });
    const result = await getCountryWithRegions(validation.countrySlug);
    if (!result) return apiNotFound(t);
    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error, t);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ countrySlug?: string }> },
) {
  const [t, { countrySlug }] = await Promise.all([
    getTranslations("Validation"),
    params,
  ]);
  try {
    const auth = await checkApiAdmin(request.headers);

    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }
    const formData = await request.formData();

    const validatedData = apiCountrySchema(t)
      .required({ slug: true })
      .parse({
        slug: countrySlug,
        name_en: formData.get("name_en"),
        name_ar: formData.get("name_ar"),
        flag_url: formData.get("flag_url") || undefined,
        image_file: formData.get("image_file") || undefined,
      });

    let flag_url: string | undefined = validatedData.flag_url;
    if (validatedData.flag_url && validatedData.flag_url.length > 0) {
      flag_url = await cloneImageFromUrl(
        validatedData.flag_url,
        "countries_flags",
      );
    } else if (validatedData.image_file && validatedData.image_file.size > 0) {
      flag_url = await uploadImage(validatedData.image_file, "countries_flags");
    }
    const data = await updateCountry({
      slug: validatedData.slug,
      name_ar: validatedData.name_ar,
      name_en: validatedData.name_en,
      flag_url,
    });

    revalidateTag("countries", { expire: 0 });
    revalidateTag(`country-${data.slug}`, { expire: 0 });

    return apiSuccess(data);
  } catch (error) {
    return handleApiError(error, t);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ countrySlug?: string }> },
) {
  const [t, { countrySlug }] = await Promise.all([
    getTranslations("Validation"),
    params,
  ]);
  try {
    const auth = await checkApiAdmin(request.headers);

    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const validation = countryParamsSchema(t).parse({ countrySlug });

    const deleted = await deleteCountry(validation.countrySlug);

    revalidateTag("countries", { expire: 0 });
    revalidateTag(`country-${deleted.slug}`, { expire: 0 });

    return apiSuccess(deleted);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
