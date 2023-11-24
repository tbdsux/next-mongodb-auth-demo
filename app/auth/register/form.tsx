import Link from "next/link";
import CreateAccountButton from "./CreateAccountButton";
import { createAccount } from "./actions";

export default function RegisterForm() {
  return (
    <form action={createAccount} className="mt-4">
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
