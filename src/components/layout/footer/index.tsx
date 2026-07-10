import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";

const Footer = async () => {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-border bg-surface-container-lowest mt-auto border-t py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand block */}
          <div className="flex flex-col gap-3">
            <Link href={ROUTES.HOME} className="flex w-fit items-center gap-2">
              <Image
                alt="site logo"
                src="/site-logo.png"
                width={28}
                height={28}
              />
              <span className="font-heading text-primary text-lg font-bold">
                {t("title")}
              </span>
            </Link>
            <p className="text-caption text-on-surface-variant max-w-xs leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Legal block */}
          <div className="flex flex-col gap-3">
            <h3 className="text-on-surface text-sm font-semibold tracking-wide uppercase">
              {t("legal")}
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="#"
                  className="text-caption text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-caption text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-caption text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  {t("compliance")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources block */}
          <div className="flex flex-col gap-3">
            <h3 className="text-on-surface text-sm font-semibold tracking-wide uppercase">
              {t("resources")}
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="#"
                  className="text-caption text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  {t("support")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-border mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <p className="text-caption text-on-surface-variant">
            {t("copyright")}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="bg-success inline-block h-2 w-2 animate-pulse rounded-full" />
            <span className="text-caption text-on-surface-variant">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
