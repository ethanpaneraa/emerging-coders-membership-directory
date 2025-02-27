"use server";

/* eslint @typescript-eslint/no-explicit-any:0, @typescript-eslint/prefer-optional-chain:0 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId, Scrypt } from "lucia";
// import { eq } from "drizzle-orm";
import { lucia } from "~/app/lib/auth";
import { db } from "~/server/db";
import {
  loginSchema,
  signupSchema,
  type LoginInput,
  type SignupInput,
} from "~/app/lib/validators/auth";
import { validateRequest } from "~/app/lib/auth/validate-request";
import { Paths } from "~/app/lib/constants";
import { users } from "~/server/db/schema";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function signup(
  _: any,
  formData: FormData,
): Promise<ActionResponse<SignupInput>> {
  console.log("made it here1");
  const formDataObject = Object.fromEntries(formData.entries());
  console.log("formDataObject", formDataObject);
  const parsedFormData = signupSchema.safeParse(formDataObject);
  console.log("parsedFormData", parsedFormData);
  console.log("made it here2");
  if (!parsedFormData.success) {
    const errors = parsedFormData.error.errors;
    return {
      fieldError: errors.reduce(
        (acc, error) => {
          acc[error.path[0] as keyof SignupInput] = error.message;
          console.log(acc);
          return acc;
        },
        {} as Partial<Record<keyof SignupInput, string | undefined>>,
      ),
    };
  }
  console.log("made it here3");
  const {
    email,
    password,
    first_name,
    last_name,
    gender,
    prefered_name,
    is_dual_degree_student,
    has_minor,
    pronouns,
    graduation_year,
    major,
    second_major,
    minor,
    home_school,
    is_alumni,
    is_current_student,
    has_second_major,
    second_home_school,
  } = parsedFormData.data;
  console.log("made it here4");
  const isExistingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: {
      email: true,
    },
  });

  console.log("isExistingUser", isExistingUser);
  if (isExistingUser) {
    return {
      formError: "Cannot create an account with that email address.",
    };
  }

  const newUserId = generateId(21);
  const usersHashedPassword = await new Scrypt().hash(password);
  console.log("made it here");
  await db.insert(users).values({
    id: newUserId,
    email,
    hashedPassword: usersHashedPassword,
    first_name,
    last_name,
    gender,
    prefered_name: prefered_name || "",
    is_dual_degree_student: is_dual_degree_student === "true",
    has_minor: has_minor === "true",
    pronouns: pronouns ?? "",
    graduation_year,
    major,
    second_major: second_major ?? "",
    minor: minor ?? "",
    home_school: home_school ?? "",
    is_alumni: is_alumni,
    is_current_student: is_current_student,
    has_second_major: has_second_major === "true",
    second_home_school: second_home_school ?? "",
  });
  console.log("user inserted");
  const session = await lucia.createSession(newUserId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect(Paths.Home);
}

export async function login(
  _: any,
  formData: FormData,
): Promise<ActionResponse<LoginInput>> {
  const formDataObject = Object.fromEntries(formData.entries());

  const parsedFormData = loginSchema.safeParse(formDataObject);

  if (!parsedFormData.success) {
    const errors = parsedFormData.error.errors;
    return {
      fieldError: {
        email: errors.find((error) => error.path[0] === "email")?.message,
        password: errors.find((error) => error.path[0] === "password")?.message,
      },
    };
  }

  const { email, password } = parsedFormData.data;

  const isExistingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: {
      id: true,
      email: true,
      hashedPassword: true,
    },
  });

  if (!isExistingUser || !isExistingUser?.hashedPassword) {
    return {
      formError: "Incorrect email or password. Please try again.",
    };
  }

  const isPasswordCorrect = await new Scrypt().verify(
    password,
    isExistingUser.hashedPassword,
  );

  if (!isPasswordCorrect) {
    return {
      formError: "Incorrect email or password. Please try again.",
    };
  }

  const session = await lucia.createSession(isExistingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect(Paths.Home);
}

export async function logout(): Promise<{ error: string } | void> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Session not found, please log in.",
    };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect(Paths.Login);
}
