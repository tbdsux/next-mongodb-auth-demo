"use server";

import dbConnect from "@/lib/dbConnect";
import { hashPassword } from "@/lib/hashing";
import User from "@/models/User";
import { z } from "zod";

const schema = z
  .object({
    fullName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({ code: "custom", message: "Your passwords don't match!" });
    }
  });

async function createAccount(formData: FormData) {
  const parsed = schema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { message: parsed.error.toString(), success: false };
  }

  await dbConnect();

  const hash = await hashPassword(parsed.data.password);

  const user = await User.create({ ...parsed.data, hash });

  return { message: user, success: true };
}

export { createAccount };
