import { GoogleIcon } from "@/components/auth/auth-icons";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const USER_ROLES = {
  admin: "admin",
  user: "user",
} as const;

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
