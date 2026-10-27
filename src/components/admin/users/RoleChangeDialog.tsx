"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "@/i18n/navigation";

import { apiClient } from "@/lib/api-client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_ROLES } from "@/constants";

const RoleChangeDialog = ({ open, onOpenChange, user }: UserDialogProps) => {
  const t = useTranslations("AdminUsersPage");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentRole: Role = user.role === "admin" ? "admin" : "user";
  const [role, setRole] = useState<Role>(currentRole);

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        const response = await apiClient.users.updateRole(user.id, role);

        if (response.success) {
          toast.success(t("role_change.success"));
          onOpenChange(false);
          router.refresh();
        } else {
          toast.error(response.error?.message ?? t("role_change.error"));
        }
      } catch {
        toast.error(t("role_change.error"));
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("role_change.title")}</DialogTitle>
          <DialogDescription>
            {t("role_change.description", {
              name: user.name,
              current: t(`roles.${currentRole}`),
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Select
            value={role}
            onValueChange={(value) => setRole(value as Role)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {USER_ROLES.map((value) => (
                <SelectItem key={value} value={value}>
                  {t(`roles.${value}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {role === "admin" && (
            <p className="text-destructive text-caption flex items-center gap-1.5">
              <TriangleAlert className="h-3.5 w-3.5" />
              {t("role_change.warning")}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            {t("actions.cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isPending || role === currentRole}
          >
            {isPending ? <Spinner className="h-4 w-4" /> : t("actions.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleChangeDialog;
