import ManageBlogs from "@/components/modules/dashboard/admin/ManageBlogs";
import { getAllBlogs } from "@/services/blogService";

const BlogsDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllBlogs(page);
  console.log(data);
  console.log(meta);
  return (
    <div>
      <ManageBlogs blogs={data} meta={meta} />
    </div>
  );
};

export default BlogsDashboardPage;
