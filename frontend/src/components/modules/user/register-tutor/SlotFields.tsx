// SlotFields.tsx
"use client";
import { TimeInput } from "@/components/form/TimeInput";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface SlotFieldsProps {
  nestIndex: number;
}

const SlotFields = ({ nestIndex }: SlotFieldsProps) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `availability.${nestIndex}.slots`,
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {fields.map((field, slotIndex) => (
          <div key={field.id} className="flex items-end gap-4">
            <TimeInput
              name={`availability.${nestIndex}.slots.${slotIndex}.start`}
              label="Start Time"
            />
            <TimeInput
              name={`availability.${nestIndex}.slots.${slotIndex}.end`}
              label="End Time"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(slotIndex)}
              className="text-destructive mb-1"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => append({ start: "09:00", end: "10:00" })}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Time Slot
      </Button>
    </div>
  );
};

export default SlotFields;
