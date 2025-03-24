/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"
import Pagination from "@/components/core/Pagination"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { categories } from "@/constants/categories"
import type { IBlogResponse } from "@/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import BlogCard from "../BlogCard"
import BlogFilterSidebar from "../BlogFilterSidebar"
import CreateBlogDialog from "../CreateBlog"
import SearchBlog from "../SearchBlog"
import { useMediaQuery } from "@/hooks/use-media-query"

const BlogLists = ({ data }: { data: IBlogResponse }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 640px)")

  const currentCategory = searchParams.get("category") || "All"

  const handleTabChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    category === "all" || category === "All" ? params.delete("category") : params.set("category", category)
    params.delete("page")
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-700">
      {/* Search Section */}
      <SearchBlog />

      {/* Filter and Write Blog Section */}
      <div className="flex items-center gap-4 justify-between">
        <BlogFilterSidebar />
        <CreateBlogDialog />
      </div>

      {/* Categories Tabs/Dropdown based on screen size */}
      <div className="relative">
        {isMobile ? (
          <div className="mb-6">
            <Select
              value={currentCategory}
              onValueChange={(value) => {
                if (value === "All") {
                  router.push("/blogs")
                } else {
                  handleTabChange(value)
                }
              }}
            >
              <SelectTrigger className="w-full mb-2 border rounded-xl">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-base py-2 cursor-pointer">
                    <div className="flex items-center">
                      <span>{category === "All" ? "All Posts" : category}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="relative">
            {/* Left & Right Fade Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

            {/* Scrollable Tabs */}
            <ScrollArea className="w-full pb-2 relative">
              <Tabs
                value={currentCategory}
                onValueChange={(value) => {
                  if (value === "All") {
                    router.push("/blogs")
                  } else {
                    handleTabChange(value)
                  }
                }}
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
                  currentCategory === category
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
        )}
      </div>

      {/* Blog Grid */}
      {data?.data?.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg min-h-[300px] flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button variant="outline" onClick={() => router.push("/blogs")}>
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 min-h-[400px]">
          {data?.data?.map((blog, index) => (
            <div
              key={blog._id}
              className="animate-in fade-in slide-in-from-bottom-3 duration-700 w-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}

      {data?.meta?.totalPage > 1 && (
        <div className="mt-12 md:mt-16">
          <Pagination totalPage={data?.meta?.totalPage} />
        </div>
      )}
    </div>
  )
}

export default BlogLists

