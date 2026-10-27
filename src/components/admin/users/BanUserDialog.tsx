"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
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
import { Textarea } from "@/components/ui/textarea";
import { EXPIRY_BAN_OPTIONS } from "@/constants";

const BanUserDialog = ({ open, onOpenChange, user }: UserDialogProps) => {
  const t = useTranslations("AdminUsersPage");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [reason, setReason] = useState("");
  const [expiry, setExpiry] = useState<string>("permanent");

  const handleConfirm = () => {
    const seconds = EXPIRY_BAN_OPTIONS.find(
      (option) => option.value === expiry,
    )?.seconds;

    startTransition(async () => {
      try {
        const response = await apiClient.users.banUser(user.id, {
          reason: reason.trim() || undefined,
          expiresIn: seconds,
        });

        if (response.success) {
          toast.success(t("ban.success"));
          onOpenChange(false);
          router.refresh();
        } else {
          toast.error(response.error?.message ?? t("ban.error"));
        }
      } catch {
        toast.error(t("ban.error"));
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("ban.title")}</DialogTitle>
          <DialogDescription>
            {t("ban.description", { name: user.name })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="ban-reason" className="text-sm font-medium">
              {t("ban.reason_label")}
            </label>
            <Textarea
              id="ban-reason"
              value={reason}
              maxLength={500}
              placeholder={t("ban.reason_placeholder")}
              onChange={(event) => setReason(event.target.value)}
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="ban-expiry" className="text-sm font-medium">
              {t("ban.expiry_label")}
            </label>
            <Select value={expiry} onValueChange={setExpiry}>
              <SelectTrigger id="ban-expiry" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EXPIRY_BAN_OPTIONS.map(({ value, labelKey }) => (
                  <SelectItem key={value} value={value}>
                    {t(`ban.${labelKey}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? <Spinner className="h-4 w-4" /> : t("actions.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BanUserDialog;
