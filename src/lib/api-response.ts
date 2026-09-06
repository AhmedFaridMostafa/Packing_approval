import { NextResponse } from "next/server";
import { flattenError, ZodError } from "zod";
import type { _Translator } from "next-intl";
import { ApiError } from "./errors";

function errorResponse(
  message: string,
  status: number,
  details?: Record<string, string[]>,
): APIErrorResponse {
  return NextResponse.json(
    {
      success: false,
      error: details ? { message, details } : { message },
    },
    { status },
  );
}

export function handleApiError(
  error: unknown,
  t?: _Translator,
): APIErrorResponse {
  if (error instanceof ZodError) {
    const { fieldErrors, formErrors } = flattenError(error);
    return errorResponse(
      formErrors[0] ?? (t ? t("validation_error") : "Validation failed."),
      400,
      fieldErrors,
    );
  }

  if (error instanceof ApiError) {
    return errorResponse(error.message, error.status, error.details);
  }

  // Malformed JSON body (e.g. request.json() threw before Zod ever ran).
  if (error instanceof SyntaxError) {
    return errorResponse(
      t ? t("invalid_json") : "Malformed request body.",
      400,
    );
  }

  // Postgres error codes: https://www.postgresql.org/docs/current/errcodes-appendix.html
  if (error && typeof error === "object" && "code" in error) {
    const dbError = error as { code: unknown; detail?: string };

    switch (dbError.code) {
      case "23505": // unique_violation
        return errorResponse(
          t ? t("resource_exists") : "Resource already exists.",
          409,
        );

      case "23503": {
        // foreign_key_violation — distinguish insert (referenced row missing)
        // from delete (still referenced elsewhere) using Postgres's detail text.
        const isMissingReference = dbError.detail?.includes(
          "is not present in table",
        );

        return isMissingReference
          ? errorResponse(
              t
                ? t("invalid_reference")
                : "Referenced resource does not exist.",
              400,
            )
          : errorResponse(
              t
                ? t("resource_referenced")
                : "Cannot delete resource because it is referenced by other records.",
              409,
            );
      }

      case "23502": // not_null_violation
        return errorResponse(
          t ? t("missing_required_field") : "A required field is missing.",
          400,
        );

      case "22P02": // invalid_text_representation (bad UUID, bad enum, etc.)
        return errorResponse(
          t ? t("invalid_input") : "Invalid input format.",
          400,
        );
    }
  }

  // Log the real error server-side; never leak it to the client.
  console.error("[handleApiError] Unhandled error:", error);

  return errorResponse(t ? t("internal_error") : "Internal Server Error", 500);
}

export function apiSuccess<T = null>(
  data: T,
  status = 200,
): APISuccessResponse<T> {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiNotFound(t: _Translator): APIErrorResponse {
  return errorResponse(t("not_found"), 404);
}

export function apiUnauthorized(t: _Translator): APIErrorResponse {
  return errorResponse(t("unauthorized"), 401);
}
