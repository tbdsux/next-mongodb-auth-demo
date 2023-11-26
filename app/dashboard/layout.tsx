import AuthProvider from "@/providers/AuthProvider";
import { getUser } from "@/services/getUser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUser();

  return <AuthProvider user={user}>{children}</AuthProvider>;
}
