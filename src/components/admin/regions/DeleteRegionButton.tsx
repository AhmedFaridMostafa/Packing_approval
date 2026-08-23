"use client";

import { useTransition } from "react";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "@/i18n/navigation";

import { apiClient } from "@/lib/api-client";

import { Button } from "@/components/ui/button";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteRegionButtonProps {
  id: number;
  labels: {
    delete: string;
    cancel: string;
    confirmTitle: string;
    confirmDescription: string;
    success: string;
    error: string;
  };
}

const DeleteRegionButton = ({ id, labels }: DeleteRegionButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await apiClient.regions.deleteRegion(id);

        if (response.success) {
          toast.success(labels.success);
          router.refresh();
        } else {
          toast.error(response.error?.message ?? labels.error);
        }
      } catch {
        toast.error(labels.error);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          {isPending ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{labels.confirmTitle}</AlertDialogTitle>

          <AlertDialogDescription>
            {labels.confirmDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{labels.cancel}</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>
            {labels.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteRegionButton;
