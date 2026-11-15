"use client";

import { useTransition } from "react";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const Logout = ({
  signOut,
  logoutError,
}: {
  signOut: string;
  logoutError: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogOut = () =>
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.refresh();
          },
          onError: ({ error }) => {
            console.error("Logout error:", error);
            toast.error(logoutError);
          },
        },
      });
    });

  return (
    <Button
      onClick={handleLogOut}
      variant="ghost"
      className="cursor-pointer p-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent"
      disabled={isPending}
    >
      {isPending ? (
        <Spinner className="h-5 w-5" />
      ) : (
        <>
          <LogOutIcon />
          {signOut}
        </>
      )}
    </Button>
  );
};

export default Logout;
