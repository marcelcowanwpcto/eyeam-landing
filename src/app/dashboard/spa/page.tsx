"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

const CATEGORIES = ["All", "Facial", "Body", "Mind", "Signature"];

const TREATMENTS = [
  { id: 1, name: "Neuro-Glow Facial", category: "Facial", duration: "60 min", price: 85, description: "A science-backed facial combining LED therapy, neuropeptide serums, and lymphatic drainage for radiant, youthful skin.", gradient: "from-lime/30 to-lime/10" },
  { id: 2, name: "Deep Tissue Massage", category: "Body", duration: "90 min", price: 120, description: "Therapeutic deep tissue work targeting tension and stress, enhanced with our signature neuro-cosmetic body oils.", gradient: "from-rose/30 to-rose/10" },
  { id: 3, name: "Mindful Meditation Pod", category: "Mind", duration: "45 min", price: 55, description: "Guided meditation in our sensory-deprivation pods with binaural beats and aromatherapy for deep mental reset.", gradient: "from-muted/30 to-muted/10" },
  { id: 4, name: "The eyeam Signature", category: "Signature", duration: "120 min", price: 195, description: "Our ultimate treatment: full-body exfoliation, neuro-glow facial, scalp therapy, and guided breathwork.", gradient: "from-warm/30 to-warm/10" },
  { id: 5, name: "Crystal Energy Facial", category: "Facial", duration: "75 min", price: 110, description: "Rose quartz gua sha, vitamin C infusion, and micro-current lifting for sculpted, luminous skin.", gradient: "from-rose/20 to-lime/10" },
  { id: 6, name: "Sound Bath & Body Wrap", category: "Mind", duration: "90 min", price: 140, description: "Tibetan singing bowls paired with a detoxifying seaweed wrap for total body-mind recalibration.", gradient: "from-lime/20 to-warm/10" },
];

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

function SpaContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Demo User";
  const tier = searchParams.get("tier") || "premium";
  const qs = `?name=${encodeURIComponent(name)}&tier=${encodeURIComponent(tier)}`;

  const [category, setCategory] = useState("All");
  const [selectedTreatment, setSelectedTreatment] = useState<number | null>(null);
  const [booked, setBooked] = useState(false);

  const filtered = category === "All" ? TREATMENTS : TREATMENTS.filter((t) => t.category === category);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted">
          <Link href={`/dashboard${qs}`} className="hover:text-lime transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-foreground">Spa Booking</span>
        </div>

        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Book a Spa Session</h1>
        <p className="mb-8 text-muted">Discover our neuro-cosmetic treatments designed for mind, body, and skin.</p>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                category === cat
                  ? "bg-lime text-black"
                  : "border border-white/10 text-muted hover:border-lime hover:text-lime"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((treatment) => (
            <div
              key={treatment.id}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all hover:border-lime/30 hover:bg-white/[0.04]"
            >
              <div className={`h-40 bg-gradient-to-br ${treatment.gradient} flex items-center justify-center`}>
                <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" />
                </svg>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted">{treatment.category}</span>
                  <span className="text-xs text-muted">{treatment.duration}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold">{treatment.name}</h3>
                <p className="mb-4 text-sm text-muted leading-relaxed">{treatment.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-lime">£{treatment.price}</span>
                  <button
                    onClick={() => { setSelectedTreatment(treatment.id); setBooked(false); }}
                    className="rounded-full bg-lime px-5 py-2 text-sm font-bold text-black transition-all hover:bg-lime-dark cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {selectedTreatment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-background p-8">
              {booked ? (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lime/20">
                    <svg className="h-8 w-8 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Booking Confirmed!</h3>
                  <p className="mb-6 text-muted">Your spa session has been reserved. Check your dashboard for details.</p>
                  <button onClick={() => setSelectedTreatment(null)} className="rounded-full bg-lime px-6 py-3 text-sm font-bold text-black hover:bg-lime-dark cursor-pointer">
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="mb-2 text-xl font-bold">
                    {TREATMENTS.find((t) => t.id === selectedTreatment)?.name}
                  </h3>
                  <p className="mb-6 text-sm text-muted">Select a date and time for your session</p>
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium">Date</label>
                    <input
                      type="date"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-foreground focus:border-lime focus:outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium">Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button key={slot} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-muted transition-all hover:border-lime hover:text-lime focus:border-lime focus:text-lime cursor-pointer">
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setSelectedTreatment(null)} className="flex-1 rounded-full border border-white/20 py-3 text-sm font-bold text-foreground hover:border-lime hover:text-lime cursor-pointer">
                      Cancel
                    </button>
                    <button onClick={() => setBooked(true)} className="flex-1 rounded-full bg-lime py-3 text-sm font-bold text-black hover:bg-lime-dark cursor-pointer">
                      Confirm Booking
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SpaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SpaContent />
    </Suspense>
  );
}
