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
      <div className="mt-3">
        <div className="flex items-center">
          <LoginButton />
          <Link href="/auth/register" className="ml-4 text-sm">
            Create Account
          </Link>
        </div>

        <p className="mt-4">
          <Link href="/auth/forgot-password" className="text-sm underline">
            Forgot Password?
          </Link>
        </p>
      </div>

      <hr className="my-3" />

      <div className="text-center flex flex-col">
        <Link
          href="/auth/login/email"
          className="text-sm py-2 px-4 rounded-lg bg-gray-500 hover:bg-gray-600 text-white duration-300"
        >
          Login With Email
        </Link>
      </div>
    </form>
  );
}
