"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavigationLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
}
export default function NavigationLink({
  href,
  className,
  children,
}: NavigationLinkProps) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;
  return (
    <Link
      data-active={isActive}
      href={href}
      className={cn("data-[active=true]:text-primary", className)}
    >
      {children}
    </Link>
  );
}
