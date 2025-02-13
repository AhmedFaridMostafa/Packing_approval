"use client";
import { PackingHistory, SelectOption } from "@/type/interfaces";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import SelectField from "./form/SelectField";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Lang } from "@/i18n.config";
export interface Label {
  country?: string;
  action?: string;
  category?: string;
  action_by?: string;
  date?: string;
  labels?: string;
  label_name?: string;
  title?: string;
  description?: string;
  sort?: string;
  sortOptions?: {
    new: string;
    old: string;
  };
}
export interface ActionOptions {
  edit: string;
  delete: string;
  add: string;
}
export default function FilterHistory({
  packingHistory,
  label,
  actionOptions,
}: {
  packingHistory: PackingHistory[];
  label: Label;
  actionOptions: ActionOptions;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang } = useParams() as { lang: Lang };
  // Create query string with proper parameter handling
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  // Generate filter options with unique values
  const { countries, emails, actions } = useMemo(() => {
    const countries: SelectOption[] = [];
    const emails: SelectOption[] = [];
    const actions: SelectOption[] = [];

    const seenCountries = new Set<number>();
    const seenEmails = new Set<string>();
    const seenActions = new Set<string>();

    packingHistory.forEach((history) => {
      // Country filter
      if (!seenCountries.has(history.country_id)) {
        seenCountries.add(history.country_id);
        countries.push({
          value: `${history.country_id}%${history.country?.country_name[lang]}`,
          label: (
            <div className="flex items-center gap-2">
              <Image
                width={20}
                height={20}
                className="h-auto w-5"
                src={history.country!.flag_url}
                alt={history.country!.country_name[lang]}
              />
              <span className="ms-3">
                {history.country!.country_name[lang]} (
                {history.country!.account})
              </span>
            </div>
          ),
        });
      }

      // Email filter
      if (!seenEmails.has(history.changed_by)) {
        seenEmails.add(history.changed_by);
        emails.push({
          value: history.changed_by,
          label: history.changed_by,
        });
      }

      // Action filter
      if (!seenActions.has(history.action)) {
        seenActions.add(history.action);
        actions.push({
          value: history.action,
          label: actionOptions[history.action],
        });
      }
    });

    return { countries, emails, actions };
  }, [packingHistory, lang, actionOptions]);

  // Sort options
  const sortOptions: SelectOption[] = [
    { label: label.sortOptions?.new, value: "new" },
    { label: label.sortOptions?.old, value: "old" },
  ];

  return (
    <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-2">
      <SelectField
        options={countries}
        isClearable={true}
        value={
          countries.find(
            (option) =>
              option.value.split("%")[0] === searchParams.get("country_id"),
          ) || null
        }
        onChange={(item) => {
          const value = item?.value.split("%")[0] || "";
          router.push(`${pathname}?${createQueryString("country_id", value)}`);
        }}
        placeholder={label.country}
      />

      <SelectField
        options={emails}
        isClearable={true}
        value={
          emails.find(
            (option) => option.value === searchParams.get("changed_by"),
          ) || null
        }
        onChange={(item) => {
          router.push(
            `${pathname}?${createQueryString("changed_by", item?.value || "")}`,
          );
        }}
        placeholder={label.action_by}
      />

      <SelectField
        options={actions}
        isClearable={true}
        value={
          actions.find(
            (option) => option.value === searchParams.get("action"),
          ) || null
        }
        onChange={(item) => {
          router.push(
            `${pathname}?${createQueryString("action", item?.value || "")}`,
          );
        }}
        placeholder={label.action}
      />

      <SelectField
        options={sortOptions}
        isClearable={false}
        value={
          sortOptions.find(
            (option) => option.value === (searchParams.get("sort") || "new"),
          ) || sortOptions[0]
        }
        onChange={(item) => {
          router.push(
            `${pathname}?${createQueryString("sort", item?.value || "new")}`,
          );
        }}
        placeholder={label.sort}
      />
    </div>
  );
}
