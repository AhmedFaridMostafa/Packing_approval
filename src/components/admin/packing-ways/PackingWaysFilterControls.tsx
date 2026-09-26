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

interface PackingWaysFilterControlsProps {
  countries: Country[];
  categories: Category[];
  searchPlaceholder: string;
  allCountries: string;
  allCategories: string;
}

const PackingWaysFilterControls = ({
  countries,
  categories,
  searchPlaceholder,
  allCountries,
  allCategories,
}: PackingWaysFilterControlsProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete(key);
    else next.set(key, value);
    next.delete("page");
    router.push(`${pathname}${next.size ? `?${next}` : ""}`);
  };

  return (
    <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
      <GlobalSearch searchPlaceholder={searchPlaceholder} />
      <Select
        value={params.get("country_id") ?? "all"}
        onValueChange={(value) => update("country_id", value)}
      >
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

export default PackingWaysFilterControls;
