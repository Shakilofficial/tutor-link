/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ConfirmDialog from "@/components/core/ConfirmDialog";
import Pagination from "@/components/core/Pagination";
import { TTable } from "@/components/core/TTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteSubject } from "@/services/subjectService";
import type { IMeta, ISubject } from "@/types/subject";
import type { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CreateSubjectDialog from "./CreateSubjectDialog";

const ManageSubjects = ({
  subjects,
  meta,
}: {
  subjects: ISubject[];
  meta: IMeta;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: ISubject) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setIsOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteSubject(selectedId);

        if (res.success) {
          toast.success(res.message);
          setIsOpen(false);
          setSelectedId(null);
          setSelectedItem(null);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      General:
        "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300",
      Basic: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      Science:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Arts: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      Commerce:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      Business:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      BBA: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
      CSE: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    };

    return (
      categories[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300"
    );
  };

  const getGradeLevelBadge = (gradeLevel: string) => {
    const gradeLevels: Record<string, string> = {
      Kindergarten:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      SSC: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      HSC: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Undergrade:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    };

    return (
      gradeLevels[gradeLevel] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300"
    );
  };

  const columns: ColumnDef<ISubject>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-left">Subject Name</div>,
      cell: ({ row }) => (
        <div className="font-medium text-foreground">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "gradeLevel",
      header: () => <div className="text-left">Grade Level</div>,
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`${getGradeLevelBadge(row.original.gradeLevel)}`}
        >
          {row.original.gradeLevel}
        </Badge>
      ),
    },
    {
      accessorKey: "category",
      header: () => <div className="text-left">Category</div>,
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`${getCategoryColor(row.original.category)}`}
        >
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
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
          Manage Subjects
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <CreateSubjectDialog />
        </div>
      </div>

      <div className="rounded-lg overflow-hidden">
        <TTable data={subjects} columns={columns} />
      </div>

      <div className="flex items-center justify-center pt-2">
        <Pagination totalPage={meta?.totalPage} />
      </div>

      <ConfirmDialog
        isOpen={isOpen}
        title="Delete Subject"
        description={`Are you sure you want to delete "${selectedItem}"? This action cannot be undone.`}
        actionText="Delete"
        confirmButtonText="Delete"
        onOpenChange={setIsOpen}
        onConfirm={handleDeleteConfirm}
      />
    </motion.div>
  );
};

export default ManageSubjects;
