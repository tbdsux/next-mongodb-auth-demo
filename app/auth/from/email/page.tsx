import { verifyAndLoginToken } from "./actions";

export default async function AuthFromEmailPage({
  searchParams,
}: {
  searchParams: { token: string | undefined };
}) {
  const token = searchParams.token!;
  const confirmed = await verifyAndLoginToken(token);

  return (
    <div>
      <main className="flex items-center justify-center py-32">
        <div className="w-5/6 md:w-1/2 xl:w-1/3 mx-auto">
          <h3 className="text-xl font-bold">Email Authentication</h3>
          <p className="text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo,
            deserunt. A, iste perferendis. Quae, mollitia.
          </p>

          {!confirmed.success && (
            <div className="mt-4">
              <strong className="font-bold">Failed to validate token</strong>
              <p className="text-red-500">{confirmed.message}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
