import { auth } from "@/lib/auth/auth";
import { MAX_PAGINATION_LIMIT } from "@/constants";

export const getUsers = async (
  headers: Headers,
  params: { page?: number; limit?: number },
) => {
  const page = Math.max(params.page || 1, 1);
  const limit = Math.min(Math.max(params.limit || 50, 1), MAX_PAGINATION_LIMIT);
  const offset = (page - 1) * limit;

  const data = await auth.api.listUsers({
    headers,
    query: {
      limit,
      offset,
      sortBy: "createdAt",
      sortDirection: "desc",
    },
  });

  return data;
};

export const getUserById = async (headers: Headers, id: string) => {
  const data = await auth.api.getUser({
    headers,
    query: { id },
  });
  return data;
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

export const deleteUser = async (headers: Headers, id: string) => {
  const data = await auth.api.removeUser({
    headers,
    body: { userId: id },
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
