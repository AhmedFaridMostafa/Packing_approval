"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useDebouncer } from "@tanstack/react-pacer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { updateUrlQuery } from "@/lib/utils";

interface RegionsSearchProps {
  searchPlaceholder: string;
}

const GlobalSearch = ({ searchPlaceholder }: RegionsSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search_query") ?? "",
  );

  const debouncer = useDebouncer(
    (value: string) => {
      const newUrl = updateUrlQuery({
        params: searchParams.toString(),
        pathname,
        updates: { search_query: value },
      });
      router.push(newUrl);
    },
    { wait: 700 },
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncer.maybeExecute(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    debouncer.cancel();
    const newUrl = updateUrlQuery({
      params: searchParams.toString(),
      pathname,
      updates: { search_query: null },
    });
    router.push(newUrl);
  };

  return (
    <InputGroup className="h-12 w-full max-w-md">
      <InputGroupInput
        id="global-search"
        name="search"
        type="text"
        value={inputValue}
        onChange={handleSearchChange}
        placeholder={searchPlaceholder}
      />
      <InputGroupAddon>
        <Search className="h-5 w-5" />
      </InputGroupAddon>
      {inputValue && (
        <InputGroupAddon align="inline-end" onClick={handleClear}>
          <X className="h-5 w-5" />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

export default GlobalSearch;
