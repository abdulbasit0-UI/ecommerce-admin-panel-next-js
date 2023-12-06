"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `${params.storeId}/settings`,
      label: "settings",
      active: pathname === `/${params.storeId}/settings`,
    },
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Bill Boards",
      active: pathname === `/${params.storeId}/billboards`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => {
        return (
          <Link
            className={cn(
              `text-sm font-medium transition-colors hover:text-primary`,
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
            key={route.href}
            href={route.href}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}
