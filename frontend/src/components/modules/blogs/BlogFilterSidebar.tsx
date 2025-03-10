/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownAZ, ArrowUpAZ, Clock, SortAsc } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const BlogFilterSidebar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set("sortBy", value) : params.delete("sortBy");
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const sortOptions = [
    {
      value: "-createdAt",
      label: "Newest First",
      icon: <Clock className="h-4 w-4 mr-2" />,
    },
    {
      value: "createdAt",
      label: "Oldest First",
      icon: <Clock className="h-4 w-4 mr-2 rotate-180" />,
    },
    {
      value: "-title",
      label: "Title (Z-A)",
      icon: <ArrowDownAZ className="h-4 w-4 mr-2" />,
    },
    {
      value: "title",
      label: "Title (A-Z)",
      icon: <ArrowUpAZ className="h-4 w-4 mr-2" />,
    },
  ];

  const currentSort = searchParams.get("sortBy") || "";
  const currentOption = sortOptions.find(
    (option) => option.value === currentSort
  );

  return (
    <div className="relative">
      <Select onValueChange={handleSortChange} value={currentSort}>
        <SelectTrigger className="w-[200px] bg-background border-muted transition-all duration-300 hover:border-orange-300 focus:border-orange-500 group">
          <div className="flex items-center">
            <SortAsc className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-orange-500 transition-colors duration-300" />
            <SelectValue placeholder="Sort By" />
          </div>
        </SelectTrigger>
        <SelectContent className="animate-in zoom-in-95 duration-200">
          {sortOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer transition-colors duration-200 hover:bg-orange-50 focus:bg-orange-50"
            >
              <div className="flex items-center">
                {option.icon}
                {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default BlogFilterSidebar;
