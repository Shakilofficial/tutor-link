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
  DialogTrigger,
} from "@/components/ui/dialog";
import { categoriesOptions } from "@/constants/categories";
import { useUser } from "@/context/UserContext";
import { createBlog } from "@/services/blogService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createBlogSchema } from "./createBlogSchema";

const CreateBlogDialog = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

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
      formData.append("thumbnail", imageFiles[0] as File);
      const res = await createBlog(formData);
      if (res?.success) {
        toast.success(res?.message);
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!user.user}
          className="bg-orange-600 hover:bg-orange-700"
        >
          Create Blog
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Blog Post</DialogTitle>
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
