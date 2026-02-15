"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TierBadge from "./TierBadge";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Spa", href: "/dashboard/spa" },
  { label: "Courses", href: "/dashboard/courses" },
  { label: "Shop", href: "/dashboard/shop" },
  { label: "Community", href: "/dashboard/community" },
];

export default function DashboardNav() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Demo User";
  const tier = searchParams.get("tier") || "premium";

  // Build query string to persist across navigation
  const qs = `?name=${encodeURIComponent(name)}&tier=${encodeURIComponent(tier)}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-bold tracking-wider">
          <span className="text-lime">eye</span>am
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={`${item.href}${qs}`}
              className="text-sm text-muted transition-colors hover:text-lime"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <TierBadge tier={tier} />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime/20 text-xs font-bold text-lime">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  );
}
