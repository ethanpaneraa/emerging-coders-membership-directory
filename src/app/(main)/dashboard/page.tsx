import { Metadata } from "next";
import { env } from "~/env";
import { authCheck } from "~/server/auth-check";
interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Dashboard",
  description: "Dashboard",
};

export default async function DashboardPage({ children }: Props) {
  const { user } = await authCheck();

  return (
    <div className="container min-h-[calc(100vh-180px)] px-2 pt-6 md:px-4">
      <div className="flex flex-col gap-6 md:flex-grow lg:gap-10">
        {children}
      </div>
    </div>
  );
}
