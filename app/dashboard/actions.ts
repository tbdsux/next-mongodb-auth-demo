"use server";

import { DEFAULT_COOKIE_NAME } from "@/lib/cookies";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logoutAccount() {
  cookies().delete(DEFAULT_COOKIE_NAME);
  revalidatePath("/dashboard");

  redirect("/auth/login");
}

export { logoutAccount };
