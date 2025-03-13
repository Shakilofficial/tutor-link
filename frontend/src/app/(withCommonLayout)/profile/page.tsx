import PageHeader from "@/components/core/PageHeader";
import ProfileCard from "@/components/modules/user/ProfileCard";

import { getMyProfile } from "@/services/userService";

const ProfilePage = async () => {
  const { data: user } = await getMyProfile();

  return (
    <main className="flex flex-col min-h-screen overflow-hidden my-12 space-y-10">
      <PageHeader title="Profile" subtitle={user?.name} />
      <div className="container mx-auto px-4 py-12">
        <ProfileCard user={user} />
      </div>
    </main>
  );
};

export default ProfilePage;
