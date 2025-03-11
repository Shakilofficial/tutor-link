/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateProfile } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserProfile } from "../ProfileCard";
import { updateProfileSchema } from "./updateProfileSchema";

const UpdateProfileDialog = ({ user }: { user: UserProfile | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    user?.profileImage ? [user.profileImage] : []
  );

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  const { reset, formState } = form;
  const { isSubmitting, isValid } = formState;

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data || {}));

      if (imageFiles[0]) {
        formData.append("profileImage", imageFiles[0]);
      }

      const res = await updateProfile(formData);
      if (res?.success) {
        toast.success(res?.message);
        reset();
        setImageFiles([]);
        setImagePreview([]);
        setIsOpen(false);
      } else {
        const errorMessage =
          res?.error?.message || res?.message || "Profile update failed";
        toast.error(errorMessage);
      }
    } catch (err: any) {
      console.error("Update error:", err);
      toast.error(err.message || "An unexpected error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700">
          Update Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Your Profile</DialogTitle>
        </DialogHeader>

        <Form
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          isValid={isValid}
          recaptchaStatus={true}
        >
          <div className="space-y-4">
            <TextInput
              name="name"
              label="Full Name"
              placeholder="Enter your name"
            />

            <TextInput
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
            />

            <div className="flex flex-col gap-4">
              {imagePreview.length > 0 ? (
                <ImagePreviewer
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  className="w-full"
                />
              ) : (
                <ImageUploader
                  name="profileImage"
                  label="Profile Image"
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                />
              )}
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
