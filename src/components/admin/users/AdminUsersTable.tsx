import type { _Translator } from "next-intl";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import UserRow from "./UserRow";

interface AdminUsersTableProps {
  t: _Translator;
  users: AdminUser[];
  currentUserId: string | null;
}

const AdminUsersTable = ({ t, users, currentUserId }: AdminUsersTableProps) => {
  return (
    <Card className="border-border bg-card overflow-hidden rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-surface-container-low/60">
            <TableRow className="border-border">
              <TableHead className="w-75 font-bold">
                {t("table.columns.user")}
              </TableHead>

              <TableHead>{t("table.columns.role")}</TableHead>

              <TableHead>{t("table.columns.status")}</TableHead>

              <TableHead>{t("table.columns.joinedAt")}</TableHead>

              <TableHead className="text-end">{t("table.columns.actions")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <UserRow
                key={`user-row-${user.id}`}
                user={user}
                isSelf={user.id === currentUserId}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AdminUsersTable;
