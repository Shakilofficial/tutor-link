"use client";
import { Form } from "@/components/form/Form";
import { ImagePreviewer } from "@/components/form/ImagePreviewer";
import { ImageUploader } from "@/components/form/ImageUploader";
import { MultiSelect } from "@/components/form/MultiSelect";
import { Textarea } from "@/components/form/Textarea";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/context/UserContext";
import { getAllSubjects } from "@/services/subjectService";
import { createTutor } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
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
          <TextInput
            name="hourlyRate"
            label="Hourly Rate (BDT)"
            type="number"
          />
          <Textarea
            name="bio"
            label="Bio"
            placeholder="Describe your teaching experience and qualifications..."
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
        </div>
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Teaching Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MultiSelect
              name="subjects"
              label="Select subjects you teach"
              options={subjects.map((s) => ({ value: s._id, label: s.name }))}
            />
          </CardContent>
        </Card>

        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              Availability Schedule
              <Button
                type="button"
                variant="outline"
                onClick={() => appendAvailability({ day: "Monday", slots: [] })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Day
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {availabilityFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg bg-muted/10">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Day {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAvailability(index)}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                <Controller
                  name={`availability.${index}.day`}
                  control={control}
                  render={({ field }) => (
                    <div className="mb-4">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                          ].map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />

                <SlotFields nestIndex={index} />
              </div>
            ))}
          </CardContent>
        </Card>
      </Form>
    </div>
  );
};

export default RegisterTutorForm;
