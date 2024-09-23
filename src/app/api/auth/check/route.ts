import { lucia } from "~/app/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;
  if (!sessionId) {
    return new NextResponse(null, { status: 401 });
  }

  const { session } = await lucia.validateSession(sessionId);
  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  return new NextResponse(null, { status: 200 });
}
