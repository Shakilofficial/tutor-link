import StudentDashboard from "@/components/modules/dashboard/student/StudentDashboard";
import { getMetaData } from "@/services/metaService";

const StudentDashboardPage = async () => {
  const { data } = await getMetaData();

  return (
    <div>
      <StudentDashboard data={data} />
    </div>
  );
};

export default StudentDashboardPage;
