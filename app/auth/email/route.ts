import { DEFAULT_COOKIE_NAME } from "@/lib/cookies";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const token = params.get("token");

  if (!token || token == "") {
    return NextResponse.json({ message: "Invalid token!" }, { status: 400 });
  }

  const verifiedToken = verifyToken(token);
  if (!verifiedToken.success) {
    return NextResponse.json({ message: "Invalid token!" }, { status: 400 });
  }

  cookies().set(DEFAULT_COOKIE_NAME, token);
  return redirect("/dashboard");
}
