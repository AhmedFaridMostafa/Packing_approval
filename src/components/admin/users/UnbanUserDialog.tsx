"use client";

import { useTransition, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { Undo2 } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "@/i18n/navigation";

import { apiClient } from "@/lib/api-client";

import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const UnbanUserDialog = ({ open, onOpenChange, user }: UserDialogProps) => {
  const t = useTranslations("admin.users.list");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleConfirm = (event: MouseEvent) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        const response = await apiClient.users.unbanUser(user.id);
        if (response.success) {
          toast.success(t("toasts.unbanSuccess"));
          onOpenChange(false);
          router.refresh();
        } else {
          toast.error(response.error?.message ?? t("toasts.unbanError"));
        }
      } catch {
        toast.error(t("toasts.unbanError"));
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("dialogs.unban.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("dialogs.unban.description", { name: user.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("actions.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isPending}>
            {isPending ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <Undo2 className="h-4 w-4" />
            )}
            {t("actions.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnbanUserDialog;
