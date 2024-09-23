import { z } from "zod";

export type StudentStatusRadioValue = "current" | "alumni";

export const signupSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(255),
    confirmPassword: z.string(),
    major: z.string().min(1, "Please select a major"),
    home_school: z.string().min(1, "Please select a home school"),
    first_name: z.string(),
    last_name: z.string(),
    pronouns: z.string(),
    gender: z.string().optional().default(""),
    is_dual_degree_student: z.enum(["true", "false"]).default("false"),
    second_home_school: z.string().optional().default(""),
    has_minor: z.enum(["true", "false"]).default("false"),
    graduation_year: z.string(),
    is_alumni: z.string().optional().default("false"),
    is_current_student: z.string().optional().default("false"),
    prefered_name: z.string().optional().default(""),
    second_major: z.string().optional().default(""),
    has_second_major: z.enum(["true", "false"]).default("false"),
    minor: z.string().optional().default(""),
  })
  .refine(
    (data) => {
      if (data.is_dual_degree_student === "true" && !data.second_home_school) {
        console.log("second home school", data);
        return false;
      }

      if (data.has_minor && !data.minor) {
        console.log("THIS IS THE DATA", data);
        return false;
      }

      if (data.has_second_major === "true" && !data.second_major) {
        console.log("has second major", data);
        return false;
      }

      if (data.password !== data.confirmPassword) {
        console.log("pass", data);
        return false;
      }

      if (data.is_current_student === data.is_alumni) {
        console.log("current", data);
        return false;
      }

      return true;
    },
    {
      message: "You forgot to fill out a required field",
      path: ["form"],
    },
  );

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255),
  homeSchool: z.string(),
  major: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
