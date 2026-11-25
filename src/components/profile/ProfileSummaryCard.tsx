"use client";

import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";

const ProfileSummaryCard = ({ user }: { user: ProfileSource }) => {
  const t = useTranslations("account.profile");

  return (
    <Card className="border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8">
      {/* Identity */}
      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <Avatar className="border-border h-24 w-24 border-2">
          {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}
          <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 text-center sm:text-start">
          <h2 className="font-heading text-on-surface truncate text-xl font-bold sm:text-2xl">
            {user.name}
          </h2>
          <p
            className="text-body-base text-on-surface-variant truncate"
            dir="ltr"
          >
            {user.email}
          </p>
          <div className="mt-2 flex justify-center sm:justify-start">
            <Badge
              className={
                user.role === "admin"
                  ? "bg-primary/10 text-primary"
                  : "bg-surface-container-high text-on-surface-variant"
              }
            >
              {user.role === "admin" ? t("roleAdmin") : t("roleUser")}
            </Badge>
          </div>
        </div>
      </div>

      <Separator className="bg-border my-6" />

      {/* Details */}
      <dl className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-on-surface-variant text-sm font-medium">
            {t("name")}
          </dt>
          <dd className="text-on-surface truncate text-sm font-semibold">
            {user.name}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-on-surface-variant text-sm font-medium">
            {t("email")}
          </dt>
          <dd
            className="text-on-surface truncate text-sm font-semibold"
            dir="ltr"
          >
            {user.email}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-on-surface-variant text-sm font-medium">
            {t("role")}
          </dt>
          <dd className="text-on-surface text-sm font-semibold">
            {user.role === "admin" ? t("roleAdmin") : t("roleUser")}
          </dd>
        </div>
      </dl>
    </Card>
  );
};

export default ProfileSummaryCard;
