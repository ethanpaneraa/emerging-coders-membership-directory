import { redirect } from "next/navigation";
import { Signup } from "./Signup";
import { validateRequest } from "~/app/lib/auth/validate-request";
import { Paths } from "~/app/lib/constants";

export const metadata = {
  title: "signup",
  description: "Sign up for an account",
};

export default async function SignupPage() {
  const { user } = await validateRequest();

  if (user) {
    redirect(Paths.Dashboard);
  }

  return <Signup />;
}
