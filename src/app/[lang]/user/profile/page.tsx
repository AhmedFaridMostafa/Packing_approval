import { Metadata } from "next";
import { User } from "@/type/interfaces";
import { getCurrentUser } from "@/server/data-service";
import ProfileData from "@/components/profile/ProfileData";
import AppPreferences from "@/components/profile/AppPreferences";
import ProfileForm from "@/components/profile/ProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import { getCurrentLang } from "@/lib/getCurrentLang";
import { Lang } from "@/i18n.config";
import getTrans from "@/lib/translation";

export const metadata: Metadata = {
  title: { absolute: "Profile" },
};

async function Page() {
  const user = (await getCurrentUser()) as User | null;
  if (!user) throw new Error("The user not found");
  const lang = (await getCurrentLang()) as Lang;
  const { userSetting, role } = await getTrans(lang);
  return (
    <div className="grid grid-cols-1 items-center justify-items-center gap-4 lg:grid-cols-2">
      <ProfileData user={user} profile={userSetting.profile} role={role} />
      <AppPreferences appSetting={userSetting.appSetting} />
      <ProfileForm
        user={user}
        profileInformation={userSetting.profileInformation}
      />
      <ChangePasswordForm changePassword={userSetting.changePassword} />
    </div>
  );
}
export default Page;
