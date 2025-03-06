import Pagination from "@/components/core/Pagination";
import { ITutor, ITutorResponse } from "@/types";
import TutorProfileCard from "../TutorProfileCard";

const TutorLists = ({ data }: { data: ITutorResponse }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((tutor: ITutor) => (
          <TutorProfileCard key={tutor._id} tutor={tutor} />
        ))}
      </div>
      <div className="mt-8">
        <Pagination totalPage={data?.meta?.totalPage} />
      </div>
    </div>
  );
};

export default TutorLists;
