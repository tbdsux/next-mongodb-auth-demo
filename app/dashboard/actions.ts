"use server";

import ConfirmAccount from "@/components/email-templates/ConfirmAccount";
import { DEFAULT_COOKIE_NAME } from "@/lib/cookies";
import dbConnect from "@/lib/dbConnect";
import { verifyToken } from "@/lib/jwt";
import { emailDomain, resend } from "@/lib/resend";
import { generateJWTToken, toBase64 } from "@/lib/tokens";
import { APP_URL } from "@/lib/utils/env";
import Tokens from "@/models/Tokens";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logoutAccount() {
  cookies().delete(DEFAULT_COOKIE_NAME);
  revalidatePath("/dashboard");

  redirect("/auth/login");
}

async function sendVerificationEmail(prevState: any) {
  const token = cookies().get(DEFAULT_COOKIE_NAME)?.value;

  if (!token) {
    // NOTE: this should not error
    return {
      fromAction: true,
      success: false,
      message: "Missing authentication token!",
    };
  }

  let validateToken = verifyToken(token);
  if (!validateToken.success) {
    return { fromAction: true, success: false, message: validateToken.message };
  }

  await dbConnect();

  // Remove previously generated tokens
  await Tokens.deleteMany({
    purpose: "confirm-account",
    userId: validateToken.data.id,
  });

  // Generate token
  const tokenString = nanoid();
  const confirmJwtToken = generateJWTToken(tokenString);
  const base64Token = toBase64(confirmJwtToken);

  // save the token first
  await Tokens.create({
    token: tokenString,
    purpose: "confirm-account",
    userId: validateToken.data.id,
  });

  // contruct the link
  const link = new URL(
    `/confirm-account?token=${encodeURIComponent(base64Token)}`,
    APP_URL
  ).toString();

  await resend.emails.send({
    from: `demo@${emailDomain}`,
    to: [validateToken.data.email],
    subject: "Confirm Account",
    react: ConfirmAccount({ link }),
  });

  return {
    fromAction: true,
    success: true,
    message: "Successfully sent verification email to confirm account.",
  };
}

export { logoutAccount, sendVerificationEmail };
