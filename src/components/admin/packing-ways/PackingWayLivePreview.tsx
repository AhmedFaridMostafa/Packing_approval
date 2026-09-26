"use client";

import { useWatch, type Control } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { Eye, Package, Sparkles } from "lucide-react";
import SmartImage from "@/components/shared/SmartImage";
import Lightbox from "@/components/Region/packing/Lightbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import useObjectUrl from "@/hooks/useObjectUrl";
import type { PackingWayFormValues } from "./PackingWayFormCard";

interface PackingWayLivePreviewProps {
  control: Control<PackingWayFormValues>;
  formData: PackingWayFormData;
  savedImageUrl?: string | null;
}

const PackingWayLivePreview = ({
  control,
  formData,
  savedImageUrl,
}: PackingWayLivePreviewProps) => {
  const t = useTranslations("CreateAndUpdatePackingWay");
  const isRTL = useLocale() === "ar";

  const {
    country_id: countryId,
    region_id: regionId,
    category_id: categoryId,
    title_en: titleEn,
    title_ar: titleAr,
    description_en: descriptionEn,
    description_ar: descriptionAr,
    image: imageFile,
  } = useWatch({ control });

  // Newly selected file wins; otherwise fall back to the saved image (edit mode)
  const stagedPreviewUrl = useObjectUrl(imageFile);
  const effectiveImageUrl = stagedPreviewUrl || savedImageUrl || null;

  // Resolve relational names from formData
  const selectedCountry = formData.countries.find(
    (c) => String(c.id) === countryId,
  );
  const selectedRegion = formData.regionsByCountry[Number(countryId)]?.find(
    (r) => String(r.id) === regionId,
  );
  const selectedCategory = formData.categories.find(
    (cat) => String(cat.id) === categoryId,
  );

  const liveCountryName = isRTL
    ? selectedCountry?.name_ar
    : selectedCountry?.name_en;

  const liveRegionLabel = isRTL
    ? selectedRegion?.label_name_ar
    : selectedRegion?.label_name_en;

  const liveCategoryName = isRTL
    ? selectedCategory?.name_ar
    : selectedCategory?.name_en;

  return (
    <Card className="border-primary/30 bg-card rounded-2xl p-5 shadow-sm transition-all">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-lg">
            <Eye className="size-4" />
          </div>
          <div>
            <h3 className="font-heading text-on-surface text-base font-bold">
              {t("preview.draft_title")}
            </h3>
            <p className="text-caption text-on-surface-variant/80">
              {t("preview.draft_desc")}
            </p>
          </div>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 shrink-0 gap-1 text-xs">
          <Sparkles className="size-3" />
          {t("preview.badge_draft")}
        </Badge>
      </div>

      {/* Live Card Container */}
      <div className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
        {/* Image Box */}
        <div className="bg-surface-container-high relative aspect-4/3 w-full overflow-hidden border-b">
          {effectiveImageUrl ? (
            <>
              <SmartImage
                src={effectiveImageUrl}
                alt={titleEn || "Draft packing way"}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                loading="lazy"
              />
              <Lightbox
                src={effectiveImageUrl}
                alt={
                  isRTL ? titleAr || titleEn || "" : titleEn || titleAr || ""
                }
                desc={
                  isRTL
                    ? descriptionAr || descriptionEn || null
                    : descriptionEn || descriptionAr || null
                }
              />
            </>
          ) : (
            <div className="text-on-surface-variant/40 flex h-full w-full flex-col items-center justify-center gap-1.5 p-4 text-center">
              <Package className="size-8" />
              <span className="text-caption font-medium">
                {t("preview.no_image")}
              </span>
            </div>
          )}
        </div>

        {/* Live Content Details */}
        <div className="p-4">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            {liveCategoryName ? (
              <Badge variant="secondary" className="text-caption font-semibold">
                {liveCategoryName}
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-caption text-muted-foreground"
              >
                {t("form.category.placeholder")}
              </Badge>
            )}

            {liveCountryName && (
              <span className="bg-surface-container text-on-surface-variant text-caption flex items-center gap-1 rounded-md px-2 py-0.5 font-medium">
                {selectedCountry?.flag_url && (
                  <span className="relative inline-block size-3.5 overflow-hidden rounded-xs">
                    <SmartImage
                      src={selectedCountry.flag_url}
                      alt={liveCountryName}
                      fill
                      className="object-cover"
                    />
                  </span>
                )}
                {liveCountryName}
              </span>
            )}
            {liveRegionLabel && (
              <span className="text-caption text-on-surface-variant/80">
                • {liveRegionLabel}
              </span>
            )}
          </div>

          {/* Live Titles */}
          <h4 className="font-heading text-on-surface line-clamp-1 text-base font-bold">
            {isRTL
              ? titleAr || t("form.title_ar.placeholder")
              : titleEn || t("form.title_en.placeholder")}
          </h4>
          <p
            className="text-caption text-on-surface-variant/80 line-clamp-1 font-medium"
            dir={isRTL ? "ltr" : "rtl"}
          >
            {isRTL
              ? titleEn || t("form.title_en.placeholder")
              : titleAr || t("form.title_ar.placeholder")}
          </p>

          {/* Live Description */}
          <p className="text-caption text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
            {isRTL
              ? descriptionAr || t("form.description_ar.placeholder")
              : descriptionEn || t("form.description_en.placeholder")}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PackingWayLivePreview;
