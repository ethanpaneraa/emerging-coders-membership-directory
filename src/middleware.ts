import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { lucia } from "~/app/lib/auth";
export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.nextUrl.pathname === "/api") {
    return new NextResponse(null, {
      status: 404,
    });
  }

  if (request.nextUrl.pathname === "/dashboard") {
    const sessionId = request.cookies.get("session");
    if (!sessionId) {
      return NextResponse.redirect(new URL("/Login", request.url));
    }
  }

  if (request.method === "GET") {
    return NextResponse.next();
  }
  const originHeader = request.headers.get("Origin");
  const hostHeader = request.headers.get("Host");
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new NextResponse(null, {
      status: 403,
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
