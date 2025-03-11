import PageHeader from "@/components/core/PageHeader";
import TutorLists from "@/components/modules/tutors/TutorLists";
import { getAllTutors } from "@/services/tutorService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllTutorsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const data = await getAllTutors(undefined, undefined, query);

  return (
    <div className="my-16">
      <PageHeader title="All Tutors" subtitle="Browse all tutors" />
      <TutorLists data={data} />
    </div>
  );
};

export default AllTutorsPage;
