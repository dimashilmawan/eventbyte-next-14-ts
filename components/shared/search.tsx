"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const Search = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      let newUrl = "";

      // if query value is not '' | (NOT EMPTY)
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          pathname,
          key: "query",
          value: query,
          key2: "page",
          value2: "1",
        });
        // if query value is '' | (EMPTY)
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          pathname,
          keysToBeRemoved: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(debounceFn);

    // Just rerender if query value change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="flex-between w-full flex-[2] gap-2 rounded-md border border-input px-4 py-2 has-[:autofill]:bg-[rgb(232,240,254)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background">
      <label htmlFor="search">
        <SearchIcon className="h-5 w-5" />
      </label>
      <input
        id="search"
        name="search"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-5 flex-1 text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
};
