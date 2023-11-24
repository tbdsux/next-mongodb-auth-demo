"use client";

import { useFormStatus } from "react-dom";

export default function CreateAccountButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 py-3 px-12 rounded-lg text-white text-sm font-medium"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "Creating Account..." : "Create Account"}
    </button>
  );
}
