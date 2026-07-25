import { BadgeCheckIcon, ShieldUser } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "@/components/shared/Avatar";
import Logout from "@/components/shared/Logout";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { getTranslations } from "next-intl/server";

const DropdownMenuAvatar = async () => {
  const [session, t] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    getTranslations("DropdownMenuAvatar"),
  ]);

  if (!session?.user) {
    return (
      <Button asChild variant="link">
        <Link className="cursor-pointer" href={ROUTES.SIGN_IN}>
          {t("signIn")}
        </Link>
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar name={session.user.name} image={session.user.image} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {session.user.role === "admin" && (
            <DropdownMenuItem>
              <Link
                className="flex items-center justify-between gap-1.5"
                href={ROUTES.ADMIN_PANEL}
              >
                <ShieldUser />
                {t("adminPanel")}
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link
              className="flex items-center justify-between gap-1.5"
              href={ROUTES.PROFILE(session.user.id)}
            >
              <BadgeCheckIcon />
              {t("profile")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Logout signOut={t("signOut")} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuAvatar;
