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
import {
  AtSign,
  BookOpen,
  Calendar,
  DollarSign,
  Lock,
  MapPin,
  Phone,
  Plus,
  Trash,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Controller,
  type FieldValues,
  type SubmitHandler,
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
        const { data } = await getAllSubjects("1", "100");
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
        recaptchaStatus={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <TextInput
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            icon={User}
          />
          <TextInput
            name="email"
            label="Email"
            placeholder="your.email@example.com"
            icon={AtSign}
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            placeholder="Create a strong password"
            icon={Lock}
          />
          <TextInput
            name="phone"
            label="Phone Number"
            placeholder="Your contact number"
            icon={Phone}
          />
          <TextInput
            name="location"
            label="Location"
            placeholder="Your city or area"
            icon={MapPin}
          />
          <TextInput
            name="hourlyRate"
            label="Hourly Rate (BDT)"
            type="number"
            placeholder="Your teaching rate"
            icon={DollarSign}
          />
        </div>

        <Textarea
          name="bio"
          label="Professional Bio"
          placeholder="Describe your teaching experience, qualifications, and teaching style..."
        />

        <div className="flex flex-col mt-4">
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

        <Card className="bg-white/70 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 mt-6 text-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-semibold flex items-center text-sm">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
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

        <Card className="bg-white/70 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 mt-6 text-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Availability Schedule
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendAvailability({ day: "Monday", slots: [] })}
                className="bg-white dark:bg-orange-900 hover:bg-orange-50 dark:hover:bg-orange-800 text-sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Day
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {availabilityFields.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                Add your teaching availability by clicking the Add Day button
                above
              </div>
            ) : (
              availabilityFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-900/50 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-primary">
                      Day {index + 1}
                    </h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAvailability(index)}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <Controller
                    name={`availability.${index}.day`}
                    control={control}
                    render={({ field }) => (
                      <div className="mb-4">
                        <label className="text-sm font-medium mb-1 block">
                          Select Day
                        </label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-orange-950">
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
              ))
            )}
          </CardContent>
        </Card>
      </Form>
    </div>
  );
};

export default RegisterTutorForm;
