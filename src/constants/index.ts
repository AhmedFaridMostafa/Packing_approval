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

export const SOCIAL_OAUTH_PROVIDERS = [
  {
    name: "google",
    icon: GoogleIcon,
  },
] as const;

export type OAuthProvider = (typeof SOCIAL_OAUTH_PROVIDERS)[number]["name"];
