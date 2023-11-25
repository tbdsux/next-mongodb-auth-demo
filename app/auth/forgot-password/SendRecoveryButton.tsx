"use client";

import { useFormStatus } from "react-dom";

export default function SendRecoverButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 py-3 px-12 rounded-lg text-white text-sm font-medium"
    >
      {pending ? "Sending recovery email..." : "Reset my password"}
    </button>
  );
}
