/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/form/Form";
import { MultiSelect } from "@/components/form/MultiSelect";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/context/UserContext";
import { getAllSubjects } from "@/services/subjectService";
import {
  getMyTutorProfile,
  updateMyTutorProfile,
} from "@/services/tutorService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import SlotFields from "../../user/register-tutor/SlotFields";
import { updateTutorSchema } from "./updateTutorSchema";

const UpdateTutorDialog = () => {
  const { user, setIsLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState<{ _id: string; name: string }[]>([]);
  const [tutorData, setTutorData] = useState<any>(null);

  const form = useForm({
    resolver: zodResolver(updateTutorSchema),
    mode: "onChange",
    defaultValues: {
      bio: "",
      location: "",
      subjects: [],
      hourlyRate: 0,
      availability: [],
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

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen && user?.userId) {
        try {
          setIsLoading(true);
          const [subjectsRes, tutorRes] = await Promise.all([
            getAllSubjects("1", "100"),
            getMyTutorProfile(),
          ]);

          setSubjects(subjectsRes.data || []);

          if (tutorRes.data) {
            setTutorData(tutorRes.data);
            reset({
              bio: tutorRes.data.bio,
              location: tutorRes.data.location,
              subjects: tutorRes.data.subjects.map((s: any) => s._id),
              hourlyRate: tutorRes.data.hourlyRate,
              availability: tutorRes.data.availability.map((a: any) => ({
                day: a.day,
                slots: a.slots.map((s: any) => ({
                  start: s.start,
                  end: s.end,
                })),
              })),
            });
          }
        } catch (error: any) {
          toast.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [isOpen, user?.userId, reset, setIsLoading]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await updateMyTutorProfile(data);
      console.log(data);
      if (res?.success) {
        toast.success("Tutor profile updated successfully");
        setIsOpen(false);
        reset();
      } else {
        toast.error(res?.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700">
          Update Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
          <div className="grid grid-cols-2 gap-4">
            <TextInput name="bio" label="Bio" />
            <TextInput name="location" label="Location" />
            <TextInput
              name="hourlyRate"
              label="Hourly Rate (BDT)"
              type="number"
            />

            <div className="col-span-2">
              <MultiSelect
                name="subjects"
                label="Teaching Subjects"
                options={subjects.map((s) => ({
                  value: s._id,
                  label: s.name,
                }))}
              />
            </div>

            <div className="col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Availability</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendAvailability({ day: "Monday", slots: [] })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Day
                </Button>
              </div>

              {availabilityFields.map((field, index) => (
                <div key={field.id} className="mb-6 p-4 border rounded-lg">
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
                        <select
                          {...field}
                          className="w-full p-2 border rounded"
                        >
                          {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                          ].map((day) => (
                            <option
                              key={day}
                              value={day}
                              selected={field.value === day}
                            >
                              {day}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  />

                  <SlotFields nestIndex={index} />
                </div>
              ))}
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTutorDialog;
