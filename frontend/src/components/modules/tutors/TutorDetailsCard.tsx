"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ISubject, ITutor } from "@/types";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import CreateBookingDialog from "../booking/CreateBookingDialog";

const TutorDetailsCard = ({ tutor }: { tutor: ITutor }) => {
  return (
    <div className="space-y-6 max-w-screen-md mx-auto">
      <Card className="border-2 border-orange-900/20">
        <CardHeader>
          <CardTitle className="mx-auto text-2xl text-orange-500">
            Profile of {tutor.user.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:w-1/3">
              <Avatar className="h-32 w-32 border-4 border-primary">
                <AvatarImage
                  src={tutor?.user.profileImage}
                  alt={tutor?.user.name}
                />
              </Avatar>

              <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={`star-${index}`}
                    className={`h-5 w-5 ${
                      index < Math.round(tutor.averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm">
                  ({tutor.totalReviews}{" "}
                  {tutor.totalReviews === 1 ? "review" : "reviews"})
                </span>
              </div>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {tutor.location}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">About Me</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tutor.bio}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Subjects</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tutor.subjects.map((subject: ISubject, index) => (
                    <Badge
                      key={subject._id || `subject-${index}`}
                      variant="outline"
                      className="bg-amber-800/50"
                    >
                      {subject.name} ({subject.gradeLevel})
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Clock className="mr-1 h-5 w-5 text-primary" />
                  <span className="font-medium">${tutor.hourlyRate}</span>
                  <span className="text-muted-foreground">/hour</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-5 w-5 text-primary" />
                  <span>{tutor.availability.length} available time slots</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="flex justify-center">
          <CreateBookingDialog tutor={tutor} />
        </div>
      </Card>
    </div>
  );
};

export default TutorDetailsCard;
