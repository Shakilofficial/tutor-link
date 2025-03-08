"use client";
import { Controller, useFormContext } from "react-hook-form";

interface TimeInputProps {
  name: string;
  label: string;
}

export const TimeInput = ({ name, label }: TimeInputProps) => {
  const { control } = useFormContext();

  return (
    <div className="mb-2">
      <label className="block text-sm font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="time"
            {...field}
            className="p-2 border rounded"
            step="1800"
          />
        )}
      />
    </div>
  );
};
