import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

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

export const formUrlQuery = ({
  params,
  key,
  value,
  pathname,
}: UrlQueryParams) => {
  const queryString = qs.parse(params);
  queryString[key] = value || null;
  return qs.stringifyUrl(
    { url: pathname, query: queryString },
    { skipNull: true },
  );
};

export const removeKeysFromUrlQuery = ({
  params,
  keysToRemove,
  pathname,
}: RemoveUrlQueryParams) => {
  const queryString = qs.parse(params);
  keysToRemove.forEach((key) => delete queryString[key]);
  return qs.stringifyUrl(
    { url: pathname, query: queryString },
    { skipNull: true },
  );
};

export const getInitials = (nameStr: string) => {
  return nameStr
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const formatDate = (
  dateString: string | Date,
  isRTL: boolean,
): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? "ar-EG" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;

  const kb = bytes / 1024;

  if (kb < 1024) return `${Math.round(kb)} KB`;

  return `${(kb / 1024).toFixed(1)} MB`;
};

export const truncateFileName = (name: string, maxLength = 20) => {
  if (name.length <= maxLength) return name;
  const extension = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  const baseName = name.slice(0, name.length - extension.length);
  const availableLength = Math.max(1, maxLength - extension.length - 3);
  return `${baseName.slice(0, availableLength)}...${extension}`;
};
