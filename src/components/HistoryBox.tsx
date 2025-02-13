import { PackingHistory } from "@/type/interfaces";
import Box from "./Box";
import Image from "next/image";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { VscGithubAction } from "react-icons/vsc";
import Badges from "./Badges";
import { MdEmail } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";

import { Lang } from "@/i18n.config";
import { getCurrentLang } from "@/lib/getCurrentLang";
import { ActionOptions, Label } from "./FilterHistory";

export default async function HistoryBox({
  packingHistory,
  label,
  actionOptions,
}: {
  packingHistory: PackingHistory[];
  label: Label;
  actionOptions: ActionOptions;
}) {
  const lang = (await getCurrentLang()) as Lang;

  const color: { [key: string]: "blue" | "green" | "red" } = {
    edit: "blue",
    add: "green",
    delete: "red",
  };
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {packingHistory.map((item: PackingHistory, index: number) => (
        <Box key={index} className="!space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Image
              width={20}
              height={20}
              className="h-5 w-auto"
              src={item?.country?.flag_url.trim() || ""}
              alt={item?.country?.country_name[lang] || ""}
            />
            <span className="text-nowrap font-semibold">
              {item?.country?.country_name[lang]}
            </span>
            <span className="text-nowrap font-semibold">
              ({item?.country?.account})
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex gap-2 text-nowrap font-semibold">
              <VscGithubAction className="h-5 w-5" />
              {label.action}:
            </span>
            <Badges
              color={color[item.action]}
              text={actionOptions[item.action]}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex gap-2 text-nowrap font-semibold">
              <TbCategory2 className="h-5 w-5" />
              {label.category}:
            </span>
            <span>{item.categories?.name[lang]}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex gap-2 text-nowrap font-semibold">
              <MdEmail className="h-5 w-5" />
              {label.action_by}:
            </span>
            <span>{item.changed_by}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex gap-2 text-nowrap font-semibold">
              <FaCalendarAlt className="h-5 w-5" />
              {label.date}:
            </span>
            <span>({format(item?.change_timestamp, "MM/dd/yyyy")})</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-nowrap font-semibold">{label.labels}: </span>
            <span>({item?.country?.labels})</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-nowrap font-semibold">
              {label.label_name}:
            </span>
            <span>({item?.country?.label_name})</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-nowrap font-semibold">{label.title}: </span>
            <span>({item.change_title.en})</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-nowrap font-semibold">
              {label.description}:
            </span>
            <span>({item.change_description.en})</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-nowrap font-semibold">{label.title}: </span>
            <span>({item.change_title.ar})</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-nowrap font-semibold">
              {label.description}:
            </span>
            <span>({item.change_description.ar})</span>
          </div>
        </Box>
      ))}
    </div>
  );
}
