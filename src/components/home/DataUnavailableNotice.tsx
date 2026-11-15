import { WifiOff } from "lucide-react";
import { getTranslations } from "next-intl/server";

const DataUnavailableNotice = async () => {
  const t = await getTranslations("HomePage.degraded");
  return (
    <section className="border-border bg-surface-container-low border-y py-12 md:py-16">
      <div className="section-container flex flex-col items-center gap-3 text-center">
        <span className="bg-warning/10 text-warning flex size-11 items-center justify-center rounded-full">
          <WifiOff className="size-5" aria-hidden="true" />
        </span>
        <h2 className="font-heading text-section-title text-on-surface font-bold">
          {t("title")}
        </h2>
        <p className="text-body-base text-on-surface-variant max-w-xl">
          {t("description")}
        </p>
      </div>
    </section>
  );
};

export default DataUnavailableNotice;
