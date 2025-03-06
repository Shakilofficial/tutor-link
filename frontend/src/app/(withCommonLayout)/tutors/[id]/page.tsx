import TutorDetailsCard from "@/components/modules/tutors/TutorDetailsCard";
import { getSingleSingleTutor } from "@/services/tutorService";

const TutorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: tutor } = await getSingleSingleTutor(id);
  console.log(tutor);
  return (
    <div>
      <div className="container mx-auto px-2 space-y-10 my-16">
        <TutorDetailsCard tutor={tutor} />
      </div>
    </div>
  );
};

export default TutorDetailsPage;
