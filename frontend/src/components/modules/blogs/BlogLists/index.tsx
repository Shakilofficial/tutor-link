/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import Pagination from "@/components/core/Pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/constants/categories";
import type { IBlogResponse } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BlogCard from "../BlogCard";
import BlogFilterSidebar from "../BlogFilterSidebar";
import CreateBlogDialog from "../CreateBlog";
import SearchBlog from "../SearchBlog";

const BlogLists = ({ data }: { data: IBlogResponse }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleTabChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    category === "all"
      ? params.delete("category")
      : params.set("category", category);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          TutorLink Blog
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover insights, tips, and success stories from our tutoring
          community
        </p>
      </div>

      {/* Search Section */}
      <SearchBlog />

      {/* Filter and Write Blog Section */}
      <div className="flex items-center gap-4 justify-between">
        <BlogFilterSidebar />
        <CreateBlogDialog />
      </div>

      {/* Categories Tabs */}
      <div className="relative">
        {/* Left & Right Fade Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* Scrollable Tabs */}
        <ScrollArea className="w-full pb-2 relative">
          <Tabs
            value={searchParams.get("category") || "all"}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="h-auto w-full p-1 flex justify-start gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 animate-in slide-in-from-bottom-2
            ${category === "All" ? "mr-2" : ""}
            ${
              (searchParams.get("category") || "All") === category
                ? "bg-orange-500 text-white shadow-md"
                : "text-gray-600 hover:bg-orange-100 hover:text-orange-600"
            }`}
                >
                  {category === "All" ? "All Posts" : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </ScrollArea>
      </div>

      {/* Blog Grid */}
      {data?.data?.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.map((blog, index) => (
            <div
              key={blog._id}
              className="animate-in fade-in slide-in-from-bottom-3 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.meta?.totalPage > 1 && (
        <div className="mt-12">
          <Pagination totalPage={data?.meta?.totalPage} />
        </div>
      )}
    </div>
  );
};

export default BlogLists;
