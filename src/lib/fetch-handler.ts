import { HttpError } from "./HttpError";
import { getErrorMessage } from "./utils";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {},
  t?: TranslateFn,
): Promise<ActionResponse<T>> {
  const {
    timeout = 10000,
    headers: customHeaders = {},
    ...restOptions
  } = options;
  const isFormData = restOptions.body instanceof FormData;

  const headers: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    Accept: "application/json",
    ...customHeaders,
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: AbortSignal.timeout(timeout),
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok)
      throw new HttpError(response.status, getErrorMessage(response.status, t));

    return await response.json();
  } catch (err) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = isError(err)
      ? err.message
      : t
        ? t("internal_error")
        : "Internal Server Error";
    return { success: false, error: { message }, status };
  }
}
