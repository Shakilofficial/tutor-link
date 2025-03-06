"use client";
import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { MultiSelect } from "@/components/form/MultiSelect";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { getAllSubjects } from "@/services/subjectService";
import { createTutor } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { registerTutorSchema } from "./registerTutorSchema";
import SlotFields from "./SlotFields";

const RegisterTutorForm = () => {
  const { setIsLoading } = useUser();
  const router = useRouter();
  const [subjects, setSubjects] = useState<{ _id: string; name: string }[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await getAllSubjects("1", "20");
        setSubjects(data || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const form = useForm({
    resolver: zodResolver(registerTutorSchema),
    mode: "onChange",
    defaultValues: {
      availability: [],
      subjects: [],
    },
  });

  const { control, reset, formState } = form;
  const { isSubmitting, isValid } = formState;

  const {
    fields: availabilityFields,
    append: appendAvailability,
    remove: removeAvailability,
  } = useFieldArray({
    control,
    name: "availability",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();

      const mainData = {
        ...data,
        availability: data.availability,
        subjects: data.subjects,
      };

      formData.append("data", JSON.stringify(mainData));

      if (imageFiles.length > 0) {
        formData.append("profileImage", imageFiles[0]);
      }

      setIsLoading(true);
      const res = await createTutor(formData);

      if (res?.success) {
        toast.success(res?.message);
        reset();
        router.push("/");
        setImageFiles([]);
        setImagePreview([]);
      } else {
        const errorMessage =
          res?.errorSources?.[0]?.message ||
          res?.message ||
          "An error occurred";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to register tutor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        recaptchaStatus
      >
        <div className="grid grid-cols-2 gap-2 w-full">
          <TextInput name="name" label="Full Name" />
          <TextInput name="email" label="Email" />
          <TextInput name="password" label="Password" type="password" />
          <TextInput name="phone" label="Phone Number" />
          <TextInput name="location" label="Location" />
          <TextInput name="education" label="Education" />
          <TextInput
            name="hourlyRate"
            label="Hourly Rate (BDT)"
            type="number"
          />
          <TextInput
            name="teachingExperience"
            label="Years of Experience"
            type="number"
          />

          {/* Bio Section */}
          <Textarea
            name="bio"
            label="Bio"
            placeholder="Describe your teaching experience and qualifications..."
          />

          {/* Image Upload */}
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
        </div>
        <MultiSelect
          name="subjects"
          label="Teaching Subjects"
          options={subjects.map((s) => ({ value: s._id, label: s.name }))}
        />

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Availability</h3>
          {availabilityFields.map((field, index) => (
            <div key={field.id} className="mb-4 p-4 border rounded">
              <div className="flex gap-4 mb-4">
                <Controller
                  name={`availability.${index}.day`}
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="p-2 border rounded">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <Button
                  onClick={() => removeAvailability(index)}
                  className="text-red-600"
                  size="icon"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
              <SlotFields nestIndex={index} />
            </div>
          ))}
          <Button
            className="bg-orange-500/70 text-white"
            onClick={() => appendAvailability({ day: "Monday", slots: [] })}
          >
            Add Availability Day
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterTutorForm;
