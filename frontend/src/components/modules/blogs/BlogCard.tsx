import type { IBlog } from "@/types/blog";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="group h-full rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-all duration-300 bg-card flex flex-col">
      <Link
        href={`/blog/${blog.slug}`}
        className="block overflow-hidden relative"
      >
        <div className="relative h-52 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
          <Image
            src={blog.thumbnail || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 text-xs font-medium bg-orange-500 text-white rounded-full">
              {blog.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <Link
          href={`/blog/${blog.slug}`}
          className="block group-hover:text-orange-500 transition-colors duration-300"
        >
          <h3 className="text-xl font-semibold line-clamp-2 mb-2">
            {blog.title}
          </h3>
        </Link>

        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-100">
                <Image
                  src={blog.author.profileImage || "/placeholder.svg"}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm">{blog.author.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
