import { Link } from "@/i18n/navigation";
import { ArrowRight, FileText, MapPin } from "lucide-react";

type RegionsCardProps = {
  t: TranslateFn;
  regionUrl: string;
  labelName: string | null;
  labels: string[];
  account: string;
  guidelines_count: number;
};

const RegionsCard = ({
  t,
  regionUrl,
  labelName,
  labels,
  account,
  guidelines_count,
}: RegionsCardProps) => {
  return (
    <Link
      href={regionUrl}
      className="group border-border bg-card hover:border-primary/45 card-hover relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div aria-hidden="true" className="bg-primary/5 feature-blob" />

      <div>
        {/* Region title */}
        <div className="mb-4 flex items-center gap-2.5">
          <div className="bg-accent text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
            <MapPin className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-card-title text-on-surface truncate font-bold">
            {labelName}
          </h3>
        </div>

        {/* Account */}
        <div className="text-table-cell text-on-surface-variant mb-3 flex items-center gap-2">
          <span className="text-caption text-on-surface-variant/70 font-medium tracking-wider uppercase">
            {t("account_label")}:
          </span>
          <code className="bg-surface-container-high border-border text-on-surface rounded-md border px-2 py-0.5 font-mono text-xs font-semibold">
            {account}
          </code>
        </div>

        {/* Labels */}
        {labels.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-1.5">
            <span className="text-caption text-on-surface-variant/70 mr-1 font-medium tracking-wider uppercase rtl:mr-0 rtl:ml-1">
              {t("labels_label")}:
            </span>
            {labels.map((lbl) => (
              <span
                key={lbl}
                className="border-border bg-surface-container-low text-caption text-on-surface-variant inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium"
              >
                {lbl}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-border/50 relative mt-2 flex items-center justify-between border-t pt-4">
        <span className="text-caption text-primary inline-flex items-center gap-1 font-bold">
          <FileText className="h-3 w-3" aria-hidden="true" />
          {t("guidelines_badge", { count: guidelines_count })}
        </span>
        <ArrowRight className="text-primary rtl-flip h-5 w-5 opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 rtl:group-hover:-translate-x-1" />
      </div>
    </Link>
  );
};

export default RegionsCard;
