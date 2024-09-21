import { useFormContext, Controller } from "react-hook-form";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { PRONOUNS, GENDER_IDENTITIES } from "~/app/lib/constants";

export const StepZero = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          placeholder="e.g. John"
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name?.message && (
          <p className="text-red-500">{String(errors.first_name.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          placeholder="e.g. Doe"
          {...register("last_name", { required: "Last name is required" })}
        />
        {errors.last_name?.message && (
          <p className="text-red-500">{String(errors.last_name.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="exampleStudent@u.northwestern.edu"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email?.message && (
          <p className="text-red-500">{String(errors.email.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pronouns">Pronouns</Label>
        <Controller
          name="pronouns"
          control={control}
          rules={{ required: "Pronouns are required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your preferred pronouns" />
              </SelectTrigger>
              <SelectContent>
                {PRONOUNS.map((pronoun) => (
                  <SelectItem key={pronoun} value={pronoun}>
                    {pronoun}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.pronouns?.message && (
          <p className="text-red-500">{String(errors.pronouns.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: "Gender is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_IDENTITIES.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender?.message && (
          <p className="text-red-500">{String(errors.gender.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="prefered_name">Preferred Name (Optional)</Label>
        <Input
          id="prefered_name"
          placeholder="e.g. Johnny"
          {...register("prefered_name")}
        />
      </div>
    </>
  );
};
