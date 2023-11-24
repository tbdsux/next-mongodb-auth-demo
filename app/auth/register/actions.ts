"use server";

import { DEFAULT_COOKIE_NAME } from "@/lib/cookies";
import dbConnect from "@/lib/dbConnect";
import { hashPassword } from "@/lib/hashing";
import { generateToken } from "@/lib/jwt";
import User from "@/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z
  .object({
    fullName: z.string().min(3, {
      message: "Full name should atleast be greater than 3 characters.",
    }),
    email: z
      .string()
      .email({ message: "Email provided is not a valid email!" }),
    password: z
      .string()
      .min(7, { message: "Passwords should be atleast 7 characters length!" }),
    confirmPassword: z
      .string()
      .min(7, { message: "Passwords should be atleast 7 characters length!" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({ code: "custom", message: "Your passwords don't match!" });
    }
  });

async function createAccount(prevState: any, formData: FormData) {
  const parsed = schema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { fromAction: true, message: parsed.error.issues, success: false };
  }

  await dbConnect();

  // check if the user exists
  const isUserExists = await User.findOne({ email: parsed.data.email }).exec();
  if (isUserExists) {
    return {
      fromAction: true,
      success: false,
      message: "A user with this email already exists.",
    };
  }

  const hash = await hashPassword(parsed.data.password);
  const user = await User.create({ ...parsed.data, hash });

  const token = generateToken({ id: user._id, email: user.email });
  cookies().set(DEFAULT_COOKIE_NAME, token);

  redirect("/dashboard");
}

export { createAccount };
