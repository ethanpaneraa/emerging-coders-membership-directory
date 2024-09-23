import { useFormContext, Controller } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { type SignupInput } from "~/app/lib/validators/auth";

export const StepTwo = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<SignupInput>();

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
          <p className="text-red-500">{errors.graduation_year.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Student Status</Label>
        <Controller
          name="is_current_student"
          control={control}
          rules={{ required: "Please select your student status" }}
          render={({ field }) => (
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
              }}
              value={field.value || undefined}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current" id="current_student" />
                <Label htmlFor="current_student">Current Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="alumni" id="alumni" />
                <Label htmlFor="alumni">Alumni</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.is_current_student?.message && (
          <p className="text-red-500">{errors.is_current_student.message}</p>
        )}
      </div>
    </>
  );
};
