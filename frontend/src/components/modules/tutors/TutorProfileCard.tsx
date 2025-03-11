import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ISubject, ITutor } from "@/types";
import { MapPin, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TutorProfileCard = ({ tutor }: { tutor: ITutor }) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-background to-background/80 border border-border rounded-xl p-4 hover:border-primary/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex flex-col space-y-3">
        <div className="relative mx-auto w-full h-64 overflow-hidden rounded-lg border-2 border-primary/30 group-hover:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md">
          <Image
            src={tutor.user.profileImage || "/placeholder.svg"}
            alt={tutor.user.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md transform translate-y-1 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            ${tutor.hourlyRate}/hr
          </div>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {tutor.user.name}
          </h3>
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4 text-primary" />
            <span className="truncate max-w-[180px]">{tutor.location}</span>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(tutor.averageRating)
                    ? "text-amber-400 fill-current"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            ({tutor.totalReviews || 0})
          </span>
        </div>

        <div className="flex justify-center flex-wrap gap-1.5">
          {tutor.subjects.slice(0, 3).map((subject: ISubject) => (
            <Badge
              key={subject._id}
              className="bg-orange-100 hover:bg-orange-200 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
              variant="secondary"
            >
              {subject.name}
            </Badge>
          ))}
          {tutor.subjects.length > 3 && (
            <Badge
              variant="outline"
              className="border-orange-200 text-orange-700 dark:border-orange-800/40 dark:text-orange-300"
            >
              +{tutor.subjects.length - 3}
            </Badge>
          )}
        </div>

        <Button
          className="w-full mt-2 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 text-primary-foreground border-none shadow-sm hover:shadow-md transition-all duration-300 group-hover:translate-y-0.5"
          asChild
        >
          <Link
            href={`/tutors/${tutor.id}`}
            className="flex items-center justify-center"
          >
            View Profile
            <Sparkles className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default TutorProfileCard;
