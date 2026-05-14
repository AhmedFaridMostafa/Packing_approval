import { Link } from "@/i18n/navigation";

// import { SliderToggle } from "../sidebar/SliderToggle";
import { Logout } from "./Logout";
import { LogIn } from "lucide-react";
import Avatar from "./Avatar";

import LanguageSwitcher from "../profile/LanguageSwitcher";
import CloudImage from "../CloudImage";
// auth
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";

export default async function Header() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="px-3 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            {/* <SliderToggle /> */}
            <Link href="/" className="ms-2 flex md:me-24">
              <CloudImage
                width={40}
                height={40}
                src="My Brand/AL-Fared"
                className="me-3 h-10 w-10 sm:h-12 sm:w-12"
                alt="Logo"
              />
              <span className="hidden self-center text-xl font-semibold whitespace-nowrap sm:inline sm:text-2xl dark:text-white">
                AL-Fared
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="cursor-pointer">
              {user ? (
                <Link href={ROUTES.PROFILE}>
                  <Avatar user={user} />
                </Link>
              ) : (
                <Link href={ROUTES.SIGN_IN}>
                  <LogIn className="h-5 w-5" />
                </Link>
              )}
            </Button>
            {user && <Logout />}
            <LanguageSwitcher variant="button" />
          </div>
        </div>
      </div>
    </nav>
  );
}
