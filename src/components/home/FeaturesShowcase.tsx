import { FileText, History, Languages, LockKeyhole } from "lucide-react";
import { getTranslations } from "next-intl/server";

const capabilities = [
  {
    titleKey: "bilingual_title" as const,
    descKey: "bilingual_desc" as const,
    blobColor: "bg-primary/10",
    icon: <Languages />,
  },
  {
    titleKey: "pdf_title" as const,
    descKey: "pdf_desc" as const,
    blobColor: "bg-success/10",
    icon: <FileText />,
  },
  {
    titleKey: "audit_title" as const,
    descKey: "audit_desc" as const,
    blobColor: "bg-warning/10",
    icon: <History />,
  },
  {
    titleKey: "role_title" as const,
    descKey: "role_desc" as const,
    blobColor: "bg-tertiary/10",
    icon: <LockKeyhole />,
  },
];

export const FeaturesShowcase = async () => {
  const t = await getTranslations("HomePage.capabilities");
  return (
    <section className="bg-surface-container-lowest py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-14 text-center">
          <h2 className="font-heading text-section-title text-on-surface font-bold">
            {t("title")}
          </h2>
          <p className="text-body-base text-on-surface-variant mx-auto mt-3 max-w-xl">
            {t("subtitle")}
          </p>
        </div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ titleKey, descKey, icon, blobColor }) => (
            <div
              key={titleKey}
              className="group border-border bg-card hover:border-primary/30 relative overflow-hidden rounded-2xl border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Decorative blob */}
              <div aria-hidden="true" className={`feature-blob ${blobColor}`} />

              {/* Icon */}
              <div className="bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300">
                {icon}
              </div>

              {/* Text */}
              <h3 className="font-heading text-card-title text-on-surface relative font-semibold">
                {t(titleKey)}
              </h3>
              <p className="text-table-cell text-on-surface-variant relative mt-2 leading-relaxed">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
