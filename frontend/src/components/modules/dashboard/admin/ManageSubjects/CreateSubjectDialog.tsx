/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/form/Form";
import { SelectDropdown } from "@/components/form/SelectDropdown";
import { TextInput } from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { categoryOptions, gradeLevelOptions } from "@/constants/subject";
import { createSubject } from "@/services/subjectService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createSubjectSchema } from "./createSubjectSchema";

const CreateSubjectDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(createSubjectSchema),
    mode: "onChange",
  });

  const {
    formState: { isSubmitting, isValid },
    reset,
  } = form;

  const onSubmit = async (data: any) => {
    try {
      const response = await createSubject(data);

      if (response.success) {
        toast.success("Review Added Successfully 🎉");
        reset();
        setIsOpen(false);
      } else {
        toast.error(
          response.message || "Failed to add review. Please try again."
        );
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" /> Add Subject
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[380px] md:max-w-md bg-background/90 p-6 rounded-lg border-2 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">
            Add Subject
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Form
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isValid={isValid}
            recaptchaStatus={true}
          >
            <TextInput
              name="name"
              label="Subject Name"
              placeholder="Enter name"
            />
            <SelectDropdown
              name="gradeLevel"
              label="Grade Level"
              options={gradeLevelOptions}
            />
            <SelectDropdown
              name="category"
              label="Category"
              options={categoryOptions}
            />
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubjectDialog;
