"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import TierBadge from "../components/TierBadge";
import { CONCERNS } from "../lib/concerns";

const ACTIONS = [
  {
    title: "Book a Spa Session",
    description: "Reserve luxury treatments and neuro-cosmetic spa rituals",
    href: "/dashboard/spa",
    image: "https://eyeamworld.com/cdn/shop/files/Eyeam_Summer_20242407_2128daef-2b28-4692-8d25-00033adf4abe.jpg?v=1732787190&width=600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" />
      </svg>
    ),
  },
  {
    title: "Take a Course",
    description: "Learn skincare science, meditation, and holistic wellness",
    href: "/dashboard/courses",
    image: "https://eyeamworld.com/cdn/shop/files/your_healing_toolbox.jpg?v=1732893108&width=600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347" />
      </svg>
    ),
  },
  {
    title: "Shop Products",
    description: "Explore neuro-cosmetic skincare, supplements, and tools",
    href: "/dashboard/shop",
    image: "https://eyeamworld.com/cdn/shop/files/Eyeam_Product_Campaign_20259092.jpg?v=1749825090&width=600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
      </svg>
    ),
  },
  {
    title: "Community Chat",
    description: "Connect with members and share your wellness journey",
    href: "/dashboard/community",
    image: "https://eyeamworld.com/cdn/shop/files/EYEAM-6509-Edit-2.jpg?v=1733503717&width=600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772" />
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
              className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all hover:border-lime/30 hover:bg-white/[0.04]"
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={action.image}
                  alt={action.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-lime/20 backdrop-blur-sm text-lime">
                  {action.icon}
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-bold group-hover:text-lime transition-colors">{action.title}</h3>
                <p className="text-xs text-muted">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Shop by Concern */}
        <div className="mb-12">
          <h2 className="mb-4 text-lg font-bold">Shop by Concern</h2>
          <div className="flex flex-wrap gap-2">
            {CONCERNS.map((concern) => (
              <Link
                key={concern.slug}
                href={`/dashboard/spa${qs}&concern=${concern.slug}`}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-muted transition-all hover:border-lime hover:text-lime"
              >
                {concern.label}
              </Link>
            ))}
          </div>
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
