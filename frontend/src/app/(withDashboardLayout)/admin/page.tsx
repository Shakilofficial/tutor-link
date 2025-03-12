import AdminDashboard from "@/components/modules/dashboard/admin/AdminDashboard";
import { getMetaData } from "@/services/metaService";

const AdminDashboardPage = async () => {
  const { data } = await getMetaData();

  return (
    <div>
      <AdminDashboard data={data} />
    </div>
  );
};

export default AdminDashboardPage;
