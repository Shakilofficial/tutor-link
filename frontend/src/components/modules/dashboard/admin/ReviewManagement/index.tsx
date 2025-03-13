/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TTable } from "@/components/core/TTable";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Image from "next/image";

interface IReview {
  _id: string;
  student: {
    _id: string;
    user: {
      _id: string;
      name: string;
      profileImage: string;
    };
  };
  tutor: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface ReviewDisplayProps {
  reviews: IReview[];
}

const ReviewDisplay = ({ reviews }: ReviewDisplayProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get star rating display
  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-3.5 w-3.5 ${
              i < rating
                ? "text-amber-400 fill-amber-400"
                : "text-muted-foreground/30"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        <span className="ml-1 text-xs text-muted-foreground">{rating}</span>
      </div>
    );
  };

  const columns = [
    {
      accessorKey: "student",
      header: () => <div className="text-left">Student</div>,
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-primary/20">
            <Image
              src={
                row.original.student?.user?.profileImage ||
                "/placeholder.svg?height=32&width=32" ||
                "/placeholder.svg"
              }
              alt={row.original.student?.user?.name || "User"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium">
              {row.original.student?.user?.name || "Unknown User"}
            </div>
            <div className="text-xs text-muted-foreground">Student</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: () => <div className="text-left">Rating</div>,
      cell: ({ row }: { row: any }) => getRatingStars(row.original.rating),
    },
    {
      accessorKey: "comment",
      header: () => <div className="text-left">Review Content</div>,
      cell: ({ row }: { row: any }) => (
        <div className="max-w-xs">
          <div className="font-medium text-foreground">
            {row.original.comment}
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(row.original.createdAt)}</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
          Reviews
        </h1>
      </div>

      <div className="rounded-lg overflow-hidden">
        <TTable columns={columns} data={reviews} />
      </div>
    </motion.div>
  );
};

export default ReviewDisplay;
