"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileTextIcon,
  CreditCard,
  GearIcon,
  ExitIcon,
} from "~/components/Icons";
import { cn } from "~/lib/utils";

const items = [
  {
    title: "Posts",
    href: "/dashboard",
    icon: FileTextIcon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: GearIcon,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Logout",
    href: "/logout",
    icon: ExitIcon,
  },
];

interface DashboardNavigationProps {
  className?: string;
}

export const DashboardNavigation = ({
  className,
}: DashboardNavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn(className)}>
      {items.map((item) => (
        <Link href={item.href} key={item.href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent" : "transparent",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
};
