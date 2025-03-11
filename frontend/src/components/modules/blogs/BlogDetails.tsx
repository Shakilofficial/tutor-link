import { Badge } from "@/components/ui/badge";
import type { IBlog } from "@/types/blog";
import { Calendar } from "lucide-react";
import Image from "next/image";

const BlogDetails = ({ blog }: { blog: IBlog }) => {
  return (
    <article className="bg-card shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-[400px] w-full">
        <Image
          src={blog.thumbnail || "/placeholder.svg"}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <Badge className="bg-primary text-primary-foreground">
            {blog.category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center mb-6">
          <Image
            src={blog.author.profileImage || "/placeholder.svg"}
            alt={blog.author.name}
            width={40}
            height={40}
            className="rounded-full mr-4"
          />
          <div>
            <p className="font-semibold">{blog.author.name}</p>
            <p className="text-sm text-muted-foreground">Author</p>
          </div>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogDetails;
