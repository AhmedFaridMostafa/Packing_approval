"use client";

import { useTransition } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "@/i18n/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function Logout() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handelLogOut = () => {
    startTransition(async () => {
      await authClient.signOut();
      router.refresh();
    });
  };

  return (
    <Button
      onClick={handelLogOut}
      variant="outline"
      className="cursor-pointer"
      disabled={isPending}
    >
      {isPending ? (
        <Spinner className="h-5 w-5" />
      ) : (
        <LogOut className="h-5 w-5" />
      )}
    </Button>
  );
}
