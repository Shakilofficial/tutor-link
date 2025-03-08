"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IAvailability, ISlot, ISubject, ITutor } from "@/types";
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CreateBookingDialog from "../booking/CreateBookingDialog";

interface TutorDetailsCardProps {
  tutor: ITutor;
  children?: React.ReactNode;
}

const TutorDetailsCard = ({ tutor, children }: TutorDetailsCardProps) => {
  const [activeTab, setActiveTab] = useState("profile");

  const totalSlots = tutor.availability.reduce(
    (acc, day) => acc + day.slots.length,
    0
  );

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-6 max-w-screen-lg mx-auto">
      <Card className="overflow-hidden border-2 border-orange-800/20 shadow-lg">
        <CardHeader className="">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="rounded-full border-4 border-orange-800/30 p-1 shadow-lg">
                <Image
                  src={tutor.user.profileImage || "/placeholder.svg"}
                  alt={tutor.user.name}
                  width={120}
                  height={120}
                  className="rounded-full h-28 w-28 object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-orange-800 text-white text-xs font-bold px-2 py-1 rounded-full">
                ${tutor.hourlyRate}/hr
              </div>
            </div>

            <div className="text-center md:text-left">
              <CardTitle className="text-2xl md:text-3xl font-bold">
                {tutor.user.name}
              </CardTitle>
              <div className="flex items-center justify-center md:justify-start mt-2">
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
              <div className="flex items-center justify-center md:justify-start mt-2 text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4 text-orange-800" />
                {tutor.location}
              </div>
            </div>
            <div className="md:ml-auto">{children}</div>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3 bg-orange-800/20">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="subjects" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Subjects</span>
              </TabsTrigger>
              <TabsTrigger
                value="availability"
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Availability</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="pt-6">
            <TabsContent value="profile" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <User className="mr-2 h-5 w-5 text-orange-800" />
                  About Me
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {tutor.bio}
                </p>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-orange-800" />
                    Education
                  </h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <div className="h-2 w-2 mt-2 rounded-full bg-orange-800 mr-2"></div>
                      <span>
                        Master &apos;s in Education, University of Example
                        (2018-2020)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 mt-2 rounded-full bg-orange-800 mr-2"></div>
                      <span>
                        Bachelor &apos;s in Mathematics, Example College
                        (2014-2018)
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-orange-800" />
                    Experience
                  </h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <div className="h-2 w-2 mt-2 rounded-full bg-orange-800 mr-2"></div>
                      <span>5+ years of tutoring experience</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 mt-2 rounded-full bg-orange-800 mr-2"></div>
                      <span>Worked with 100+ students</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-orange-800" />
                  Contact Information
                </h3>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 rounded-md border border-border">
                    <Mail className="mr-2 h-5 w-5 text-orange-800" />
                    <span>{tutor.user.email}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-orange-800" />
                  Subjects I Teach
                </h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tutor.subjects.map((subject: ISubject, index) => (
                    <div
                      key={subject._id || `subject-${index}`}
                      className="flex items-start p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="mr-3 mt-1 flex-shrink-0 h-8 w-8 rounded-full bg-orange-800/10 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-orange-800" />
                      </div>
                      <div>
                        <h4 className="font-medium">{subject.name}</h4>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="bg-orange-800/5">
                            {subject.gradeLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="availability" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-orange-800" />
                  Available Time Slots
                  <Badge variant="outline" className="ml-2">
                    {totalSlots} slots
                  </Badge>
                </h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tutor.availability.map((day: IAvailability) => (
                    <div
                      key={day._id}
                      className="p-4 rounded-lg border border-border bg-card"
                    >
                      <h4 className="font-medium text-lg flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-orange-800" />
                        {day.day}
                      </h4>
                      <div className="mt-2 space-y-2">
                        {day.slots.map((slot: ISlot) => (
                          <div
                            key={slot._id}
                            className="flex items-center p-2 rounded bg-accent/50"
                          >
                            <Clock className="mr-2 h-4 w-4 text-orange-800" />
                            <span>
                              {formatTime(slot.start)} - {formatTime(slot.end)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
        <div className="flex justify-center">
          <CreateBookingDialog tutor={tutor} />
        </div>
      </Card>
    </div>
  );
};

export default TutorDetailsCard;
