"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { APP_TITLE } from "~/app/lib/constants";
import { SubmitButton } from "~/components/SubmitButton";
import { signup } from "~/app/lib/auth/actions";
import { SIGNUP_STEPS } from "~/app/lib/constants";
import { StepZero } from "~/app/(auth)/Signup/_components/StepZero";
import { StepOne } from "~/app/(auth)/Signup/_components/StepOne";
import { StepTwo } from "~/app/(auth)/Signup/_components/StepTwo";
import { StepThree } from "~/app/(auth)/Signup/_components/StepThree";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "~/app/lib/validators/auth";
import { MultiStepProgressBar } from "~/app/(auth)/Signup/_components/MultiStepProgressBar";

const steps = SIGNUP_STEPS;

export function Signup() {
  const [step, setStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);

  const methods = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  const getFieldsToValidate = (currentStep: number): (keyof SignupInput)[] => {
    switch (currentStep) {
      case 0:
        return [
          "first_name",
          "last_name",
          "email",
          "pronouns",
          "gender",
          "prefered_name",
        ];
      case 1:
        return [
          "major",
          "home_school",
          "is_dual_degree_student",
          "second_major",
          "has_minor",
        ];
      case 2:
        return ["graduation_year", "is_alumni", "is_current_student"];
      case 3:
        return ["password", "confirmPassword"];
      default:
        return [];
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidate(step);
    console.log("Fields to validate:", fieldsToValidate);
    const isStepValid = await trigger(fieldsToValidate);
    console.log("Step valid:", isStepValid);
    console.log("Form errors:", errors);

    if (isStepValid) {
      setPreviousStep(step);
      if (step < steps.length - 1) setStep(step + 1);
    }
  };

  const prevStep = () => {
    setPreviousStep(step);
    if (step > 0) setStep(step - 1);
  };

  const onSubmit = (data: SignupInput) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof SignupInput] as string);
    });
    signup(null, formData);
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{APP_TITLE} Sign Up</CardTitle>
        <CardDescription>
          Create an Account to access the Emerging Coders Membership Directory!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MultiStepProgressBar step={step} />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 0 && <StepZero />}
            {step === 1 && <StepOne />}
            {step === 2 && <StepTwo />}
            {step === 3 && <StepThree />}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className={`${step === 0 ? "invisible" : "visible"}`}
              >
                Back
              </Button>
              {step < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <SubmitButton aria-label="submit-btn" type="submit">
                  Sign Up
                </SubmitButton>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
      <div className="px-6 pb-4">
        <Link href="/Login">
          <span className="text-xs font-medium underline-offset-4 hover:underline">
            Already have an account? Log in here.
          </span>
        </Link>
      </div>
      <div className="px-6 pb-6">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">Cancel</Link>
        </Button>
      </div>
    </Card>
  );
}
