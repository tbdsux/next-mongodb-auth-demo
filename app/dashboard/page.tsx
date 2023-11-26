import { getUser } from "@/services/getUser";
import ClientComponent from "./ClientComponent";
import UnverifiedUser from "./UnverifiedUser";
import { logoutAccount } from "./actions";

export default async function DashboardPage() {
  const { user } = await getUser();

  return (
    <main className="py-6 px-8">
      <h4>
        Welcome back <span className="font-bold">{user?.fullName}</span>
      </h4>

      <pre>
        <code>{JSON.stringify(user, null, 4)}</code>
      </pre>

      <ClientComponent />

      {!user?.verified ? <UnverifiedUser /> : <></>}

      <div className="mt-10">
        <form action={logoutAccount}>
          <button type="submit" className="border py-1 px-4 rounded-lg text-sm">
            Logout
          </button>
        </form>
      </div>
    </main>
  );
}
