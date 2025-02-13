import { Lang } from "@/i18n.config";
import { headers } from "next/headers";

export const getCurrentLang = async () => {
  const url = (await headers()).get("x-url");
  const lang = url?.split("/")[3] as Lang;
  return lang;
};
