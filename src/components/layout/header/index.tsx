import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import NavigationLink from "./NavigationLink";
import { LanguageButton } from "./LanguageButton";
import { ModeToggle } from "./ModeToggle";
import DropdownMenuAvatar from "./DropdownMenuAvatar";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { MobileMenu } from "./MobileMenu";

const Header = async () => {
  const t = await getTranslations("Header");
  const links: LinkItem[] = t.raw("NavigationLinks");

  return (
    <header className="bg-surface-container-lowest border-b-border border-b px-4 py-4 sm:px-8">
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.HOME}
          className="flex flex-nowrap items-center gap-2 sm:gap-3"
        >
          <Image alt="site logo" src="/site-logo.png" width={32} height={32} />
          <span className="text-primary font-heading text-xl font-bold">
            {t("title")}
          </span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex flex-nowrap items-center">
            {links.map(({ href, text }) => (
              <li
                key={href}
                className="has-[.active]:border-b-primary border-b-2 border-b-transparent px-3 py-2"
              >
                <NavigationLink
                  className="text-body-base text-on-surface-variant [&.active]:text-primary"
                  href={href}
                >
                  {text}
                </NavigationLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageButton />
          <ModeToggle />
          <Suspense fallback={<Spinner />}>
            <DropdownMenuAvatar />
          </Suspense>
          <MobileMenu
            links={links}
            title={t("title")}
            description={t("description")}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
