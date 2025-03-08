import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ISubject, ITutor } from "@/types";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TutorProfileCard = ({ tutor }: { tutor: ITutor }) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:border-orange-300 dark:hover:border-orange-700">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="flex flex-col space-y-2">
        <div className="relative mx-auto w-full h-60 overflow-hidden rounded-lg border-2 border-orange-500/50 group-hover:border-orange-500 transition-all duration-300 shadow-sm group-hover:shadow-md">
          <Image
            src={tutor.user.profileImage || "/placeholder.svg"}
            alt={tutor.user.name}
            width={150}
            height={150}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md transform translate-y-1 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            ${tutor.hourlyRate}/hr
          </div>
        </div>

        <div className="text-center space-y-0.5">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">
            {tutor.user.name}
          </h3>
          <div className="flex items-center justify-center text-xs text-gray-600 dark:text-gray-400">
            <MapPin className="mr-0.5 h-3 w-3 text-orange-500" />
            <span className="truncate max-w-[150px]">{tutor.location}</span>
          </div>
        </div>

        <div className="flex justify-center items-center -mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.round(tutor.averageRating)
                    ? "text-amber-400 fill-current"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
            ({tutor.totalReviews || 0})
          </span>
        </div>

        <div className="flex justify-center flex-wrap gap-1 -mt-1">
          {tutor.subjects.slice(0, 2).map((subject: ISubject) => (
            <Badge
              key={subject._id}
              className="text-[10px] py-0 px-1.5 bg-orange-100 hover:bg-orange-200 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
              variant="secondary"
            >
              {subject.name}
            </Badge>
          ))}
          {tutor.subjects.length > 2 && (
            <Badge
              variant="outline"
              className="text-[10px] py-0 px-1.5 border-orange-200 text-orange-700 dark:border-orange-800/40 dark:text-orange-300"
            >
              +{tutor.subjects.length - 2}
            </Badge>
          )}
        </div>

        <Button
          className="w-full mt-1 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white border-none shadow-sm hover:shadow-md transition-all duration-300 group-hover:translate-y-0.5"
          size="sm"
          asChild
        >
          <Link href={`/tutors/${tutor.id}`} className="text-xs py-1">
            View Profile
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default TutorProfileCard;
