import { getLocale, getTranslations } from "next-intl/server";
import { History, Calendar, User, CheckCircle2, ImageIcon } from "lucide-react";
import SmartImage from "@/components/shared/SmartImage";
import Lightbox from "@/components/Region/packing/Lightbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface PackingWaySavedCardProps {
  packingWay: PackingWayDetail;
}

const PackingWaySavedCard = async ({
  packingWay,
}: PackingWaySavedCardProps) => {
  const [t, locale] = await Promise.all([
    getTranslations("CreateAndUpdatePackingWay"),
    getLocale(),
  ]);
  const isRTL = locale === "ar";

  const savedCountryName = isRTL
    ? packingWay.country_name_ar
    : packingWay.country_name_en;

  const savedRegionLabel = isRTL
    ? packingWay.region_name_ar
    : packingWay.region_name_en;

  const savedCategoryName = isRTL
    ? packingWay.category_name_ar
    : packingWay.category_name_en;

  return (
    <Card className="border-border bg-surface-container-low/40 rounded-2xl p-5 shadow-xs transition-all">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-lg">
            <History className="size-4" />
          </div>
          <div>
            <h3 className="font-heading text-on-surface text-base font-bold">
              {t("preview.saved_title")}
            </h3>
            <p className="text-caption text-on-surface-variant/80">
              {t("preview.saved_desc")}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className="shrink-0 gap-1 border-emerald-600/30 bg-emerald-500/10 text-xs text-emerald-700 dark:text-emerald-400"
        >
          <CheckCircle2 className="size-3" />
          {t("preview.badge_saved")}
        </Badge>
      </div>

      {/* Original Card Container */}
      <div className="border-border bg-card overflow-hidden rounded-xl border shadow-xs">
        {/* Image Box */}
        <div className="bg-surface-container-high relative aspect-4/3 w-full overflow-hidden border-b">
          {packingWay.image_url ? (
            <>
              <SmartImage
                src={packingWay.image_url}
                alt={packingWay.title_en}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
                loading="lazy"
              />
              <Lightbox
                src={packingWay.image_url}
                alt={isRTL ? packingWay.title_ar : packingWay.title_en}
                desc={
                  isRTL
                    ? packingWay.description_ar || null
                    : packingWay.description_en || null
                }
              />
            </>
          ) : (
            <div className="text-on-surface-variant/40 flex h-full w-full flex-col items-center justify-center gap-1.5 p-4 text-center">
              <ImageIcon className="size-8" />
              <span className="text-caption font-medium">
                {t("preview.no_image")}
              </span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-4">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <Badge variant="secondary" className="text-caption font-semibold">
              {savedCategoryName}
            </Badge>

            <span className="bg-surface-container text-on-surface-variant text-caption flex items-center gap-1 rounded-md px-2 py-0.5 font-medium">
              {packingWay.country_flag_url && (
                <span className="relative inline-block size-3.5 overflow-hidden rounded-xs">
                  <SmartImage
                    src={packingWay.country_flag_url}
                    alt={savedCountryName}
                    fill
                    className="object-cover"
                  />
                </span>
              )}
              {savedCountryName}
            </span>

            <span className="text-caption text-on-surface-variant/80">
              • {savedRegionLabel}
            </span>
          </div>

          {/* Titles */}
          <h4 className="font-heading text-on-surface line-clamp-1 text-base font-bold">
            {isRTL ? packingWay.title_ar : packingWay.title_en}
          </h4>
          <p
            className="text-caption text-on-surface-variant/80 line-clamp-1 font-medium"
            dir={isRTL ? "ltr" : "rtl"}
          >
            {isRTL ? packingWay.title_en : packingWay.title_ar}
          </p>

          {/* Description preview */}
          {(packingWay.description_en || packingWay.description_ar) && (
            <p className="text-caption text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
              {isRTL
                ? packingWay.description_ar || packingWay.description_en
                : packingWay.description_en || packingWay.description_ar}
            </p>
          )}

          {/* Timestamp & User */}
          <div className="border-border/60 text-caption text-on-surface-variant/70 mt-3 flex items-center justify-between border-t pt-2.5">
            <span className="flex items-center gap-1 text-[11px]">
              <Calendar className="size-3" />
              {formatDate(packingWay.updated_at, isRTL)}
            </span>
            {packingWay.updated_by_name && (
              <span className="flex items-center gap-1 text-[11px]">
                <User className="size-3" />
                {packingWay.updated_by_name}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PackingWaySavedCard;
