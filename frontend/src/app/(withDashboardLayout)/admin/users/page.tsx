import ManageUser from "@/components/modules/dashboard/admin/ManageUser";
import { getAllUsers } from "@/services/userService";

const UsersDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllUsers(page);

  return (
    <div>
      <ManageUser users={data} meta={meta} />
    </div>
  );
};

export default UsersDashboardPage;
