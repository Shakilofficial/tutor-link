import PageHeader from "@/components/core/PageHeader";
import TutorDetailsCard from "@/components/modules/tutors/TutorDetailsCard";
import { getSingleSingleTutor } from "@/services/tutorService";

const TutorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: tutor } = await getSingleSingleTutor(id);

  return (
    <div className="container mx-auto px-2 space-y-10 my-16">
      <PageHeader
        title="Tutor Details"
        subtitle={`Created By ${tutor.user.name} | at ${new Date(
          tutor.createdAt
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`}
      />
      <TutorDetailsCard tutor={tutor} />
    </div>
  );
};

export default TutorDetailsPage;
