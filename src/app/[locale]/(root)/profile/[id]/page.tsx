import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { UserRound } from "lucide-react";

import { checkApiAuth } from "@/lib/auth-helpers";
import { ROUTES } from "@/constants/routes";

import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import ProfileInformationForm from "@/components/profile/ProfileInformationForm";
import ProfileSummaryCard from "@/components/profile/ProfileSummaryCard";

export async function generateMetadata() {
  const t = await getTranslations("userSetting.profile.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

const ProfilePage = async ({ params }: RouteParams) => {
  const [{ id }, requestHeaders, t] = await Promise.all([
    params,
    headers(),
    getTranslations("userSetting.profile"),
  ]);

  const authCheck = await checkApiAuth(requestHeaders);
  if (!authCheck.authorized) redirect(ROUTES.SIGN_IN);

  if (!id || id !== authCheck.session.user.id) return notFound();

  return (
    <section className="bg-surface-container-lowest section-container min-h-screen py-10 sm:py-16">
      {/* Page Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
          <UserRound className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-heading text-on-surface text-2xl font-bold sm:text-3xl">
            {t("title")}
          </h1>
          <p className="text-body-base text-on-surface-variant mt-0.5">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ProfileSummaryCard user={authCheck.session.user} />
        <ProfileInformationForm user={authCheck.session.user} />
        <ChangePasswordForm />
      </div>
    </section>
  );
};

export default ProfilePage;
