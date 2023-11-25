import { confirmResetToken } from "./actions";
import ResetPasswordForm from "./form";

export default async function AuthResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string | undefined };
}) {
  const token = searchParams.token!;
  const confirmed = await confirmResetToken(token);

  return (
    <main className="flex items-center justify-center py-32">
      <div className="w-1/3 mx-auto">
        <h3 className="text-xl font-bold">Reset Account Password</h3>
        <p className="text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo,
          deserunt. A, iste perferendis. Quae, mollitia.
        </p>

        {confirmed.success ? (
          <ResetPasswordForm fpToken={token} />
        ) : (
          <div className="mt-4">
            <strong className="font-bold">Failed to validate token</strong>
            <p className="text-red-500">{confirmed.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
