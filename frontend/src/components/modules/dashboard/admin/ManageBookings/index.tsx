/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Pagination from "@/components/core/Pagination";
import { TTable } from "@/components/core/TTable";
import { Badge } from "@/components/ui/badge";
import { IBooking } from "@/types/booking";
import type { IMeta } from "@/types/subject";
import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign } from "lucide-react";
import Image from "next/image";

const ManageBookings = ({
  bookings,
  meta,
}: {
  bookings: IBooking[];
  meta: IMeta;
}) => {
  // Format date and time
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    const statusColors: Record<string, string> = {
      confirmed:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      pending:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      completed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    };

    return (
      statusColors[status.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300"
    );
  };

  // Get payment status badge color
  const getPaymentStatusBadgeColor = (status: string) => {
    const statusColors: Record<string, string> = {
      paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      pending:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      refunded:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };

    return (
      statusColors[status.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300"
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
                "/placeholder.svg?height=32&width=32"
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
            <div className="text-xs text-muted-foreground">
              {row.original.student?.location || ""}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "tutor",
      header: () => <div className="text-left">Tutor</div>,
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-primary/20">
            <Image
              src={
                row.original.tutor?.user?.profileImage ||
                "/placeholder.svg?height=32&width=32"
              }
              alt={row.original.tutor?.user?.name || "Tutor"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium">
              {row.original.tutor?.user?.name || "Unknown Tutor"}
            </div>
            <div className="text-xs text-muted-foreground">
              {row.original.tutor?.location || ""}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "subject",
      header: () => <div className="text-left">Subject</div>,
      cell: ({ row }: { row: any }) => (
        <Badge variant="outline" className="bg-accent/50">
          {row.original.subject?.name || "Unknown Subject"}
        </Badge>
      ),
    },
    {
      accessorKey: "schedule",
      header: () => <div className="text-left">Schedule</div>,
      cell: ({ row }: { row: any }) => (
        <div className="space-y-1">
          <div className="flex items-center text-xs">
            <Calendar className="h-3 w-3 mr-1 text-primary" />
            <span>{formatDate(row.original.startTime)}</span>
          </div>
          <div className="flex items-center text-xs">
            <Clock className="h-3 w-3 mr-1 text-primary" />
            <span>
              {formatTime(row.original.startTime)} -{" "}
              {formatTime(row.original.endTime)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Duration: {row.original.durationHours}{" "}
            {row.original.durationHours > 1 ? "hours" : "hour"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "payment",
      header: () => <div className="text-left">Payment</div>,
      cell: ({ row }: { row: any }) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm font-medium">
            <DollarSign className="h-3 w-3 mr-1 text-green-500" />$
            {row.original.amount}
          </div>
          <div className="text-xs text-muted-foreground">
            ${row.original.hourlyRate}/hour
          </div>
          <div className="text-xs text-muted-foreground capitalize">
            Method: {row.original.paymentMethod}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-left">Status</div>,
      cell: ({ row }: { row: any }) => (
        <div className="space-y-2">
          <Badge
            variant="secondary"
            className={getStatusBadgeColor(row.original.status)}
          >
            {row.original.status.charAt(0).toUpperCase() +
              row.original.status.slice(1)}
          </Badge>
          <Badge
            variant="outline"
            className={getPaymentStatusBadgeColor(row.original.paymentStatus)}
          >
            {row.original.paymentStatus.charAt(0).toUpperCase() +
              row.original.paymentStatus.slice(1)}
          </Badge>
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
          Booking Management
        </h1>
      </div>

      <div className="rounded-lg overflow-hidden">
        <TTable columns={columns} data={bookings} />
      </div>

      {meta && meta.totalPage > 1 && (
        <div className="flex items-center justify-center pt-2">
          <Pagination totalPage={meta.totalPage} />
        </div>
      )}
    </motion.div>
  );
};

export default ManageBookings;
