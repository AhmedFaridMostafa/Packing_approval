import { Metadata } from "next";
import { User } from "@/type/interfaces";
import { getAllUsers, getCurrentUser } from "@/server/data-service";
import { redirect } from "next/navigation";

import hasPermission from "@/server/handlePermissions";
import UserTable from "@/components/table/UserTable";
import { getCurrentLang } from "@/lib/getCurrentLang";
import { Lang } from "@/i18n.config";
import getTrans from "@/lib/translation";

export const metadata: Metadata = {
  title: { absolute: "Users List" },
};

async function Page() {
  const user = (await getCurrentUser()) as User | null;
  if (!user || !hasPermission(user.role, "view:usersList")) redirect("/");
  const allUsers = (await getAllUsers()) as User[];
  const lang = (await getCurrentLang()) as Lang;
  const {
    usersPage: { title, form, userTable },
    role,
  } = await getTrans(lang);
  return (
    <div className="space-y-6 p-6 sm:p-8 md:space-y-8">
      <h1 className="header">{title}</h1>
      <UserTable users={allUsers} usersPage={{ form, userTable, role }} />
    </div>
  );
}
export default Page;
