import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, CheckCircle2, Mail, Phone, XCircle } from "lucide-react";
import Image from "next/image";
import UpdateProfileDialog from "./UpdateProfile/UpdateProfileDialog";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
  phone: string;
  isVerified: boolean;
  createdAt: string;
}

const ProfileCard = ({ user }: { user: UserProfile }) => {
  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-32 bg-gradient-to-r from-primary to-orange-500/70" />
      </CardHeader>
      <CardContent className="pt-0 pb-6">
        <div className="flex flex-col items-center -mt-16">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background">
            <Image
              src={user.profileImage || "/placeholder.svg"}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
          <Badge variant="default" className="mt-2 capitalize">
            {user.role}
          </Badge>
          <div className="flex items-center mt-2">
            {user.isVerified ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-1" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500 mr-1" />
            )}
            <span className="text-sm text-muted-foreground">
              {user.isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4 flex flex-col items-center">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-primary" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-primary" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-primary" />
            <span>
              Joined on{" "}
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <UpdateProfileDialog user={user} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
