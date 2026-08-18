interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {},
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

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers,
      signal: AbortSignal.timeout(timeout),
    });

    return await response.json();
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return { success: false, status: 408, error: {} };
    }
    return { success: false, status: 0, error: {} };
  }
}
