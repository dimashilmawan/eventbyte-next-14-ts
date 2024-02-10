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
          key: "query",
          value: query,
          pathname,
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
  }, [query, searchParams, pathname, router]);

  return (
    <div className="flex-between w-full gap-3 rounded-md border border-input bg-primary-50 px-4 py-2 has-[:autofill]:bg-[rgb(232,240,254)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background">
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
        className="flex-1 bg-primary-50 outline-none"
      />
    </div>
  );
};
