/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import ConfirmDialog from "@/components/core/ConfirmDialog";
import Pagination from "@/components/core/Pagination";
import { TTable } from "@/components/core/TTable";
import CreateBlogDialog from "@/components/modules/blogs/CreateBlog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteBlog, updateBlogStatus } from "@/services/blogService";
import type { IBlog } from "@/types/blog";
import type { IMeta } from "@/types/subject";
import { motion } from "framer-motion";
import { Calendar, Edit, Eye, EyeOff, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface ManageBlogsProps {
  blogs: IBlog[];
  meta: IMeta;
}

const ManageBlogs = ({ blogs, meta }: ManageBlogsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (data: IBlog) => {
    setSelectedId(data._id);
    setSelectedItem(data.title);
    setIsOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteBlog(selectedId);

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
      toast.error("Failed to delete blog");
    }
  };

  const handleUpdateStatus = async (id: string) => {
    try {
      const res = await updateBlogStatus(id);
      if (res.success) {
        toast.success("Blog status updated successfully");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to update blog status");
    }
  };

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      All: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300",
      "Study Tips":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      "Exam Guide":
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      Tutoring:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      "Platform News":
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
      "Online Learning":
        "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
      "Success Stories":
        "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    };

    return (
      categories[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300"
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    {
      accessorKey: "thumbnail",
      header: () => <div className="text-left">Thumbnail</div>,
      cell: ({ row }: { row: any }) => (
        <div className="relative h-12 w-20 overflow-hidden rounded-md border border-border transition-all duration-200 group-hover:border-primary/50">
          <Image
            src={
              row.original.thumbnail || "/placeholder.svg?height=48&width=80"
            }
            alt={row.original.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: () => <div className="text-left">Title</div>,
      cell: ({ row }: { row: any }) => (
        <div className="max-w-xs">
          <div className="font-medium text-foreground truncate">
            {row.original.title}
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(row.original.createdAt)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "author",
      header: () => <div className="text-left">Author</div>,
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border">
            <Image
              src={
                row.original.author.profileImage ||
                "/placeholder.svg?height=32&width=32"
              }
              alt={row.original.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-sm">{row.original.author.name}</div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: () => <div className="text-left">Category</div>,
      cell: ({ row }: { row: any }) => (
        <Badge
          variant="secondary"
          className={`${getCategoryColor(row.original.category)}`}
        >
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-left">Status</div>,
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={
              row.original.published
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
            }
          >
            {row.original.published ? (
              <Eye className="h-3 w-3 mr-1" />
            ) : (
              <EyeOff className="h-3 w-3 mr-1" />
            )}
            {row.original.published ? "Published" : "Draft"}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }: { row: any }) => (
        <div className="flex justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit blog</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={
                    row.original.published
                      ? "h-8 text-amber-500 hover:text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/20"
                      : "h-8 text-green-500 hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20"
                  }
                  onClick={() => handleUpdateStatus(row.original._id)}
                >
                  {row.original.published ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-1" />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-1" />
                      Publish
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {row.original.published ? "Unpublish blog" : "Publish blog"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                  onClick={() => handleDelete(row.original)}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete blog</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
          Manage Blogs
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <CreateBlogDialog />
        </div>
      </div>

      <TTable
        columns={columns}
        data={blogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        )}
      />

      <Pagination totalPage={meta?.totalPage} />

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

export default ManageBlogs;
