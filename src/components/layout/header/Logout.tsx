"use client";

import { useTransition } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "@/i18n/navigation";
import { LogOutIcon } from "lucide-react";
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
      variant="ghost"
      className="cursor-pointer p-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent"
      disabled={isPending}
    >
      {isPending ? (
        <Spinner className="h-5 w-5" />
      ) : (
        <>
          <LogOutIcon />
          Sign Out
        </>
      )}
    </Button>
  );
}
