import { Metadata } from "next";

// import ProfileData from "@/components/profile/ProfileData";
// import AppPreferences from "@/components/profile/AppPreferences";
// import ProfileForm from "@/components/profile/ProfileForm";
// import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

import { auth } from "@/lib/auth/auth";
import { redirect } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: { absolute: "Profile" },
};

async function ProfilePage({ params }: RouteParams) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { locale } = await params;
  if (!session?.user) return redirect({ href: ROUTES.SIGN_IN, locale });
  const messages = await getTranslations("userSetting");
  const user = session.user;
  // const { userSetting, role } = await getTrans(lang);
  return (
    // <div className="grid grid-cols-1 items-center justify-items-center gap-4 lg:grid-cols-2">
    //   <ProfileData user={user} profile={userSetting.profile} role={role} />
    //   <AppPreferences appSetting={userSetting.appSetting} />
    //   <ProfileForm
    //     user={user}
    //     profileInformation={userSetting.profileInformation}
    //   />
    //   <ChangePasswordForm changePassword={userSetting.changePassword} />
    // </div>
    <div>ProfilePage</div>
  );
}
export default ProfilePage;
