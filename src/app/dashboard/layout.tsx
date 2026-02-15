"use client";

import { Suspense } from "react";
import DashboardNav from "../components/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DashboardNav />
      <main className="pt-16">{children}</main>
    </Suspense>
  );
}
