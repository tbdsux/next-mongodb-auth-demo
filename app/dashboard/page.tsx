import { getUser } from "@/services/getUser";

export default async function DashboardPage() {
  const user = await getUser();

  return <main>{JSON.stringify(user)}</main>;
}
