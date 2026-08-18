"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  AlertTriangle,
  FileQuestion,
  Home,
  Lock,
  LucideIcon,
  RotateCw,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

interface ErrorStateConfig {
  icon: LucideIcon;
  badgeClass: string;
  translationKey: string;
  isError: boolean;
  retryByDefault: boolean;
}

const genericConfig: ErrorStateConfig = {
  icon: AlertTriangle,
  badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
  translationKey: "generic",
  isError: true,
  retryByDefault: true,
};

const notFoundConfig: ErrorStateConfig = {
  icon: FileQuestion,
  badgeClass: "bg-primary/10 text-primary border-primary/20",
  translationKey: "not_found",
  isError: true,
  retryByDefault: false,
};

const unauthorizedConfig: ErrorStateConfig = {
  icon: Lock,
  badgeClass:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  translationKey: "unauthorized",
  isError: true,
  retryByDefault: false,
};

const networkConfig: ErrorStateConfig = {
  icon: WifiOff,
  badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
  translationKey: "network",
  isError: true,
  retryByDefault: true,
};

const statusConfig: Record<number, ErrorStateConfig> = {
  0: networkConfig,
  401: unauthorizedConfig,
  403: unauthorizedConfig,
  404: notFoundConfig,
  408: networkConfig,
};

function getConfig(
  status?: number,
  override?: ErrorStateConfig,
): ErrorStateConfig {
  if (override) return override;
  if (status === undefined) return genericConfig;
  return statusConfig[status] ?? genericConfig;
}

export const ErrorStateConfigs = {
  generic: genericConfig,
  notFound: notFoundConfig,
  unauthorized: unauthorizedConfig,
  network: networkConfig,
};

export interface ErrorStateProps {
  layout?: "page" | "card" | "compact";
  status?: number;
  configOverride?: ErrorStateConfig;
  message?: string;
  showRetry?: boolean;
  showHomeButton?: boolean;
  className?: string;
}

export default function ErrorState({
  layout = "page",
  status,
  configOverride,
  message,
  showRetry,
  showHomeButton,
  className,
}: ErrorStateProps) {
  const t = useTranslations("ErrorState");
  const config = getConfig(status, configOverride);
  const Icon = config.icon;

  const title = t(`${config.translationKey}.title`);
  const description = message || t(`${config.translationKey}.description`);

  const shouldShowRetry = showRetry ?? config.retryByDefault;
  const shouldShowHome =
    showHomeButton ??
    (layout === "page" ||
      config === notFoundConfig ||
      config === unauthorizedConfig);
  const role = config.isError ? "alert" : "status";

  const handleRetry = () => {
    window.location.reload();
  };

  if (layout === "compact") {
    return (
      <div
        role={role}
        className={cn(
          "border-border bg-card flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 shadow-xs",
          className,
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
              config.badgeClass,
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-on-surface font-heading text-sm font-semibold">
              {title}
            </p>
            <p className="text-on-surface-variant text-caption">
              {description}
            </p>
          </div>
        </div>

        {shouldShowRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            className="h-8 gap-1.5 rounded-lg text-xs font-semibold"
          >
            <RotateCw className="h-3.5 w-3.5" />
            {t("retry")}
          </Button>
        )}
      </div>
    );
  }

  if (layout === "card") {
    return (
      <div
        role={role}
        className={cn(
          "border-border bg-card flex flex-col items-center justify-center rounded-2xl border p-8 text-center shadow-sm sm:p-10",
          className,
        )}
      >
        <div
          className={cn(
            "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-xs",
            config.badgeClass,
          )}
        >
          <Icon className="h-7 w-7" />
        </div>

        <h3 className="font-heading text-on-surface text-lg font-bold sm:text-xl">
          {title}
        </h3>
        <p className="text-on-surface-variant text-body-sm mt-1.5 max-w-md">
          {description}
        </p>

        {(shouldShowRetry || shouldShowHome) && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {shouldShowRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="gap-2 rounded-xl font-semibold shadow-xs"
              >
                <RotateCw className="h-4 w-4" />
                {t("retry")}
              </Button>
            )}
            {shouldShowHome && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="gap-2 rounded-xl font-semibold"
              >
                <Link href={ROUTES.HOME}>
                  <Home className="h-4 w-4" />
                  {t("go_home")}
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <section
      role={role}
      className={cn(
        "section-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center",
        className,
      )}
    >
      <div
        className={cn(
          "mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border shadow-sm",
          config.badgeClass,
        )}
      >
        <Icon className="h-10 w-10" />
      </div>

      <h1 className="font-heading text-on-surface text-2xl font-bold sm:text-3xl lg:text-4xl">
        {title}
      </h1>
      <p className="text-on-surface-variant text-body-base mt-3 max-w-lg">
        {description}
      </p>

      {(shouldShowRetry || shouldShowHome) && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {shouldShowRetry && (
            <Button
              onClick={handleRetry}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 gap-2 rounded-xl px-6 font-semibold shadow-xs"
            >
              <RotateCw className="h-4 w-4" />
              {t("retry")}
            </Button>
          )}
          {shouldShowHome && (
            <Button
              asChild
              variant="outline"
              className="border-border h-11 gap-2 rounded-xl px-6 font-semibold shadow-xs"
            >
              <Link href={ROUTES.HOME}>
                <Home className="h-4 w-4" />
                {t("go_home")}
              </Link>
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
