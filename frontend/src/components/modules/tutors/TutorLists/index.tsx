import Pagination from "@/components/core/Pagination";
import { ITutor, ITutorResponse } from "@/types";
import FilterSidebar from "../FilterSidebar";
import TutorProfileCard from "../TutorProfileCard";

const TutorLists = ({ data }: { data: ITutorResponse }) => {
  return (
    <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 py-16">
      <FilterSidebar />
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 min-h-[700px] ">
          {data?.data?.map((tutor: ITutor) => (
            <TutorProfileCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
        <div className="mt-12">
          <Pagination totalPage={data?.meta?.totalPage} />
        </div>
      </div>
    </div>
  );
};

export default TutorLists;
