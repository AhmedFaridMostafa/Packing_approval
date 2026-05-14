import Image from "next/image";
import { ArrowBigLeftDash } from "lucide-react";
import notFound from "../../../public/icons/404.svg";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";
import { getTranslations } from "next-intl/server";

const NotFound = async () => {
  const t = await getTranslations("NotFound");
  return (
    <section className="mx-auto flex h-full flex-col items-center justify-center space-y-2 px-6">
      <div className="relative max-w-80">
        <Image src={notFound} alt="Not_Found" className="h-auto w-full" />
      </div>
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          {t("title")}
        </h1>
        <p className="text-3xl font-semibold">{t("message")}</p>
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white capitalize hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <ArrowBigLeftDash /> {t("goHome")}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
