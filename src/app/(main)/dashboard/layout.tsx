import { DashboardNavigation } from "~/app/(main)/dashboard/_components/DashBoardNavigation";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="container min-h-[calc(100vh-180px)] px-2 pt-6 md:px-4">
      <div className="flex flex-col gap-6 md:flex-row lg:gap-10">
        <DashboardNavigation className="flex flex-shrink-0 gap-2 md:w-48 md:flex-col lg:w-80" />
        <main className="w-full space-y-4">{children}</main>
      </div>
    </div>
  );
}
