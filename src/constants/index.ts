import { GoogleIcon } from "@/components/auth/auth-icons";
import type { Accept } from "react-dropzone";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const DEFAULT_ACCEPT: Accept = {
  "image/*": [".png", ".jpg", ".jpeg", ".webp", ".svg"],
};

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const USER_ROLES = ["admin", "user"] as const;

export const USER_REMOVED_MARKER = "USER_REMOVED_BY_ADMIN" as const;

export const MAX_PAGINATION_LIMIT = 100;

export const DEFAULT_LANGUAGE = "ar";

export const DEFAULT_LANGUAGES = ["en", "ar"] as const;

export type Language = (typeof DEFAULT_LANGUAGES)[number];

export const SOCIAL_OAUTH_PROVIDERS = [
  {
    name: "google",
    icon: GoogleIcon,
  },
] as const;

export type OAuthProvider = (typeof SOCIAL_OAUTH_PROVIDERS)[number]["name"];

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const ITEMS_PER_PAGE = 8;

export const ACTIONS = ["CREATE", "UPDATE", "DELETE"] as const;

export const EXPIRY_BAN_OPTIONS = [
  { value: "permanent", labelKey: "expiry_permanent", seconds: undefined },
  { value: "1d", labelKey: "expiry_1day", seconds: 86_400 },
  { value: "7d", labelKey: "expiry_7days", seconds: 604_800 },
  { value: "30d", labelKey: "expiry_30days", seconds: 2_592_000 },
] as const;
