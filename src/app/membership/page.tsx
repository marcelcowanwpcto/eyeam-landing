"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

const TIERS = [
  {
    id: "essential",
    name: "Essential",
    price: "9.99",
    period: "/month",
    description: "Begin your wellness journey",
    color: "border-muted",
    features: [
      "Access to community forums",
      "5% discount on all products",
      "Monthly wellness newsletter",
      "1 free guided meditation per month",
      "Basic course library access",
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "24.99",
    period: "/month",
    description: "Elevate your self-care ritual",
    color: "border-lime",
    features: [
      "Everything in Essential",
      "15% discount on all products",
      "Priority spa booking",
      "Full course library access",
      "Monthly product samples",
      "Exclusive live workshops",
      "1-on-1 skincare consultation",
    ],
    popular: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: "49.99",
    period: "/month",
    description: "The ultimate eyeam experience",
    color: "border-rose",
    features: [
      "Everything in Premium",
      "25% discount on all products",
      "VIP spa access & priority",
      "Unlimited course access",
      "Quarterly curated gift box",
      "Private community & events",
      "Dedicated wellness advisor",
      "Early access to new launches",
    ],
    popular: false,
  },
];

function MembershipContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") || "Demo User";

  const selectTier = (tierId: string) => {
    router.push(`/dashboard?name=${encodeURIComponent(name)}&tier=${tierId}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Link href="/" className="inline-block text-3xl font-bold tracking-wider mb-8">
            <span className="text-lime">eye</span>am
          </Link>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime">
            Welcome, {name}!
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Choose Your Membership
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Select the tier that fits your wellness goals. You can upgrade anytime.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl border-2 ${tier.color} bg-white/[0.02] p-8 transition-all hover:bg-white/[0.04] ${
                tier.popular ? "lg:scale-105 lg:shadow-[0_0_60px_rgba(205,255,0,0.1)]" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-lime px-4 py-1 text-xs font-bold uppercase tracking-wider text-black">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="mb-2 text-2xl font-bold">{tier.name}</h3>
                <p className="mb-4 text-sm text-muted">{tier.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg text-muted">£</span>
                  <span className="text-5xl font-bold">{tier.price}</span>
                  <span className="text-muted">{tier.period}</span>
                </div>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => selectTier(tier.id)}
                className={`block w-full rounded-full py-3 text-center text-sm font-bold transition-all cursor-pointer ${
                  tier.popular
                    ? "bg-lime text-black hover:bg-lime-dark"
                    : "border border-white/20 text-foreground hover:border-lime hover:text-lime"
                }`}
              >
                Select {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MembershipPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <MembershipContent />
    </Suspense>
  );
}
