"use client";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

interface MultiSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export const MultiSelect = ({ name, label, options }: MultiSelectProps) => {
  const { control } = useFormContext();

  return (
    <div className="">
      <label className="block font-medium mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            isMulti
            options={options}
            value={options.filter((opt) => field.value?.includes(opt.value))}
            onChange={(selected) =>
              field.onChange(selected.map((opt) => opt.value))
            }
            className="text-orange-600 react-select-container"
            classNamePrefix="react-select"
          />
        )}
      />
    </div>
  );
};
