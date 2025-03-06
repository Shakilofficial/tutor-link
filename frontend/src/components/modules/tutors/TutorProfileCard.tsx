import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ISubject, ITutor } from "@/types";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";

const TutorProfileCard = ({ tutor }: { tutor: ITutor }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md bg-gradient-to-l from-orange-400/10 to-rose-400/10 border border-orange-500/50 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={tutor.user.profileImage} alt={tutor.user.name} />
            <AvatarFallback>{tutor.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{tutor.user.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {tutor.location}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(tutor.averageRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              ({tutor.totalReviews}{" "}
              {tutor.totalReviews === 1 ? "review" : "reviews"})
            </span>
          </div>
          <span className="font-medium">${tutor.hourlyRate}/hr</span>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Subjects:</h4>
          <div className="flex flex-wrap gap-2">
            {tutor.subjects.slice(0, 3).map((subject: ISubject) => (
              <Badge key={subject._id} variant="secondary">
                {subject.name} ({subject.gradeLevel})
              </Badge>
            ))}
            {tutor.subjects.length > 3 && (
              <Badge variant="outline">+{tutor.subjects.length - 3} more</Badge>
            )}
          </div>
        </div>

        <Button className="w-full mt-4" asChild>
          <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TutorProfileCard;
