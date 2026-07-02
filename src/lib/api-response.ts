import { NextResponse } from "next/server";
import { flattenError, ZodError } from "zod";

export function handleApiError(
  error: unknown,
  t?: TranslateFn,
): APIErrorResponse {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: flattenError(error),
      },
      { status: 400 },
    );
  }

  // Handle PostgreSQL database errors (unique constraint, foreign key)
  const dbError = error as Record<string, unknown> | null;
  if (dbError && typeof dbError === "object" && "code" in dbError) {
    if (dbError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: t ? t("resource_exists") : "Resource already exists.",
        },
        { status: 400 },
      );
    }

    if (dbError.code === "23503") {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: t
            ? t("resource_referenced")
            : "Cannot delete resource because it is referenced by other records.",
        },
        { status: 409 },
      );
    }
  }

  const message =
    error instanceof Error
      ? error.message
      : t
        ? t("internal_error")
        : "Internal Server Error";

  return NextResponse.json(
    {
      success: false,
      data: null,
      error: message,
    },
    { status: 500 },
  );
}

export function apiSuccess<T>(data: T, status = 200): APISuccessResponse<T> {
  return NextResponse.json({ success: true, data, error: null }, { status });
}

export function apiNotFound(t: TranslateFn): APIErrorResponse {
  return NextResponse.json(
    {
      success: false,
      error: { message: t("not_found") },
      status: 404,
    },
    { status: 404 },
  );
}
