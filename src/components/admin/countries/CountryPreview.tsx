import SmartImage from "@/components/shared/SmartImage";
import { Card } from "@/components/ui/card";
import { Eye, Globe, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

interface CountryPreviewProps {
  nameEn?: string;
  nameAr?: string;
  effectiveFlagUrl?: string;
  regionsCounts?: number;
}
const CountryPreview = ({
  nameEn,
  nameAr,
  effectiveFlagUrl,
  regionsCounts,
}: CountryPreviewProps) => {
  const t = useTranslations("CreateAndUpdateCountry");
  return (
    <Card className="border-border bg-card sticky top-24 rounded-2xl p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="text-primary h-5 w-5" />
          <h2 className="font-heading text-on-surface text-lg font-bold">
            {t("preview.title")}
          </h2>
        </div>
        <span className="bg-primary/10 text-primary text-caption rounded-full px-3 py-1 font-semibold">
          {t("preview.badge_subtitle")}
        </span>
      </div>

      <p className="text-caption text-on-surface-variant/80 mb-6 font-medium">
        {t("preview.description")}
      </p>

      {/* Country Card Preview Container */}
      <div className="border-border bg-surface-container-lowest card-hover relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Flag image or fallback */}
          <div className="border-border bg-surface-container-high relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border shadow-xs">
            {effectiveFlagUrl ? (
              <SmartImage
                src={effectiveFlagUrl}
                alt={nameEn || "Country flag preview"}
                fill
                sizes="64px"
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <Globe className="text-on-surface-variant/50 h-6 w-6" />
            )}
          </div>

          {/* Names */}
          <div className="flex flex-col">
            <h3 className="font-heading text-on-surface text-xl font-bold">
              {nameEn || t("preview.name_en_placeholder")}
            </h3>
            <p className="text-body-base text-primary font-semibold" dir="rtl">
              {nameAr || t("preview.name_ar_placeholder")}
            </p>
          </div>
        </div>

        {/* Footer metrics preview */}
        <div className="border-border/60 mt-6 flex items-center justify-between border-t pt-4">
          <span className="text-caption text-on-surface-variant flex items-center gap-1 font-medium">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            {t("preview.operational_regions", {
              count: regionsCounts ?? 0,
            })}
          </span>
          <span className="bg-accent text-primary text-caption rounded-md px-2.5 py-1 font-bold">
            {t("preview.status.active")}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CountryPreview;
