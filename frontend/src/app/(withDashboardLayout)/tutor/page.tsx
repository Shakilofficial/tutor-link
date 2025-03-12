import TutorDashboard from "@/components/modules/dashboard/tutor/TutorDashboard";
import { getMetaData } from "@/services/metaService";

const TutorDashboardPage = async () => {
  const { data } = await getMetaData();

  return (
    <div>
      <TutorDashboard data={data} />
    </div>
  );
};

export default TutorDashboardPage;
