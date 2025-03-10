/* eslint-disable @typescript-eslint/no-unused-expressions */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterSidebar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const availabilityDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="w-full lg:w-72 space-y-6 pr-4">
      <div className="space-y-4">
        {/* Search Term */}
        <div className="space-y-2">
          <Label>Search Subject</Label>
          <Input
            placeholder="Subject Name..."
            value={searchParams.get("searchTerm") || ""}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Search By Location</Label>
          <Input
            placeholder="Enter location"
            value={searchParams.get("location") || ""}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <Label>Minimum Rating</Label>
          <Select
            value={searchParams.get("rating") || ""}
            onValueChange={(value) => handleFilterChange("rating", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="2">2+ Stars</SelectItem>
              <SelectItem value="1">1+ Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Availability Filter */}
        <div className="space-y-2">
          <Label>Availability Day</Label>
          <Select
            value={searchParams.get("availability") || ""}
            onValueChange={(value) => handleFilterChange("availability", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              {availabilityDays.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Hourly Rate Range</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={searchParams.get("minPrice") || ""}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={searchParams.get("maxPrice") || ""}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />
          </div>
        </div>

        {/* Sorting */}
        <div className="space-y-2">
          <Label>Sort By</Label>
          <Select
            value={searchParams.get("sortBy") || ""}
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort options" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourlyRate">Price: Low to High</SelectItem>
              <SelectItem value="-hourlyRate">Price: High to Low</SelectItem>
              <SelectItem value="-createdAt">Newest</SelectItem>
              <SelectItem value="createdAt">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => router.replace(pathname)}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
