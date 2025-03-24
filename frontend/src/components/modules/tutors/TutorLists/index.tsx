"use client";

import Pagination from "@/components/core/Pagination";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ITutor, ITutorResponse } from "@/types";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import FilterSidebar from "../FilterSidebar";
import TutorProfileCard from "../TutorProfileCard";

const TutorLists = ({ data }: { data: ITutorResponse }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="w-full mx-auto mt-8">
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <p className="text-sm text-muted-foreground">
          Showing {data?.data?.length || 0} of {data?.meta?.total || 0} tutors
        </p>
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] md:w-[350px] p-0">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FilterSidebar
                onFilterApplied={() => setIsFilterOpen(false)}
                className="w-full"
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="hidden lg:block w-full lg:w-[280px] xl:w-[340px] shrink-0">
          <FilterSidebar />
        </div>
        <div className="flex-1">
          {data?.data?.length === 0 ? (
            <div className="w-full text-center py-12 px-4 bg-muted/30 rounded-lg flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground mb-3">
                No tutors found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/tutors")}
                className="mt-2"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {data?.data?.map((tutor: ITutor) => (
                <TutorProfileCard key={tutor._id} tutor={tutor} />
              ))}
            </div>
          )}

          {data?.meta?.totalPage > 1 && (
            <div className="mt-12 md:mt-16">
              <Pagination totalPage={data?.meta?.totalPage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorLists;
