/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { TextInput } from "@/components/form/TextInput";
import { useUser } from "@/context/UserContext";
import { createStudent } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
        <TextInput
          name="name"
          label="StudentName"
          placeholder="Enter your name"
          type="text"
        />
        <TextInput
          name="email"
          label="Email"
          placeholder="john@example.com"
          type="email"
        />
        <TextInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <TextInput
          name="phone"
          label="Phone No"
          placeholder="Enter your phone number"
          type="text"
        />
        <TextInput
          name="location"
          label="Location"
          placeholder="Enter your location"
          type="text"
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
