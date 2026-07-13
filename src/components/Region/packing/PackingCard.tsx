import { Edit2, ImageIcon } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { Link } from "@/i18n/navigation";
import Lightbox from "@/components/Region/packing/Lightbox";

interface PackingCardProps extends PackingDetail {
  isAdmin: boolean;
  isRTL: boolean;
}

const PackingCard = ({
  isAdmin,
  isRTL,
  id,
  title_en,
  title_ar,
  image_url,
  description_en,
  description_ar,
}: PackingCardProps) => {
  const title = isRTL ? title_ar : title_en;
  const desc = isRTL ? description_ar : description_en;

  return (
    <div className="group border-border bg-card hover:border-primary/20 relative flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Image block */}
      <div className="bg-surface-container-high border-border relative aspect-4/3 w-full overflow-hidden border-b">
        {image_url ? (
          <>
            <SmartImage
              src={image_url}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <Lightbox src={image_url} alt={title} desc={desc} />
          </>
        ) : (
          <div className="bg-accent text-primary/40 flex h-full w-full items-center justify-center select-none">
            <ImageIcon className="size-10" />
          </div>
        )}

        {/* Admin Action float overlay */}
        {isAdmin && (
          <Link
            href={`/admin/packing-ways/${id}/edit`}
            className="bg-primary hover:bg-brand-hover absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-md transition-colors"
            aria-label="Edit packing way"
          >
            <Edit2 className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Content block */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-heading text-card-title text-on-surface mb-3 line-clamp-2 font-bold">
            {title}
          </h3>
          {desc && (
            <p className="text-table-cell text-on-surface-variant leading-relaxed transition-all duration-300">
              {desc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackingCard;
