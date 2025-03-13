import PageHeader from "@/components/core/PageHeader";
import BlogLists from "@/components/modules/blogs/BlogLists";
import { getAllBlogs } from "@/services/blogService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | TutorLink",
  description: "Explore all blogs and learn from experts in education.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllBlogsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const data = await getAllBlogs(undefined, undefined, query);

  return (
    <main className="flex flex-col min-h-screen overflow-hidden my-12 space-y-10">
      <PageHeader title="All Blogs" subtitle="Explore all blogs" />
      {<BlogLists data={data} />}
    </main>
  );
};

export default AllBlogsPage;
