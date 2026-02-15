"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import TierBadge from "../components/TierBadge";

const ACTIONS = [
  {
    title: "Book a Spa Session",
    description: "Reserve luxury treatments and neuro-cosmetic spa rituals",
    href: "/dashboard/spa",
    gradient: "from-lime/20 to-lime/5",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Take a Course",
    description: "Learn skincare science, meditation, and holistic wellness",
    href: "/dashboard/courses",
    gradient: "from-rose/20 to-rose/5",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a23.838 23.838 0 0 0-1.012 5.434c-.053.326.187.626.505.733a61.04 61.04 0 0 1 7.735 3.523 61.04 61.04 0 0 1 7.735-3.523.598.598 0 0 0 .505-.733 23.838 23.838 0 0 0-1.012-5.434m-15.482 0A24.256 24.256 0 0 1 12 6.136c3.486 0 6.76.738 9.74 2.01M4.26 10.147A60.436 60.436 0 0 1 12 7.885a60.436 60.436 0 0 1 7.74 2.262" />
      </svg>
    ),
  },
  {
    title: "Shop Products",
    description: "Explore neuro-cosmetic skincare, supplements, and tools",
    href: "/dashboard/shop",
    gradient: "from-warm/20 to-warm/5",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    title: "Community Chat",
    description: "Connect with members and share your wellness journey",
    href: "/dashboard/community",
    gradient: "from-muted/20 to-muted/5",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
];

const UPCOMING = [
  { title: "Neuro-Glow Facial", date: "Feb 18, 2:00 PM", type: "Spa" },
  { title: "Meditation Basics", date: "Feb 20, 10:00 AM", type: "Course" },
  { title: "VIP Members Mixer", date: "Feb 25, 7:00 PM", type: "Event" },
];

const ACTIVITY = [
  { text: "Completed 'Skincare Science 101' course", time: "2 hours ago" },
  { text: "Booked a Deep Tissue Massage for Feb 22", time: "Yesterday" },
  { text: "Purchased Neuro-Glow Serum (15% member discount)", time: "2 days ago" },
  { text: "Joined the #wellness-journey channel", time: "3 days ago" },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Demo User";
  const tier = searchParams.get("tier") || "premium";
  const qs = `?name=${encodeURIComponent(name)}&tier=${encodeURIComponent(tier)}`;

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Welcome */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold md:text-4xl">Welcome back, {name.split(" ")[0]}</h1>
            <TierBadge tier={tier} />
          </div>
          <p className="text-muted">Your wellness dashboard — everything in one place.</p>
        </div>

        {/* Action Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {ACTIONS.map((action) => (
            <Link
              key={action.title}
              href={`${action.href}${qs}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-lime/30 hover:bg-white/[0.04]"
            >
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${action.gradient} text-lime transition-colors group-hover:text-lime`}>
                {action.icon}
              </div>
              <h3 className="mb-1 text-lg font-bold group-hover:text-lime transition-colors">{action.title}</h3>
              <p className="text-sm text-muted">{action.description}</p>
            </Link>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="mb-4 text-lg font-bold">Upcoming</h2>
            <div className="space-y-4">
              {UPCOMING.map((item) => (
                <div key={item.title} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted">{item.date}</p>
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted">{item.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="mb-4 text-lg font-bold">Recent Activity</h2>
            <div className="space-y-4">
              {ACTIVITY.map((item) => (
                <div key={item.text} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0">
                  <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-lime" />
                  <div>
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-muted">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DashboardContent />
    </Suspense>
  );
}
