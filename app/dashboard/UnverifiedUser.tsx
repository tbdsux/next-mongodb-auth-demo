"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { sendVerificationEmail } from "./actions";

export default function UnverifiedUser() {
  const [state, formAction] = useFormState(sendVerificationEmail, {
    fromAction: false,
    success: false,
    message: "",
  });

  useEffect(() => {
    if (!state.fromAction) return;

    if (state.success) {
      toast.success("Successfully sent confirmation email!");
      return;
    }

    toast.error("Failed to send a confirmation email");
  }, [state]);

  return (
    <div className="mt-6">
      Seems you are not yet verified
      <br />
      <form action={formAction}>
        <button type="submit" className="text-sm underline text-blue-500">
          Click here to send confirmation email
        </button>
      </form>
    </div>
  );
}
