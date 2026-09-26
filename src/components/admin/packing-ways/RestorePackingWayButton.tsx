"use client";
import { useTransition } from "react";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const RestorePackingWayButton = ({ id, labels }: {
  id: string;
  labels: { restore: string; success: string; error: string };
}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <Button
      size="sm"
      variant="outline"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          try {
            const result = await apiClient.packingWays.restorePackingWay(id);
            if (result.success) {
              toast.success(labels.success);
              router.refresh();
            } else toast.error(result.error?.message ?? labels.error);
          } catch {
            toast.error(labels.error);
          }
        })
      }
    >
      {pending ? (
        <Spinner className="me-1 size-4" />
      ) : (
        <RotateCcw className="me-1 size-4" />
      )}
      {labels.restore}
    </Button>
  );
}

export default RestorePackingWayButton;