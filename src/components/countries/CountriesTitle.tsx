import { Badge } from "../ui/badge";
import type { _Translator } from "next-intl";

interface CountriesTitleProps {
  totalItems: number;
  translate: _Translator;
}

export function CountriesTitle({ totalItems, translate }: CountriesTitleProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <h1 className="font-heading text-on-surface flex items-center gap-3 text-2xl font-bold sm:text-3xl">
        {translate("title")}
        <Badge className="bg-accent text-caption text-primary p-3 tabular-nums">
          {translate("total_badge", { count: totalItems })}
        </Badge>
      </h1>
      <p className="text-body-base text-on-surface-variant max-w-xl">
        {translate("description")}
      </p>
    </div>
  );
}

export default CountriesTitle;
