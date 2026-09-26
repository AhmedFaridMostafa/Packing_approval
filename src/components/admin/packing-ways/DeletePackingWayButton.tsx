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

interface DeletePackingWayButtonProps {
  id: string;
  labels: {
    delete: string;
    cancel: string;
    title: string;
    description: string;
    success: string;
    error: string;
  };
}

const DeletePackingWayButton = ({
  id,
  labels,
}: DeletePackingWayButtonProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const remove = () =>
    startTransition(async () => {
      try {
        const result = await apiClient.packingWays.deletePackingWay(id);
        if (result.success) {
          toast.success(labels.success);
          router.refresh();
        } else toast.error(result.error?.message ?? labels.error);
      } catch {
        toast.error(labels.error);
      }
    });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={pending}>
          {pending ? (
            <Spinner className="size-4" />
          ) : (
            <Trash2 className="text-destructive size-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{labels.title}</AlertDialogTitle>
          <AlertDialogDescription>{labels.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{labels.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={remove}>
            {labels.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeletePackingWayButton;
