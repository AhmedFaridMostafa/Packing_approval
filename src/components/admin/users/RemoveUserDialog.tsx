"use client";

import { useTransition, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { TriangleAlert, UserX } from "lucide-react";
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

const RemoveUserDialog = ({ open, onOpenChange, user }: UserDialogProps) => {
  const t = useTranslations("AdminUsersPage");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleConfirm = (event: MouseEvent) => {
    // AlertDialogAction closes the dialog on click; stay open until the request settles.
    event.preventDefault();

    startTransition(async () => {
      try {
        const response = await apiClient.users.removeUser(user.id);

        if (response.success) {
          toast.success(t("remove.success"));
          onOpenChange(false);
          router.refresh();
        } else {
          toast.error(response.error?.message ?? t("remove.error"));
        }
      } catch {
        toast.error(t("remove.error"));
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("remove.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("remove.description", { name: user.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="text-destructive bg-destructive/10 flex items-start gap-2 rounded-lg p-3">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-body-sm">
            {t("remove.warning", { name: user.name })}
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("actions.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {isPending ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <UserX className="h-4 w-4" />
            )}
            {t("actions.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveUserDialog;
