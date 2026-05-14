import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  userAc,
  adminAc,
} from "better-auth/plugins/admin/access";

const statement = {
  country: ["create", "update", "delete"],
  region: ["create", "update", "delete"],
  category: ["create", "update", "delete", "reorder"],
  packing_way: ["create", "update", "delete"],
  packing_history: ["view"],
} as const;

export const ac = createAccessControl({ ...defaultStatements, ...statement });

export const user = ac.newRole(userAc.statements);

export const admin = ac.newRole({ ...adminAc.statements, ...statement });
