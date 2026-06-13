import { FileDown, FileText, Search } from "lucide-react";
import { getTranslations } from "next-intl/server";

const steps = [
  {
    number: "01",
    titleKey: "step1_title" as const,
    descKey: "step1_desc" as const,
    icon: <Search />,
  },
  {
    number: "02",
    titleKey: "step2_title" as const,
    descKey: "step2_desc" as const,
    icon: <FileText />,
  },
  {
    number: "03",
    titleKey: "step3_title" as const,
    descKey: "step3_desc" as const,
    icon: <FileDown />,
  },
];

export const HowItWorks = async () => {
  const t = await getTranslations("HomePage.how_it_works");

  return (
    <section className="bg-surface-container-lowest section-container py-20 md:py-28">
      {/* Section header */}
      <div className="mb-14 text-center">
        <h2 className="font-heading text-section-title text-on-surface font-bold">
          {t("title")}
        </h2>
        <p className="text-body-base text-on-surface-variant mt-3">
          {t("subtitle")}
        </p>
      </div>

      {/* Steps grid */}
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Connector line (desktop only) */}
        <div
          aria-hidden="true"
          className="via-primary/30 pointer-events-none absolute top-10 right-1/6 left-1/6 hidden h-px bg-linear-to-r from-transparent to-transparent md:block"
        />

        {steps.map(({ number, titleKey, descKey, icon }) => (
          <div
            key={number}
            className="group border-border bg-card hover:border-primary/40 relative flex flex-col items-center gap-5 rounded-2xl border p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Step number badge */}
            <div className="border-primary bg-card text-primary absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold tabular-nums">
              {number}
            </div>

            {/* Icon circle */}
            <div className="bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300">
              {icon}
            </div>

            {/* Text */}
            <div>
              <h3 className="font-heading text-card-title text-on-surface font-semibold">
                {t(titleKey)}
              </h3>
              <p className="text-table-cell text-on-surface-variant mt-2 leading-relaxed">
                {t(descKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
