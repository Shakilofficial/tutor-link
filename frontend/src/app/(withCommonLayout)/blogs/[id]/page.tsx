import PageHeader from "@/components/core/PageHeader";
import BlogDetails from "@/components/modules/blogs/BlogDetails";
import { getSingleBlog } from "@/services/blogService";

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: blog } = await getSingleBlog(id);

  return (
    <>
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
        {/*  <RelatedPosts category={blog.category} currentBlogId={blog._id} /> */}
      </div>
    </>
  );
};

export default BlogDetailsPage;
