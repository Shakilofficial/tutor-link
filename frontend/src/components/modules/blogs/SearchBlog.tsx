/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBlog = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearch = debounce((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    term ? params.set("searchTerm", term) : params.delete("searchTerm");
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative group">
      <div
        className={`absolute inset-0 bg-orange-200 opacity-20 rounded-lg blur-xl transition-all duration-300 ${
          isFocused ? "scale-105" : "scale-100"
        }`}
      ></div>
      <div className="relative">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-all duration-300 ${
            isFocused ? "text-orange-500" : ""
          }`}
        />
        <Input
          placeholder="Search blogs by title or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="py-6 px-12 text-lg rounded-lg border-muted bg-background/80 backdrop-blur-sm transition-all duration-300 focus-visible:ring-orange-500 focus-visible:border-orange-500"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-all duration-300"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
      <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"></div>
    </div>
  );
};

export default SearchBlog;
