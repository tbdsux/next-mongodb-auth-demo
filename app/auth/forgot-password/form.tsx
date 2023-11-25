"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import SendRecoveryButton from "./SendRecoveryButton";
import { forgotPassword } from "./actions";

export default function ForgotPasswordForm() {
  const [state, formAction] = useFormState(forgotPassword, {
    fromAction: false,
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.fromAction) {
      if (state.success) {
        toast.success(state.message as string);
        return;
      }

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
      <div className="flex items-center mt-3">
        <SendRecoveryButton />
        <Link href="/auth/login" className="ml-4 text-sm">
          Login Account
        </Link>
      </div>
    </form>
  );
}
