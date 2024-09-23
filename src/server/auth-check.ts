import { cookies } from "next/headers";
import { lucia } from "~/app/lib/auth";
import { redirect } from "next/navigation";

export async function authCheck() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;
  if (!sessionId) {
    return redirect("/login");
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (!session) {
    redirect("/login");
  }

  return { user };
}
