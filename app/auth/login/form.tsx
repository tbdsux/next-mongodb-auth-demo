"use client";

import { useFormState } from "react-dom";
import LoginButton from "./LoginButton";
import { loginAccount } from "./actions";

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAccount, {
    success: false,
    message: "",
  });

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
        />
      </div>
      <div className="flex mt-3">
        <LoginButton />
      </div>

      {JSON.stringify(state)}
    </form>
  );
}
