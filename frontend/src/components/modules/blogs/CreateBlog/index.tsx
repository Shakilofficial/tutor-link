/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { SelectDropdown } from "@/components/form/SelectDropdown";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categoriesOptions } from "@/constants/categories";
import { useUser } from "@/context/UserContext";
import { createBlog } from "@/services/blogService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createBlogSchema } from "./createBlogSchema";

const CreateBlogDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const { user } = useUser();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createBlogSchema),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (imageFiles.length > 0) {
        formData.append("thumbnail", imageFiles[0] as File);
      }

      const res = await createBlog(formData);
      if (res?.success) {
        toast.success(res?.message || "Blog created successfully");
        reset();
        setImageFiles([]);
        setImagePreview([]);
        setIsOpen(false);
      } else {
        toast.error(res?.message || "Failed to create blog");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    }
  };

  const handleButtonClick = () => {
    if (!user) {
      router.push(`/login?redirectPath=/blogs`);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        onClick={handleButtonClick}
        className="bg-orange-600 hover:bg-orange-700"
        size="sm"
      >
        Create Blog
      </Button>

      <DialogContent className="max-w-md rounded-lg border-2 border-orange-500/50 bg-gradient-to-bl from-orange-500/0.5 to-orange-700/0.5">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">
            Create a New Blog Post
          </DialogTitle>
        </DialogHeader>

        <Form
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          isValid={isValid}
          recaptchaStatus={true}
        >
          <TextInput
            name="title"
            label="Blog Title"
            placeholder="Enter your blog title"
            type="text"
          />
          <SelectDropdown
            name="category"
            label="Category"
            options={categoriesOptions}
          />
          <Textarea
            name="content"
            label="Content"
            placeholder="Enter your blog content"
          />

          {/* Image Upload Section */}
          <div className="flex flex-col">
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                className="mt-4"
              />
            ) : (
              <ImageUploader
                name="thumbnail"
                label="Upload Thumbnail"
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
              />
            )}
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogDialog;
