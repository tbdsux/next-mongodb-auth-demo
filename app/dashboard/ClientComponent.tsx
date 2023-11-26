"use client";

import { useAuth } from "@/providers/AuthProvider";
import { toast } from "react-toastify";

export default function ClientComponent() {
  const { user } = useAuth();

  return (
    <button
      onClick={() => {
        toast.info(`Hello ${user?.fullName}`);
      }}
      className="bg-blue-400 hover:bg-blue-500 text-sm py-1 px-3 rounded-lg text-white my-3"
    >
      Alert Me (Client Component)
    </button>
  );
}
