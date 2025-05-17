import Link from "next/link";

import { SliderToggle } from "../sidebar/SliderToggle";
import { getCurrentUser } from "@/server/data-service";
import { User } from "@/type/interfaces";
import { Logout } from "./Logout";
import { TbLogin2 } from "react-icons/tb";
import Avatar from "./Avatar";

import { getCurrentLang } from "@/lib/getCurrentLang";
import LanguageSwitcher from "../profile/LanguageSwitcher";
import CloudImage from "../CloudImage";

export default async function Header() {
  const user = (await getCurrentUser()) as User | null;
  const lang = await getCurrentLang();
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="px-3 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <SliderToggle />
            <Link href={`/${lang}`} className="ms-2 flex md:me-24">
              <CloudImage
                width={40}
                height={40}
                src="My Brand/AL-Fared"
                className="me-3 h-10 w-10 sm:h-12 sm:w-12"
                alt="Logo"
              />
              <span className="hidden self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:inline sm:text-2xl">
                AL-Fared
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <Link
                href={`/${lang}/user/profile`}
                className={`flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 bg-gray-200 ${lang === "en" ? "pr-3" : "pl-3"} text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700`}
              >
                <Avatar user={user} />
              </Link>
            ) : (
              <Link
                className="flex gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-sm font-medium capitalize text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                href={`/${lang}/user/signin`}
              >
                <TbLogin2 className="h-5 w-5" />
              </Link>
            )}
            {user && <Logout />}
            <LanguageSwitcher variant="button" />
          </div>
        </div>
      </div>
    </nav>
  );
}
