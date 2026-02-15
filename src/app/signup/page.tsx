"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/membership?name=${encodeURIComponent(form.name)}`);
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left: Image Panel (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://eyeamworld.com/cdn/shop/files/Eyeam_Summer_20242407_2128daef-2b28-4692-8d25-00033adf4abe.jpg?v=1732787190&width=1400"
          alt="eyeam wellness"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-lime mb-3">mind. body. spirit. skin.</p>
          <h2 className="text-3xl font-bold mb-3">Your wellness journey starts here</h2>
          <p className="text-muted max-w-md">Join thousands of members transforming their lives through neuro-cosmetic science and holistic self-care.</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <Link href="/" className="inline-block text-3xl font-bold tracking-wider mb-2">
              <span className="text-lime">eye</span>am
            </Link>
            <p className="text-muted">Create your account to begin your wellness journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={update("name")}
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-6 py-4 text-foreground placeholder:text-muted/50 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
            />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={update("email")}
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-6 py-4 text-foreground placeholder:text-muted/50 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={update("password")}
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-6 py-4 text-foreground placeholder:text-muted/50 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={form.confirm}
              onChange={update("confirm")}
              required
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-6 py-4 text-foreground placeholder:text-muted/50 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-lime py-4 text-base font-bold text-black transition-all hover:bg-lime-dark"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/dashboard?name=Demo+User&tier=premium" className="text-lime hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
