import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { FileUploadProps } from "./types";

export function FileUpload({
  name,
  label,
  icon: Icon,
  description,
  acceptedFileTypes,
  maxFileSize,
}: FileUploadProps) {
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
          <FormControl>
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && (!maxFileSize || file.size <= maxFileSize)) {
                  field.onChange(file);
                }
              }}
              accept={acceptedFileTypes?.join(",")}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
