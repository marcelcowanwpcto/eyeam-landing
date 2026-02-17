"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CONCERNS } from "./lib/concerns";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Membership", href: "#membership" },
  { label: "Community", href: "#community" },
  { label: "Sign Up", href: "#signup" },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Book Spa Sessions",
    description:
      "Reserve your spot at our luxury wellness spaces. From facials to full-body treatments, experience neuro-cosmetic spa rituals designed to heal mind, body, and skin.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a23.838 23.838 0 0 0-1.012 5.434c-.053.326.187.626.505.733a61.04 61.04 0 0 1 7.735 3.523 61.04 61.04 0 0 1 7.735-3.523.598.598 0 0 0 .505-.733 23.838 23.838 0 0 0-1.012-5.434m-15.482 0A24.256 24.256 0 0 1 12 6.136c3.486 0 6.76.738 9.74 2.01M4.26 10.147A60.436 60.436 0 0 1 12 7.885a60.436 60.436 0 0 1 7.74 2.262" />
      </svg>
    ),
    title: "Take Courses",
    description:
      "Learn from leading experts in skincare science, meditation, holistic wellness, and self-care. Courses range from beginner to advanced, all rooted in neuro-cosmetic research.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
    title: "Shop Products",
    description:
      "Access our full range of neuro-cosmetic skincare, supplements, and wellness tools. Members enjoy exclusive discounts on all products developed in our London labs.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: "Join the Community",
    description:
      "Connect with thousands of like-minded individuals on their wellness journey. Share experiences, attend events, and be part of the growing eyeam movement.",
  },
];

