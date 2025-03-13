import PageHeader from "@/components/core/PageHeader";
import BlogDetails from "@/components/modules/blogs/BlogDetails";
import { getSingleBlog } from "@/services/blogService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Details | TutorLink",
  description:
    "Learn from experts in education and gain insights into the world of tutoring.",
};

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: blog } = await getSingleBlog(id);

  return (
    <main className="flex flex-col min-h-screen overflow-hidden my-12 space-y-10">
      <PageHeader
        title={blog.title}
        subtitle={`By ${blog.author.name} | ${new Date(
          blog.createdAt
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <BlogDetails blog={blog} />
        </div>
      </div>
    </main>
  );
};

export default BlogDetailsPage;
