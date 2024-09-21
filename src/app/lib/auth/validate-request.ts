import { cache } from "react";
import { cookies } from "next/headers";
import type { Session, User } from "lucia";
import { lucia } from "~/app/lib/auth";

export const uncachedValidateRequest = async (): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionId);
  try {
    const sessionCookie = result.session?.fresh
      ? lucia.createSessionCookie(result.session.id)
      : lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    console.error("Failed to get session cookie!", error);
  }

  return result;
};

export const validateRequest = cache(uncachedValidateRequest);
