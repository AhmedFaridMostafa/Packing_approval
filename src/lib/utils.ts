import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isCloudinaryUrl(url: string): boolean {
  return url.includes("res.cloudinary.com") || !url.startsWith("https://");
}

export function getErrorMessage(status: number, t?: TranslateFn): string {
  const keyMap: Record<number, string> = {
    400: "http_400",
    401: "unauthorized", // already exists
    403: "http_403",
    404: "not_found", // already exists
    429: "http_429",
    500: "internal_error", // already exists
  };

  const key = keyMap[status];
  if (key && t) return t(key);

  const fallbacks: Record<number, string> = {
    400: "Bad request. Please check your input.",
    401: "Unauthorized.",
    403: "You do not have permission to view this.",
    404: "Not found.",
    429: "Too many requests. Please try again later.",
    500: "Internal Server Error.",
  };

  return fallbacks[status] ?? "An unexpected error occurred.";
}
