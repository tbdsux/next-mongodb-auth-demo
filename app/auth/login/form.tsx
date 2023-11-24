"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import LoginButton from "./LoginButton";
import { loginAccount } from "./actions";

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAccount, {
    fromAction: false,
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.fromAction) {
      if (state.success) return;

      if (Array.isArray(state.message)) {
        for (const i of state.message) {
          toast.error(i.message);
        }

        return;
      }

      toast.error(state.message);
    }
  }, [state]);

  return (
    <form className="mt-4" action={formAction}>
      <div className="flex flex-col my-1">
        <label htmlFor="email" className="text-sm">
          Your email
        </label>
        <input
          type="email"
          placeholder="Your email address..."
          className="border py-2 px-4 rounded-lg"
          name="email"
          required
        />
      </div>
      <div className="flex flex-col my-1">
        <label htmlFor="password" className="text-sm">
          Your password
        </label>
        <input
          type="password"
          placeholder="Your account password..."
          className="border py-2 px-4 rounded-lg"
          name="password"
          required
        />
      </div>
      <div className="flex items-center mt-3">
        <LoginButton />
        <Link href="/auth/register" className="ml-4 text-sm">
          Create Account
        </Link>
      </div>
    </form>
  );
}
