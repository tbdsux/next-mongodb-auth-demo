"use server";

import { DEFAULT_COOKIE_NAME } from "@/lib/cookies";
import dbConnect from "@/lib/dbConnect";
import { comparePassword } from "@/lib/hashing";
import { generateToken } from "@/lib/jwt";
import User from "@/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

async function loginAccount(prevState: any, formData: FormData) {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { message: parsed.error.issues, success: false };
  }

  await dbConnect();

  const user = await User.findOne({ email: parsed.data.email }).exec();
  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }

  // compare password
  const isPasswordSimilar = await comparePassword(
    parsed.data.password,
    user.hash
  );
  if (!isPasswordSimilar) {
    return { success: false, message: "Invalid email or password." };
  }

  const token = generateToken({ id: user._id, email: user.email });
  cookies().set(DEFAULT_COOKIE_NAME, token);

  redirect("/dashboard");
}

export { loginAccount };
