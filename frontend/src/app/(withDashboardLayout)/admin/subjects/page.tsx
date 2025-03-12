import ManageSubjects from "@/components/modules/dashboard/admin/ManageSubjects";
import { getAllSubjects } from "@/services/subjectService";

const SubjectsDashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllSubjects(page);

  return (
    <div>
      <ManageSubjects subjects={data} meta={meta} />
    </div>
  );
};

export default SubjectsDashboardPage;
