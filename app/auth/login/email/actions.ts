"use server";

import EmailLogin from "@/components/email-templates/EmailLogin";
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
    .string({ required_error: "Email is empty!" })
    .email({ message: "Invalid email!" }),
});

async function loginWithEmail(prevState: any, formData: FormData) {
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
      message: "If the email exists, an authentication email will be sent.",
    };
  }

  // Remove other auth tokens requested
  await Tokens.deleteMany({ purpose: "nopass-auth", userId: user._id });

  // Generate a new token for passwordless authentication
  const tokenString = nanoid();
  const confirmJwtToken = generateJWTToken(tokenString, { expiresIn: "5m" });
  const base64Token = toBase64(confirmJwtToken);

  // Save the new token
  await Tokens.create({
    token: tokenString,
    purpose: "nopass-auth",
    userId: user._id,
  });

  // Contruct the link and send the email
  const link = new URL(
    `/auth/from/email?token=${encodeURIComponent(base64Token)}`,
    APP_URL
  ).toString();

  await resend.emails.send({
    from: `demo@${emailDomain}`,
    to: [user.email],
    subject: "Sign In to Next MongoDB Demo",
    react: EmailLogin({ name: user.fullName, link }),
  });

  return {
    fromAction: true,
    success: true,
    message: "",
  };
}

export { loginWithEmail };
