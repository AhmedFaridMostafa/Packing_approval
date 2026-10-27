import { auth } from "@/lib/auth/auth";
import {
  ITEMS_PER_PAGE,
  MAX_PAGINATION_LIMIT,
  SITE_URL,
  USER_REMOVED_MARKER,
} from "@/constants";
import { type Locale } from "@/i18n/routing";

export const getUsers = async (
  headers: Headers,
  params: {
    page?: number;
    limit?: number;
    searchQuery?: string | null;
  },
) => {
  const page = Math.max(params.page || 1, 1);
  const limit = Math.min(
    Math.max(params.limit || ITEMS_PER_PAGE, 1),
    MAX_PAGINATION_LIMIT,
  );
  const offset = (page - 1) * limit;

  const data = await auth.api.listUsers({
    headers,
    query: {
      limit,
      offset,
      sortBy: "createdAt",
      sortDirection: "desc",
      ...(params.searchQuery?.trim()
        ? {
            searchField: "email" as const,
            searchValue: params.searchQuery.trim(),
            searchOperator: "contains" as const,
          }
        : {}),
    },
  });

  const totalItems = data.total ?? 0;
  const users = data.users ?? [];

  return {
    users,
    totalItems,
    totalPages: Math.max(1, Math.ceil(totalItems / limit)),
  };
};

export const getUserById = async (headers: Headers, id: string) => {
  const data = await auth.api.getUser({
    headers,
    query: { id },
  });
  return data;
};

export const createAdminUser = async (
  headers: Headers,
  locale: Locale,
  data: {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
  },
) => {
  const result = await auth.api.createUser({
    headers,
    body: {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
    },
  });

  try {
    const res = await fetch(`${SITE_URL}/api/auth/send-verification-email`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie: `NEXT_LOCALE=${locale}`,
        origin: new URL(SITE_URL).origin,
      },
      body: JSON.stringify({ email: result.user.email }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (error) {
    console.error(
      "[createAdminUser] Failed to send verification email:",
      error,
    );
  }

  return result;
};

export const updateUserRole = async (
  headers: Headers,
  id: string,
  role: "user" | "admin",
) => {
  const data = await auth.api.setRole({
    headers,
    body: { userId: id, role },
  });
  return data;
};

export const removeUser = async (headers: Headers, id: string) => {
  const data = await auth.api.banUser({
    headers,
    body: { userId: id, banReason: USER_REMOVED_MARKER },
  });
  return data;
};

export const updateProfile = async (
  headers: Headers,
  data: { name?: string; image?: string | null },
) => {
  const result = await auth.api.updateUser({
    headers,
    body: data,
  });
  return result;
};

export const banUser = async (
  headers: Headers,
  id: string,
  reason?: string,
  expiresIn?: number,
) => {
  const data = await auth.api.banUser({
    headers,
    body: { userId: id, banReason: reason, banExpiresIn: expiresIn },
  });
  return data;
};

export const unbanUser = async (headers: Headers, id: string) => {
  const data = await auth.api.unbanUser({
    headers,
    body: { userId: id },
  });
  return data;
};

export const setPassword = async (headers: Headers, newPassword: string) => {
  const data = await auth.api.setPassword({
    headers,
    body: { newPassword },
  });
  return data;
};
