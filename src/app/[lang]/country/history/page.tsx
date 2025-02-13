import FilterHistory from "@/components/FilterHistory";
import HistoryBox from "@/components/HistoryBox";
import { Lang } from "@/i18n.config";
import { getCurrentLang } from "@/lib/getCurrentLang";
import getTrans from "@/lib/translation";
import { getPackingHistory } from "@/server/data-service";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { sort = "new", ...filter } = await searchParams;
  const validSort = sort !== "new";
  const packingHistory = await getPackingHistory(validSort, filter);
  const lang = (await getCurrentLang()) as Lang;
  const translate = await getTrans(lang);

  const actionOptions = {
    edit: translate.edit,
    delete: translate.delete,
    add: translate.add,
  };

  return (
    <div>
      <h1 className="header">{translate.packingHistory.title}</h1>
      <FilterHistory
        packingHistory={packingHistory}
        label={translate.packingHistory.label}
        actionOptions={actionOptions}
      />
      <HistoryBox
        packingHistory={packingHistory}
        label={translate.packingHistory.label}
        actionOptions={actionOptions}
      />
    </div>
  );
}
