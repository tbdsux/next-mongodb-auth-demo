"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import ResetPasswordButton from "./ResetPasswordButton";
import { resetPassword } from "./actions";

export default function ResetPasswordForm({ fpToken }: { fpToken: string }) {
  const [state, formAction] = useFormState(resetPassword, {
    fromAction: false,
    success: false,
    message: "",
  });

  useEffect(() => {
    if (!state.fromAction) return;

    if (state.success) {
      toast.success("You have successfully reset your account's password!");
      return;
    }

    if (Array.isArray(state.message)) {
      for (const i of state.message) {
        toast.error(i.message);
      }

      return;
    }

    toast.error(state.message);
  }, [state]);

  return state.fromAction && state.success ? (
    <div className="mt-4">
      <p>You have successfully reset your account's password!</p>

      <Link href="/auth/login" className="underline text-sm mt-2">
        Return to Login
      </Link>
    </div>
  ) : (
    <form className="mt-4" action={formAction}>
      <input type="hidden" name="token" value={fpToken} required />
      <div className="flex flex-col my-1">
        <label htmlFor="password" className="text-sm">
          Your new password
        </label>
        <input
          type="password"
          placeholder="Your account password..."
          className="border py-2 px-4 rounded-lg"
          name="password"
          required
        />
      </div>
      <div className="flex flex-col my-1">
        <label htmlFor="password" className="text-sm">
          Confirm your new password
        </label>
        <input
          type="password"
          placeholder="Your account password..."
          className="border py-2 px-4 rounded-lg"
          name="confirmPassword"
          required
        />
      </div>
      <div className="mt-3">
        <ResetPasswordButton />
      </div>
    </form>
  );
}
