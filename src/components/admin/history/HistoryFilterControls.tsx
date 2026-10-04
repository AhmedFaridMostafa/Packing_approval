"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import GlobalSearch from "@/components/shared/GlobalSearch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUrlQuery } from "@/lib/utils";

interface HistoryFilterControlsProps {
  countries: Country[];
  regionsByCountry: Record<number, RegionOption[]>;
  categories: Category[];
  searchPlaceholder: string;
  allActions: string;
  allCountries: string;
  allRegions: string;
  allCategories: string;
  actionLabels: { create: string; update: string; delete: string };
}

const HistoryFilterControls = ({
  countries,
  regionsByCountry,
  categories,
  searchPlaceholder,
  allActions,
  allCountries,
  allRegions,
  allCategories,
  actionLabels,
}: HistoryFilterControlsProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const countryId = params.get("country_id");
  const regions = countryId ? (regionsByCountry[Number(countryId)] ?? []) : [];

  const update = (key: string, value: string) => {
    const newUrl = updateUrlQuery({
      params: params.toString(),
      pathname,
      updates: {
        [key]: value === "all" ? null : value,
      },
      remove: ["page"],
    });

    router.push(newUrl);
  };

  const updateCountry = (value: string) => {
    const newUrl = updateUrlQuery({
      params: params.toString(),
      pathname,
      updates: {
        country_id: value === "all" ? null : value,
      },
      remove: ["region_id", "page"],
    });

    router.push(newUrl);
  };

  return (
    <div className="flex flex-col flex-wrap gap-3 md:flex-row">
      <GlobalSearch searchPlaceholder={searchPlaceholder} />
      <Select
        value={params.get("action") ?? "all"}
        onValueChange={(value) => update("action", value)}
      >
        <SelectTrigger className="h-12! w-full sm:w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{allActions}</SelectItem>
          <SelectItem value="CREATE">{actionLabels.create}</SelectItem>
          <SelectItem value="UPDATE">{actionLabels.update}</SelectItem>
          <SelectItem value="DELETE">{actionLabels.delete}</SelectItem>
        </SelectContent>
      </Select>
      <Select value={countryId ?? "all"} onValueChange={updateCountry}>
        <SelectTrigger className="h-12! w-full sm:w-52">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{allCountries}</SelectItem>
          {countries.map((item) => (
            <SelectItem
              className="p-3"
              key={`country-${item.id}`}
              value={String(item.id)}
            >
              {item.name_en} — {item.name_ar}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={params.get("region_id") ?? "all"}
        onValueChange={(value) => update("region_id", value)}
        disabled={!countryId}
      >
        <SelectTrigger className="h-12! w-full sm:w-52">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{allRegions}</SelectItem>
          {regions.map((item) => (
            <SelectItem
              className="p-3"
              key={`region-${item.id}`}
              value={String(item.id)}
            >
              {item.label_name_en} — {item.label_name_ar}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={params.get("category_id") ?? "all"}
        onValueChange={(value) => update("category_id", value)}
      >
        <SelectTrigger className="h-12! w-full sm:w-52">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{allCategories}</SelectItem>
          {categories.map((item) => (
            <SelectItem
              className="p-3"
              key={`category-${item.id}`}
              value={String(item.id)}
            >
              {item.name_en} — {item.name_ar}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default HistoryFilterControls;
