import { redirect } from "next/navigation";
import { validateRequest } from "~/app/lib/auth/validate-request";
import { Paths } from "~/app/lib/constants";
import { Login } from "./login";
import { title } from "process";

export const metadata = {
  title: "login",
  description: "Login to your account",
};

export default async function LoginPage() {
  const { user } = await validateRequest();

  if (user) {
    redirect(Paths.Dashboard);
  }

  return <Login />;
}
