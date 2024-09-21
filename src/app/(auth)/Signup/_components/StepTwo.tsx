import { useFormContext, Controller } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";

export const StepTwo = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="graduation_year">Graduation Year</Label>
        <Input
          id="graduation_year"
          type="number"
          placeholder="e.g. 2025"
          {...register("graduation_year", {
            required: "Graduation year is required",
          })}
        />
        {errors.graduation_year?.message && (
          <p className="text-red-500">
            {String(errors.graduation_year.message)}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="is_alumni"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="is_alumni"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="is_alumni">Are you an alumni?</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="is_current_student"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="is_current_student"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="is_current_student">Are you a current student?</Label>
      </div>
    </>
  );
};
