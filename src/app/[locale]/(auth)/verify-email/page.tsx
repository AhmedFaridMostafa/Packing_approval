"use client";

// UI Components
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

// Next.js
import { useSearchParams } from "next/navigation";

// Hooks
import { useTranslations } from "next-intl";
import {
  useState,
  useEffect,
  useTransition,
  useCallback,
  useMemo,
  useRef,
} from "react";

// lib
import { sendVerificationEmail } from "@/lib/auth/auth-client";

// Icons
import { MailCheck } from "lucide-react";

const VerifyEmailPage = () => {
  const t = useTranslations("Auth.Verify_email");
  const searchParams = useSearchParams();
  const email = useMemo(() => searchParams.get("email"), [searchParams]);
  const [isResending, startTransition] = useTransition();
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (countdown <= 0) return;
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [countdown > 0]);

  const handleResend = useCallback(() => {
    if (!email || countdown > 0) return;
    startTransition(async () => {
      try {
        await sendVerificationEmail({ email, callbackURL: "/" });
        toast.success(t("resendSuccess"));
        setCountdown(30);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t("resendError"));
      }
    });
  }, [email, countdown, t]);

  return (
    <div className="mt-10 flex flex-col items-center justify-center space-y-6 text-center">
      <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
        <MailCheck className="text-primary h-10 w-10" />
      </div>

      <div className="space-y-2">
        <h2 className="h2-bold text-dark100_light900">{t("title")}</h2>
        <p className="paragraph-regular text-dark500_light400">
          {t("description")}
        </p>
        <p className="small-regular text-dark500_light400 mt-4">
          {t("checkFolder")}
        </p>
      </div>

      {email && (
        <Button
          onClick={handleResend}
          disabled={isResending || countdown > 0}
          variant="outline"
          className="min-h-12 w-full px-4 py-3"
        >
          {isResending ? (
            <Spinner />
          ) : countdown > 0 ? (
            `${t("resendButton")} (${countdown}S)`
          ) : (
            t("resendButton")
          )}
        </Button>
      )}
    </div>
  );
};

export default VerifyEmailPage;