const TIERS = [
  {
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
    cta: "Get Started",
    popular: false,
  },
  {
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
    cta: "Go Premium",
    popular: true,
  },
  {
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
    cta: "Join VIP",
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    quote: "eyeam transformed my skincare routine and my mindset. The courses are life-changing.",
    name: "Amara K.",
    role: "Premium Member",
  },
  {
    quote: "The spa sessions are unlike anything I've experienced. True mind-body healing.",
    name: "Sofia R.",
    role: "VIP Member",
  },
  {
    quote: "Being part of this community makes me feel seen and supported every single day.",
    name: "Jade L.",
    role: "Essential Member",
  },
];

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/membership?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="block">
            <img src="/eyeam-logo.svg" alt="eyeam" className="h-8 w-auto" />
          </a>
          <div className="hidden gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-lime"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Link
            href="/signup"
            className="hidden rounded-full bg-lime px-6 py-2 text-sm font-semibold text-black transition-all hover:bg-lime-dark md:block"
          >
            Join Now
          </Link>
          <button
            className="text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-background px-6 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 text-muted transition-colors hover:text-lime"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/signup"
              className="mt-2 inline-block rounded-full bg-lime px-6 py-2 text-sm font-semibold text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Now
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        <Image
          src="https://eyeamworld.com/cdn/shop/files/Eyeam_Product_Campaign_20259092.jpg?v=1749825090&width=2000"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(205,255,0,0.08)_0%,_transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="animate-fade-in-up mb-6 text-sm font-medium uppercase tracking-[0.3em] text-lime">
            mind. body. spirit. skin.
          </p>
          <h1 className="animate-fade-in-up-delay mb-8 text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
            Welcome to{" "}
            <span className="gradient-text">eyeam</span>
          </h1>
          <p className="animate-fade-in-up-delay-2 mx-auto mb-12 max-w-2xl text-lg text-muted md:text-xl">
            The first neuro-cosmetic wellness platform. Book spa sessions, master
            courses, shop science-backed products, and join a community that
            believes in the power of self-care.
          </p>
          <div className="animate-fade-in-up-delay-2 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="animate-pulse-glow rounded-full bg-lime px-10 py-4 text-base font-bold text-black transition-all hover:bg-lime-dark"
            >
              Start Your Journey
            </Link>
            <a
              href="#features"
              className="rounded-full border border-white/20 px-10 py-4 text-base font-medium text-foreground transition-all hover:border-lime hover:text-lime"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Mantra Bar */}
      <section className="border-y border-white/10 bg-white/[0.02] py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-6 text-sm font-medium uppercase tracking-[0.2em] text-muted md:gap-16">
          <span>I am healed</span>
          <span className="text-lime">&#x2022;</span>
          <span>I am enough</span>
          <span className="text-lime">&#x2022;</span>
          <span>I am beautiful</span>
          <span className="text-lime">&#x2022;</span>
          <span>I am whole</span>
          <span className="text-lime">&#x2022;</span>
          <span>I am radiant</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime">
              What You Can Do
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Everything in One Place
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted">
              Your complete wellness ecosystem — from spa bookings to expert courses,
              curated products, and a vibrant community.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-lime/30 hover:bg-white/[0.04]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-lime/10 text-lime transition-colors group-hover:bg-lime/20">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Concern */}
      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime">
              Personalised Wellness
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Shop by Concern
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted">
              Whether it&apos;s stress, breakouts, or ageing — find treatments and products
              tailored to what your skin and body actually need.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CONCERNS.map((concern) => (
              <Link
                key={concern.slug}
                href="/signup"
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-lime/30 hover:bg-white/[0.04]"
              >
                <h3 className="mb-2 text-lg font-bold group-hover:text-lime transition-colors">
                  {concern.label}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {concern.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section id="membership" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime">
              Membership Tiers
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Choose Your Level
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted">
              Unlock exclusive access, deeper discounts, and premium experiences.
              Every tier brings you closer to your best self.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
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
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block rounded-full py-3 text-center text-sm font-bold transition-all ${
                    tier.popular
                      ? "bg-lime text-black hover:bg-lime-dark"
                      : "border border-white/20 text-foreground hover:border-lime hover:text-lime"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community / Testimonials */}
      <section id="community" className="border-y border-white/10 bg-white/[0.02] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime">
              Community
            </p>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Join the Movement
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted">
              Thousands of members worldwide are transforming their lives through
              the eyeam philosophy. Here&apos;s what they have to say.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-lime"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-muted">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-12 text-center">
            <div>
              <p className="text-4xl font-bold text-lime">10K+</p>
              <p className="mt-1 text-sm text-muted">Active Members</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-lime">50+</p>
              <p className="mt-1 text-sm text-muted">Expert Courses</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-lime">200+</p>
              <p className="mt-1 text-sm text-muted">Spa Locations</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-lime">98%</p>
              <p className="mt-1 text-sm text-muted">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section id="signup" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-lime">
            Get Started
          </p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Begin Your Journey
          </h2>
          <p className="mb-12 text-lg text-muted">
            Sign up today and take the first step towards a more radiant,
            balanced you. Your skin — and soul — will thank you.
          </p>
          {submitted ? (
            <div className="rounded-2xl border border-lime/30 bg-lime/5 p-8">
              <svg
                className="mx-auto mb-4 h-12 w-12 text-lime"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mb-2 text-xl font-bold">Welcome to eyeam!</h3>
              <p className="text-muted">
                Check your inbox for next steps. Your journey starts now.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-6 py-4 text-foreground placeholder:text-muted/50 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-6 py-4 text-foreground placeholder:text-muted/50 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-lime py-4 text-base font-bold text-black transition-all hover:bg-lime-dark"
              >
                Sign Up Free
              </button>
              <p className="text-xs text-muted">
                By signing up, you agree to our Terms of Service and Privacy
                Policy. Choose your membership tier after registration.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="mb-4">
                <img src="/eyeam-logo.svg" alt="eyeam" className="h-8 w-auto" />
              </div>
              <p className="text-sm leading-relaxed text-muted">
                The first in neuro-cosmetics. Science-backed skincare and
                wellness, developed in London.
              </p>
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider">
                Platform
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#features" className="transition-colors hover:text-lime">Spa Booking</a></li>
                <li><a href="#features" className="transition-colors hover:text-lime">Courses</a></li>
                <li><a href="#features" className="transition-colors hover:text-lime">Shop</a></li>
                <li><a href="#community" className="transition-colors hover:text-lime">Community</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider">
                Membership
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#membership" className="transition-colors hover:text-lime">Essential</a></li>
                <li><a href="#membership" className="transition-colors hover:text-lime">Premium</a></li>
                <li><a href="#membership" className="transition-colors hover:text-lime">VIP</a></li>
                <li><a href="#membership" className="transition-colors hover:text-lime">Compare Plans</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider">
                Connect
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="https://eyeamworld.com" className="transition-colors hover:text-lime" target="_blank" rel="noopener noreferrer">eyeamworld.com</a></li>
                <li><a href="#" className="transition-colors hover:text-lime">Instagram</a></li>
                <li><a href="#" className="transition-colors hover:text-lime">TikTok</a></li>
                <li><a href="#" className="transition-colors hover:text-lime">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-muted">
            <p>&copy; {new Date().getFullYear()} eyeam. All rights reserved. mind. body. spirit. skin.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
