"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import debounce from "lodash/debounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"

interface FilterSidebarProps {
  onFilterApplied?: () => void
  className?: string
}

const FilterSidebar = ({ onFilterApplied, className }: FilterSidebarProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // Create a memoized function for efficient url updates
  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString())

      // Update or remove each parameter
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "") {
          newParams.delete(key)
        } else {
          newParams.set(key, value)
        }
      })

      // Always reset to page 1 when filters change
      newParams.delete("page")

      return newParams.toString()
    },
    [searchParams],
  )

  // Apply filters with debouncing for text inputs
  const applyFilter = useCallback(
    (params: Record<string, string | null>) => {
      const queryString = createQueryString(params)
      router.replace(`${pathname}?${queryString}`)
      if (onFilterApplied) onFilterApplied()
    },
    [createQueryString, pathname, router, onFilterApplied],
  )

  // Debounced version for text inputs
  const debouncedApplyFilter = useMemo(() => debounce(applyFilter, 500), [applyFilter])

  // Get current filter values
  const currentSearchTerm = searchParams.get("searchTerm") || ""
  const currentLocation = searchParams.get("location") || ""
  const currentRating = searchParams.get("rating") || ""
  const currentAvailability = searchParams.get("availability") || ""
  const currentMinPrice = searchParams.get("minPrice") || ""
  const currentMaxPrice = searchParams.get("maxPrice") || ""
  const currentSortBy = searchParams.get("sortBy") || ""

  // Price range values for slider
  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentMinPrice ? Number.parseInt(currentMinPrice, 10) : 0,
    currentMaxPrice ? Number.parseInt(currentMaxPrice, 10) : 200,
  ])

  const availabilityDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const clearAllFilters = () => {
    router.replace(pathname)
    if (onFilterApplied) onFilterApplied()
  }

  // Handle price range change
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]])
  }

  // Apply price range after slider interaction ends
  const handlePriceRangeCommit = (values: number[]) => {
    applyFilter({
      minPrice: values[0].toString(),
      maxPrice: values[1].toString(),
    })
  }

  const activeFiltersCount = [
    currentSearchTerm,
    currentLocation,
    currentRating,
    currentAvailability,
    currentMinPrice,
    currentMaxPrice,
    currentSortBy,
  ].filter(Boolean).length

  return (
    <div className={cn("space-y-6", className)}>
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Active filters: {activeFiltersCount}</span>
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2 text-xs">
            Clear all
          </Button>
        </div>
      )}

      {/* Search Term */}
      <div className="space-y-2">
        <Label htmlFor="searchTerm" className="text-sm font-medium">
          Search By Subject
        </Label>
        <Input
          id="searchTerm"
          placeholder="Subject Name..."
          value={currentSearchTerm}
          onChange={(e) => debouncedApplyFilter({ searchTerm: e.target.value })}
          className="h-9"
        />
      </div>

      <Accordion
        type="multiple"
        defaultValue={["location", "rating", "availability", "price", "sort"]}
        className="space-y-2"
      >
        {/* Location */}
        <AccordionItem value="location" className="border-b-0">
          <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">Location</AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2">
              <Input
                placeholder="Enter location"
                value={currentLocation}
                onChange={(e) => debouncedApplyFilter({ location: e.target.value })}
                className="h-9"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating Filter */}
        <AccordionItem value="rating" className="border-b-0">
          <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">Rating</AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2">
              <Select value={currentRating} onValueChange={(value) => applyFilter({ rating: value })}>
                <SelectTrigger className="h-9">
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
          </AccordionContent>
        </AccordionItem>

        {/* Availability Filter */}
        <AccordionItem value="availability" className="border-b-0">
          <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">Availability</AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2">
              <Select value={currentAvailability} onValueChange={(value) => applyFilter({ availability: value })}>
                <SelectTrigger className="h-9">
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
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
            Price Range (${priceRange[0]} - ${priceRange[1]})
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2 space-y-6">
              <Slider
                defaultValue={[0, 200]}
                value={priceRange}
                min={0}
                max={500}
                step={5}
                onValueChange={handlePriceRangeChange}
                onValueCommit={handlePriceRangeCommit}
                className="mt-6"
              />
              <div className="flex gap-2 pt-2">
                <div className="space-y-1 w-1/2">
                  <Label htmlFor="minPrice" className="text-xs">
                    Min ($)
                  </Label>
                  <Input
                    id="minPrice"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value)
                      if (!isNaN(value)) {
                        setPriceRange([value, priceRange[1]])
                        applyFilter({ minPrice: value.toString() })
                      }
                    }}
                    className="h-8"
                  />
                </div>
                <div className="space-y-1 w-1/2">
                  <Label htmlFor="maxPrice" className="text-xs">
                    Max ($)
                  </Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value)
                      if (!isNaN(value)) {
                        setPriceRange([priceRange[0], value])
                        applyFilter({ maxPrice: value.toString() })
                      }
                    }}
                    className="h-8"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sort" className="border-b-0">
          <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">Sort By</AccordionTrigger>
          <AccordionContent>
            <div className="pt-1 pb-2">
              <Select value={currentSortBy} onValueChange={(value) => applyFilter({ sortBy: value })}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Sort options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourlyRate">Price: Low to High</SelectItem>
                  <SelectItem value="-hourlyRate">Price: High to Low</SelectItem>
                  <SelectItem value="-createdAt">Newest</SelectItem>
                  <SelectItem value="createdAt">Oldest</SelectItem>
                  <SelectItem value="-averageRating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button variant="outline" className="w-full mt-4" onClick={clearAllFilters}>
        Clear All Filters
      </Button>
    </div>
  )
}

export default FilterSidebar

