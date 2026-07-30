import { NextResponse } from "next/server";
import {
  getCountries,
  createCountry,
  deleteCountry,
} from "@/server/services/country.service";
import { checkApiAdmin } from "@/lib/auth-helpers";
import { apiCountrySchema } from "@/lib/validations";
import { apiSuccess, handleApiError } from "@/lib/api-response";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const { searchParams } = new URL(request.url);
    const data = await getCountries({
      searchQuery: searchParams.get("q") || undefined,
      currentPage: searchParams.has("page")
        ? parseInt(searchParams.get("page")!)
        : undefined,
    });
    return apiSuccess(data);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function POST(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validatedData = apiCountrySchema(t).parse(body);

    const data = await createCountry(validatedData);
    return apiSuccess(data, 201);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}

export async function DELETE(request: Request) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, data: null, error: t("unauthorized") },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get("id");
    if (!idStr) {
      return NextResponse.json(
        { success: false, data: null, error: "ID is required" },
        { status: 400 },
      );
    }

    const deleted = await deleteCountry(parseInt(idStr));

    revalidateTag("countries", { expire: 0 });
    revalidateTag(`country-${deleted.slug}`, { expire: 0 });

    return apiSuccess(deleted);
  } catch (error: unknown) {
    return handleApiError(error, t);
  }
}
