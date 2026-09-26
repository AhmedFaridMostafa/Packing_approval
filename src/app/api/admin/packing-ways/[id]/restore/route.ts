import { revalidateTag } from "next/cache";
import { getTranslations } from "next-intl/server";
import { checkApiAdmin } from "@/lib/auth-helpers";
import {
  apiNotFound,
  apiSuccess,
  apiUnauthorized,
  handleApiError,
} from "@/lib/api-response";
import { restorePackingWay } from "@/server/services/packing.service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const t = await getTranslations("Validation");
  try {
    const auth = await checkApiAdmin(request.headers);
    if (!auth.authorized || !auth.session?.user) return apiUnauthorized(t);
    const result = await restorePackingWay(
      (await params).id,
      auth.session.user,
    );
    revalidateTag("regions-detail", { expire: 0 });
    return apiSuccess(result);
  } catch (error) {
    if (error instanceof Error && error.message === "Packing way not found")
      return apiNotFound(t);
    console.error(`Error in POST ${request.url}:`, error);
    return handleApiError(error, t);
  }
}
