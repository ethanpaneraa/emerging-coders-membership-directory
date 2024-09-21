"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { PasswordInput } from "~/components/PasswordInput";
import { APP_TITLE } from "~/app/lib/constants";
import { login } from "~/app/lib/auth/actions";
import { Label } from "@radix-ui/react-label";
import { SubmitButton } from "~/components/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "~/app/lib/validators/auth";

export function Login() {
  const [globalError, setGlobalError] = useState<string | null>(null);

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: LoginInput) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key as keyof LoginInput] as string);
      });

      await login(null, formData);
    } catch (error) {
      setGlobalError("Login failed. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{APP_TITLE} Log In</CardTitle>
        <CardDescription>
          Log in to your account to access your dashboard
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="my-2 flex items-center">
          <div className="border-muted flex-grow border-t" />
          <div className="text-muted-foreground mx-2">or</div>
          <div className="border-muted flex-grow border-t" />
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                id="email"
                placeholder="email@example.com"
                autoComplete="email"
                {...methods.register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{String(errors.email.message)}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                required
                autoComplete="current-password"
                placeholder="********"
                {...methods.register("password")}
              />
              {errors.password && (
                <p className="text-red-500">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <div className="flex flex-wrap justify-between">
              <Button variant={"link"} size={"sm"} className="p-0" asChild>
                <Link href={"/Signup"}>Not signed up? Sign up now.</Link>
              </Button>
            </div>
            {globalError && (
              <p className="bg-destructive/10 text-destructive rounded-lg border p-2 text-[0.8rem] font-medium">
                {globalError}
              </p>
            )}

            <SubmitButton
              type="submit"
              className="w-full"
              aria-label="submit-btn"
            >
              Log In
            </SubmitButton>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Cancel</Link>
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
