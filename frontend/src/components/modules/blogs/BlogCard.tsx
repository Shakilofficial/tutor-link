import { ShineBorder } from "@/components/magicui/shine-border";
import type { IBlog } from "@/types/blog";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="group h-full rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-all duration-300 bg-gradient-to-br from-background to-background/80 flex flex-col">
      <ShineBorder />
      <Link
        href={`/blogs/${blog._id}`}
        className="block overflow-hidden relative"
      >
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full shadow-md">
              {blog.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6 flex-1 flex flex-col">
        <Link
          href={`/blogs/${blog._id}`}
          className="block group-hover:text-primary transition-colors duration-300"
        >
          <h3 className="text-xl font-semibold line-clamp-2 mb-3">
            {blog.title}
          </h3>
        </Link>

        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
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

        <Link
          href={`/blogs/${blog._id}`}
          className="mt-4 inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
        >
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
