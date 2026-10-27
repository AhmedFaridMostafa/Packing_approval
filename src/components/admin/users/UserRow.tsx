"use client";

import { useState, type ComponentType } from "react";
import { useFormatter, useTranslations } from "next-intl";
import {
  BadgeCheck,
  Ban,
  MoreHorizontal,
  ShieldCheck,
  Undo2,
  UserX,
  XCircle,
} from "lucide-react";

import Avatar from "@/components/shared/Avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { USER_REMOVED_MARKER } from "@/constants";
import { cn, isBanExpired } from "@/lib/utils";

import BanUserDialog from "./BanUserDialog";
import RemoveUserDialog from "./RemoveUserDialog";
import RoleChangeDialog from "./RoleChangeDialog";
import UnbanUserDialog from "./UnbanUserDialog";

type UserStatus = "active" | "banned" | "removed";
type MenuAction = "role" | "ban" | "unban" | "remove";

const DIALOGS = {
  role: RoleChangeDialog,
  ban: BanUserDialog,
  unban: UnbanUserDialog,
  remove: RemoveUserDialog,
} satisfies Record<MenuAction, ComponentType<UserDialogProps>>;

const STATUS_STYLES: Record<UserStatus, string> = {
  active: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
  banned: "border-destructive/20 bg-destructive/10 text-destructive",
  removed: "border-border bg-muted text-muted-foreground",
};

const getUserStatus = (user: AdminUser): UserStatus => {
  if (!user.banned) return "active";
  if (user.banReason === USER_REMOVED_MARKER) return "removed";
  return isBanExpired(user.banExpires) ? "active" : "banned";
};

interface UserRowProps {
  user: AdminUser;
  isSelf: boolean;
}

const UserRow = ({ user, isSelf }: UserRowProps) => {
  const t = useTranslations("AdminUsersPage");
  const format = useFormatter();
  const [action, setAction] = useState<MenuAction | null>(null);

  const status = getUserStatus(user);
  const isAdmin = user.role === "admin";
  const actionsDisabled = isSelf || status === "removed";
  const ActiveDialog = action ? DIALOGS[action] : null;

  const formatDate = (date: string | number | Date) =>
    format.dateTime(new Date(date), { dateStyle: "medium" });

  const verifiedLabel = user.emailVerified
    ? t("email_verified")
    : t("email_not_verified");

  const banTooltip =
    status === "banned"
      ? [
          user.banReason &&
            t("status.banned_reason", { reason: user.banReason }),
          user.banExpires &&
            t("status.banned_until", { date: formatDate(user.banExpires) }),
        ]
          .filter(Boolean)
          .join(" · ") || undefined
      : undefined;

  return (
    <TableRow className="border-border hover:bg-surface-container-low/40 transition-colors">
      {/* User */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar name={user.name} image={user.image} className="h-9 w-9" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate font-bold">{user.name}</span>
              {isSelf && (
                <Badge className="border-primary/20 bg-primary/10 text-primary font-semibold">
                  {t("you_badge")}
                </Badge>
              )}
              <span title={verifiedLabel} role="img" aria-label={verifiedLabel}>
                {user.emailVerified ? (
                  <BadgeCheck className="h-4 w-4 text-emerald-500" />
                ) : (
                  <XCircle className="text-muted-foreground/50 h-4 w-4" />
                )}
              </span>
            </div>
            <div className="text-caption truncate">{user.email}</div>
          </div>
        </div>
      </TableCell>

      {/* Role */}
      <TableCell>
        <Badge
          variant={isAdmin ? "default" : "outline"}
          className={cn(
            isAdmin &&
              "border-amber-500/20 bg-amber-500/10 font-semibold text-amber-600",
          )}
        >
          {t(isAdmin ? "roles.admin" : "roles.user")}
        </Badge>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge
          title={banTooltip}
          className={cn("font-semibold", STATUS_STYLES[status])}
        >
          {t(`status.${status}`)}
        </Badge>
      </TableCell>

      {/* Joined */}
      <TableCell className="whitespace-nowrap">
        {formatDate(user.createdAt)}
      </TableCell>

      {/* Actions */}
      <TableCell className="text-end">
        {actionsDisabled ? (
          <span className="text-muted-foreground/40 inline-flex h-9 w-9 items-center justify-center">
            —
          </span>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("table.actions")}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setAction("role")}>
                  <ShieldCheck className="h-4 w-4" />
                  {t("actions.change_role")}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {status === "banned" ? (
                  <DropdownMenuItem onSelect={() => setAction("unban")}>
                    <Undo2 className="h-4 w-4" />
                    {t("actions.unban")}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onSelect={() => setAction("ban")}>
                    <Ban className="h-4 w-4" />
                    {t("actions.ban")}
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-destructive"
                  onSelect={() => setAction("remove")}
                >
                  <UserX className="h-4 w-4" />
                  {t("actions.remove")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {ActiveDialog && (
              <ActiveDialog
                open
                onOpenChange={(open) => !open && setAction(null)}
                user={user}
              />
            )}
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
