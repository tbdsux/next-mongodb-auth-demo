"use server";

import ForgotPassword from "@/components/email-templates/ForgotPassword";
import dbConnect from "@/lib/dbConnect";
import { emailDomain, resend } from "@/lib/resend";
import { generateJWTToken, toBase64 } from "@/lib/tokens";
import { APP_URL } from "@/lib/utils/env";
import Tokens from "@/models/Tokens";
import User from "@/models/User";
import { nanoid } from "nanoid";
import { z } from "zod";

const schema = z.object({
  email: z
    .string({ required_error: "Input email is empty!" })
    .email({ message: "Input email is not a valid email!" }),
});

async function forgotPassword(prevState: any, formData: FormData) {
  const parsed = schema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { fromAction: true, success: false, message: parsed.error.issues };
  }

  await dbConnect();

  const user = await User.findOne({ email: parsed.data.email }).exec();
  if (!user) {
    return {
      fromAction: true,
      success: true,
      message:
        "If the account exists, a recovery email will be sent otherwise nothing will be done.",
    };
  }

  // Remove existing tokens from the db
  await Tokens.deleteMany({ purpose: "forgot-password", userId: user._id });

  // Generate token to be used for resetting the password later
  const tokenString = nanoid();
  const confirmJwtToken = generateJWTToken(tokenString);
  const base64Token = toBase64(confirmJwtToken);

  // Save the generated token
  await Tokens.create({
    token: tokenString,
    purpose: "forgot-password",
    userId: user._id,
  });

  // Construct the link and send the email
  const link = new URL(
    `/auth/reset-password?token=${encodeURIComponent(base64Token)}`,
    APP_URL
  ).toString();

  await resend.emails.send({
    from: `demo@${emailDomain}`,
    to: [user.email],
    subject: "Reset Password",
    react: ForgotPassword({ link }),
  });

  return {
    fromAction: true,
    success: true,
    message:
      "If the account exists, a recovery email will be sent otherwise nothing will be done.",
  };
}

export { forgotPassword };
