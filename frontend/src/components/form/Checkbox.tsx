/* eslint-disable @typescript-eslint/no-unused-vars */
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { CheckboxProps } from "./types";

export function CheckboxInput({
  name,
  label,
  icon: Icon,
  description,
  options,
}: CheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            {label}
          </FormLabel>
          <div className="space-y-2">
            {options.map((option) => (
              <FormField
                key={option.value}
                control={control}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), option.value]
                            : field.value?.filter(
                                (v: string) => v !== option.value
                              );
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel>{option.label}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
