"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import CreateAccountButton from "./CreateAccountButton";
import { createAccount } from "./actions";

export default function RegisterForm() {
  const [state, formAction] = useFormState(createAccount, {
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
    <form action={formAction} className="mt-4">
      <div className="flex flex-col my-1">
        <label htmlFor="email" className="text-sm">
          Your full name
        </label>
        <input
          type="text"
          placeholder="Your full name..."
          className="border py-2 px-4 rounded-lg"
          name="fullName"
          required
        />
      </div>
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
      <div className="flex flex-col my-1">
        <label htmlFor="password" className="text-sm">
          Confirm your password
        </label>
        <input
          type="password"
          placeholder="Confirm your account password..."
          className="border py-2 px-4 rounded-lg"
          name="confirmPassword"
          required
        />
      </div>

      <div className="flex items-center mt-3">
        <CreateAccountButton />
        <Link href="/auth/login" className="ml-4 text-sm">
          Already have an account
        </Link>
      </div>
    </form>
  );
}
