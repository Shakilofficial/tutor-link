import PageHeader from "@/components/core/PageHeader";
import TutorLists from "@/components/modules/tutors/TutorLists";
import { getAllTutors } from "@/services/tutorService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Tutors | TutorLink",
  description:
    "Browse all tutors and find the perfect one for your tutoring needs.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllTutorsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const data = await getAllTutors(undefined, undefined, query);

  return (
    <main className="flex flex-col min-h-screen overflow-hidden my-12 space-y-10">
      <PageHeader title="All Tutors" subtitle="Browse all tutors" />
      <TutorLists data={data} />
    </main>
  );
};

export default AllTutorsPage;
