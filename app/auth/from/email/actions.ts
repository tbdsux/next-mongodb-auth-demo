"use server";

import { DEFAULT_COOKIE_NAME } from "@/lib/cookies";
import dbConnect from "@/lib/dbConnect";
import { generateToken } from "@/lib/jwt";
import { fromBase64, verifyJWTToken } from "@/lib/tokens";
import Tokens from "@/models/Tokens";
import User from "@/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function verifyAndLoginToken(token: string) {
  console.log(token);
  if (token == "" || !token) {
    return redirect("/auth/login");
  }

  const decodedToken = fromBase64(token);

  const verifiedToken = verifyJWTToken(decodedToken);
  if (!verifiedToken.success) {
    return { success: false, message: "Token has expired or is invalid." };
  }

  const authToken = verifiedToken.data;

  await dbConnect();

  // Check token if it exists in the db
  const _tok = await Tokens.findOne({
    token: authToken,
    purpose: "nopass-auth",
  }).exec();
  if (!_tok) {
    return { success: false, message: "Token has expired or is invalid." };
  }

  const user = await User.findById(_tok.userId);
  if (!user) {
    return { success: false, message: "Token has expired or is invalid." };
  }

  // Remove all of the tokens
  await Tokens.deleteMany({ purpose: "nopass-auth", userId: user._id });

  // Generate auth token for the app
  const userToken = generateToken({ id: user._id, email: user.email });
  cookies().set(DEFAULT_COOKIE_NAME, userToken);

  redirect("/dashboard");
}

export { verifyAndLoginToken };
