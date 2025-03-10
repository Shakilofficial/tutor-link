import BlogLists from "@/components/modules/blogs/BlogLists";
import { getAllBlogs } from "@/services/blogService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllBlogsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const data = await getAllBlogs(undefined, undefined, query);

  return <div className="my-16">{<BlogLists data={data} />}</div>;
};

export default AllBlogsPage;
