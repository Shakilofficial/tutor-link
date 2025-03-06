'use client';
import { TimeInput } from "@/components/form/TimeInput";
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
    <div>
      {fields.map((field, slotIndex) => (
        <div key={field.id} className="flex gap-4 mb-2">
          <TimeInput
            name={`availability.${nestIndex}.slots.${slotIndex}.start`}
            label="Start Time"
          />
          <TimeInput
            name={`availability.${nestIndex}.slots.${slotIndex}.end`}
            label="End Time"
          />
          <button
            type="button"
            onClick={() => remove(slotIndex)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ start: "09:00", end: "10:00" })}
        className="btn-secondary"
      >
        Add Time Slot
      </button>
    </div>
  );
};

export default SlotFields;
