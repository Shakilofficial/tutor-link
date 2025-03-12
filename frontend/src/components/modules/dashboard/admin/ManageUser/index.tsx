/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Pagination from "@/components/core/Pagination";
import { TTable } from "@/components/core/TTable";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toggleUserVerify, updateStatus } from "@/services/userService";
import { IMeta } from "@/types/subject";

import type { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type IUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  profileImage: string;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

const ManageUser = ({ users, meta }: { users: IUser[]; meta: IMeta }) => {
  const handleUpdateStatus = async (id: string) => {
    try {
      const res = await updateStatus(id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error("Failed to update status", error.message);
    }
  };

  const handleToggleVerify = async (id: string) => {
    try {
      const res = await toggleUserVerify(id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error("Failed to toggle verification", error.message);
    }
  };

  // Define role colors
  const getRoleColor = (role: string) => {
    const roles: Record<string, string> = {
      admin:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      tutor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      student:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    };

    return (
      roles[role.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300"
    );
  };

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "profileImage",
      header: () => <div className="text-left">Profile</div>,
      cell: ({ row }) => (
        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 transition-all duration-200 group-hover:border-primary/50">
          <Image
            src={
              row.original.profileImage || "/placeholder.svg?height=40&width=40"
            }
            alt={row.original.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: () => <div className="text-left">Name</div>,
      cell: ({ row }) => (
        <div className="font-medium text-foreground">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "email",
      header: () => <div className="text-left">Email</div>,
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.original.email}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => <div className="text-left">Phone</div>,
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.original.phone}</div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <div className="text-left">Role</div>,
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`${getRoleColor(row.original.role)}`}
        >
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "isVerified",
      header: () => <div className="text-left">Verified</div>,
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Switch
                  checked={row.original.isVerified}
                  onCheckedChange={() => handleToggleVerify(row.original._id)}
                  className="data-[state=checked]:bg-green-500"
                />
                <span className="ml-2">
                  {row.original.isVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Click to {row.original.isVerified ? "unverify" : "verify"} user
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex justify-end gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant={user.isDeleted ? "destructive" : "outline"}
                    className="cursor-pointer px-3 py-1 text-sm"
                    onClick={() => handleUpdateStatus(user._id)}
                  >
                    {user.isDeleted ? "Deleted" : "Active"}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to {user.isDeleted ? "restore" : "delete"} user</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
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
          Manage Users
        </h1>
      </div>

      <div className="overflow-x-auto w-full">
        <TTable data={users} columns={columns} />
      </div>

      <div className="flex items-center justify-center pt-2">
        <Pagination totalPage={meta?.totalPage} />
      </div>
    </motion.div>
  );
};

export default ManageUser;
