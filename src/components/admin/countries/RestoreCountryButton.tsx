"use client";

import { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { apiClient } from "@/lib/api-client";

interface RestoreCountryButtonProps {
  slug: string;
  labels: {
    restore: string;
    success: string;
    error: string;
  };
}

const RestoreCountryButton = ({ slug, labels }: RestoreCountryButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRestore = () => {
    startTransition(async () => {
      try {
        const response = await apiClient.countries.restoreCountry(slug);
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
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={handleRestore}
      className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary font-medium transition-colors"
    >
      {isPending ? (
        <Spinner className="mr-1.5 h-4 w-4" />
      ) : (
        <RotateCcw className="mr-1.5 h-4 w-4" />
      )}
      {labels.restore}
    </Button>
  );
};

export default RestoreCountryButton;
