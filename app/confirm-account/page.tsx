import Link from "next/link";
import { confirmAccountWithToken } from "./actions";

export default async function DashboardAccountConfirmPage({
  searchParams,
}: {
  searchParams: { token: string | undefined };
}) {
  const token = searchParams.token!;
  const confirm = await confirmAccountWithToken(token);

  return (
    <main className="py-6 px-8">
      {confirm.success ? (
        <div>
          <h3 className="text-xl font-bold">
            Your account has been successfully verified
          </h3>
          <p>You can now use the platform with full access</p>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold">Failed to confirm your account</h3>
          {confirm.message}
        </div>
      )}

      <Link href="/dashboard" className="underline text-blue-500 text-sm mt-3">
        Go to dashboard
      </Link>
    </main>
  );
}
