import PageHeader from "@/components/core/PageHeader";
import ProfileCard from "@/components/modules/user/ProfileCard";

import { getMyProfile } from "@/services/userService";

const ProfilePage = async () => {
  const { data: user } = await getMyProfile();

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Profile" subtitle={user?.name} />
      <div className="container mx-auto px-4 py-12">
        <ProfileCard user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
