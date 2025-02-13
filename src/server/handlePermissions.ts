export type Permission =
  | "view:packing_history"
  | "create:packing_way"
  | "update:packing_way"
  | "update:user_role"
  | "create:country"
  | "create:category"
  | "view:usersList"
  | "create:user"
  | "delete:user";

const ROLES: {
  [key in "user" | "moderator" | "admin"]: readonly Permission[];
} = {
  user: ["view:packing_history", "create:packing_way", "update:packing_way"],
  moderator: [
    "view:packing_history",
    "create:packing_way",
    "create:country",
    "create:category",
    "update:packing_way",
  ],
  admin: [
    "view:packing_history",
    "view:usersList",
    "create:packing_way",
    "create:country",
    "create:category",
    "create:user",
    "update:packing_way",
    "update:user_role",
    "delete:user",
  ],
} as const;

export default function hasPermission(
  role: "user" | "moderator" | "admin",
  permission: Permission,
): boolean {
  return ROLES[role]?.includes(permission) ?? false;
}
