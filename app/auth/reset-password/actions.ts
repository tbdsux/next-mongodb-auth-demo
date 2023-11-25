"use server";

import dbConnect from "@/lib/dbConnect";
import { hashPassword } from "@/lib/hashing";
import { fromBase64, verifyJWTToken } from "@/lib/tokens";
import Tokens from "@/models/Tokens";
import User from "@/models/User";
import { z } from "zod";

async function confirmResetToken(token: string) {
  const decodedToken = fromBase64(token);

  const verifiedToken = verifyJWTToken(decodedToken);
  if (!verifiedToken.success) {
    return { success: false, message: "Token has expired or is invalid." };
  }

  const authToken = verifiedToken.data!;

  await dbConnect();

  // Check token if exists in the db
  const _tok = await Tokens.findOne({
    token: authToken,
    purpose: "forgot-password",
  }).exec();
  if (!_tok) {
    return { success: false, message: "Token has expired or is invalid." };
  }

  return { success: true, data: _tok };
}

const schema = z
  .object({
    token: z.string({ required_error: "Missing token to reset password!" }),
    password: z
      .string()
      .min(7, { message: "Passwords should be atleast 7 characters lenth!" }),
    confirmPassword: z
      .string()
      .min(7, { message: "Passwords should be atleast 7 characters lenth!" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({ code: "custom", message: "Your passwords don't match!" });
    }
  });

async function resetPassword(prevState: any, formData: FormData) {
  const parsed = schema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { fromAction: true, message: parsed.error.issues, success: false };
  }

  await dbConnect();

  // Need to revalidate token once again incase it was modified midway
  const validateToken = await confirmResetToken(parsed.data.token);
  if (!validateToken.success) {
    return { success: false, message: "Invalid token to reset password!" };
  }

  // Set the new password to the user
  const hash = await hashPassword(parsed.data.password);
  await User.updateOne({ _id: validateToken.data.userId }, { hash });

  // Remove the other tokens
  await Tokens.deleteMany({
    purpose: "forgot-password",
    userId: validateToken.data.userId,
  });

  return {
    fromAction: true,
    success: true,
    message: "You have successfully reset your password!",
  };
}

export { confirmResetToken, resetPassword };
