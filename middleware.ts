import { DEFAULT_COOKIE_NAME } from "@/lib/cookies";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get(DEFAULT_COOKIE_NAME)?.value;

  const urlPathname = request.nextUrl.pathname;
  const defaultResponse = NextResponse.next();

  if (!authToken) {
    if (urlPathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return defaultResponse;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
