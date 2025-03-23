/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { TextInput } from "@/components/form/TextInput";
import { useUser } from "@/context/UserContext";
import { createStudent } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Lock, MapPin, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerStudentSchema } from "./registerStudentSchema";

const RegisterStudentForm = () => {
  const { setIsLoading } = useUser();
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm({
    resolver: zodResolver(registerStudentSchema),
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
      formData.append("profileImage", imageFiles[0] as File);
      const res = await createStudent(formData);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        reset();
        router.push("/");
        setImageFiles([]);
        setImagePreview([]);
      } else {
        toast.error(res?.errorSources[0]?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <Form
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        recaptchaStatus={true}
      >
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <TextInput
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            type="text"
            icon={User}
          />
          <TextInput
            name="email"
            label="Email"
            placeholder="john@example.com"
            type="email"
            icon={AtSign}
          />
        </div>
        <TextInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          icon={Lock}
        />
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <TextInput
            name="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
            type="text"
            icon={Phone}
          />
          <TextInput
            name="location"
            label="Location"
            placeholder="Enter your location"
            type="text"
            icon={MapPin}
          />
        </div>

        <div className="flex flex-col mt-2">
          {imagePreview.length > 0 ? (
            <ImagePreviewer
              setImageFiles={setImageFiles}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              className="mt-4"
            />
          ) : (
            <ImageUploader
              name="profileImage"
              label="Upload your profile image"
              setImageFiles={setImageFiles}
              setImagePreview={setImagePreview}
            />
          )}
        </div>
      </Form>
    </div>
  );
};

export default RegisterStudentForm;
