import { z } from "zod";

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
    gender: z.string(),
    is_dual_degree_student: z.boolean().optional().default(false),
    second_home_school: z.string().optional(),
    has_minor: z.boolean().optional().default(false),
    graduation_year: z.string(),
    is_alumni: z.boolean(),
    is_current_student: z.boolean(),
    prefered_name: z.string(),
    second_major: z.string().optional(),
    has_second_major: z.boolean().optional().default(false),
    minor: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.is_dual_degree_student && !data.second_home_school) {
        return false;
      }

      if (data.has_minor && !data.minor) {
        return false;
      }

      if (data.has_second_major && !data.second_major) {
        return false;
      }

      if (data.password !== data.confirmPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Please fill out all required fields",
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
