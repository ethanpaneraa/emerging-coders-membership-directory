import { useFormContext } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { PasswordInput } from "~/components/PasswordInput";

export const StepThree = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          placeholder="********"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password?.message && (
          <p className="text-red-500">{String(errors.password.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordInput
          id="confirmPassword"
          placeholder="********"
          {...register("confirmPassword", {
            required: "Please confirm your password",
          })}
        />
        {errors.confirmPassword?.message && (
          <p className="text-red-500">
            {String(errors.confirmPassword.message)}
          </p>
        )}
      </div>
    </>
  );
};
