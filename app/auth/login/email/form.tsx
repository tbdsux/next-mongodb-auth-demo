"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import LoginWithEmailButton from "./LoginWithEmailButton";
import { loginWithEmail } from "./actions";

export default function LoginWithEmailForm() {
  const [state, formAction] = useFormState(loginWithEmail, {
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

  return state.fromAction && state.success ? (
    <div className="mt-8 text-center bg-blue-500 text-white rounded-lg py-5 px-4">
      <h3 className="text-2xl font-bold">Authentication Sent</h3>
      <p>
        An Email has been sent to your account, please check and login from it.
        The email will expire in 5 minutes.
      </p>

      <div className="mt-12">
        <Link href="/auth/login" className="text-sm underline">
          Return To Login
        </Link>
      </div>
    </div>
  ) : (
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

      <div className="mt-3">
        <LoginWithEmailButton />
      </div>
    </form>
  );
}
