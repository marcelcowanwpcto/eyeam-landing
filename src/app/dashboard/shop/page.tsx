"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

const CATEGORIES = ["All", "Serums", "Supplements", "Tools", "Gift Sets"];

const TIER_DISCOUNTS: Record<string, number> = { essential: 5, premium: 15, vip: 25 };

const PRODUCTS = [
  { id: 1, name: "Neuro-Glow Serum", category: "Serums", price: 68, description: "Neuropeptide-infused vitamin C serum for luminous, youthful skin.", image: "https://eyeamworld.com/cdn/shop/files/98.jpg?v=1756814110&width=600" },
  { id: 2, name: "Calm Mind Capsules", category: "Supplements", price: 34, description: "Ashwagandha, L-theanine, and magnesium for stress relief and skin clarity.", image: "https://eyeamworld.com/cdn/shop/files/9_ac060b04-fb99-40f5-bdf1-3f384f104cb6.jpg?v=1730368954&width=600" },
  { id: 3, name: "Jade Gua Sha Set", category: "Tools", price: 42, description: "Premium jade stone gua sha with rose quartz roller for facial sculpting.", image: "https://eyeamworld.com/cdn/shop/files/Crystal-ClearSpot_PigmentationTreatment-1.jpg?v=1724765581&width=600" },
  { id: 4, name: "The Ritual Gift Box", category: "Gift Sets", price: 125, description: "Our bestselling serum, candle, face mist, and jade roller in a luxury box.", image: "https://eyeamworld.com/cdn/shop/files/eyeam_holiday_sets.png?v=1761637855&width=600" },
  { id: 5, name: "Retinol Renewal Serum", category: "Serums", price: 78, description: "Encapsulated retinol with bakuchiol for gentle yet powerful skin renewal.", image: "https://eyeamworld.com/cdn/shop/files/No_Baggage_Eye_Serum.jpg?v=1726667164&width=600" },
  { id: 6, name: "Collagen Beauty Powder", category: "Supplements", price: 45, description: "Marine collagen peptides with hyaluronic acid and biotin for skin, hair, and nails.", image: "https://eyeamworld.com/cdn/shop/files/1_6541917d-1edc-443e-8384-73bac9c60e03.jpg?v=1753891099&width=600" },
  { id: 7, name: "LED Light Therapy Mask", category: "Tools", price: 189, description: "Professional-grade LED mask with red, blue, and near-infrared wavelengths.", image: "https://eyeamworld.com/cdn/shop/files/119.jpg?v=1761039407&width=600" },
  { id: 8, name: "Self-Care Starter Kit", category: "Gift Sets", price: 85, description: "Everything a beginner needs: cleanser, serum, moisturizer, and guide book.", image: "https://eyeamworld.com/cdn/shop/files/InMyHealingEraAffirmationCards-1.jpg?v=1724768170&width=600" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Demo User";
  const tier = searchParams.get("tier") || "premium";
  const qs = `?name=${encodeURIComponent(name)}&tier=${encodeURIComponent(tier)}`;
  const discount = TIER_DISCOUNTS[tier] || 5;

  const [category, setCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);

  const filtered = category === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Link href={`/dashboard${qs}`} className="hover:text-lime transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground">Shop</span>
          </div>
          {cartCount > 0 && (
            <div className="flex items-center gap-2 rounded-full bg-lime/10 px-4 py-2 text-sm">
              <svg className="h-4 w-4 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
              </svg>
              <span className="font-bold text-lime">{cartCount}</span>
            </div>
          )}
        </div>

        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold md:text-4xl">Shop Products</h1>
          <span className="rounded-full bg-lime/10 px-3 py-1 text-xs font-bold text-lime">
            {discount}% Member Discount
          </span>
        </div>
        <p className="mb-8 text-muted">Science-backed skincare, supplements, and wellness tools.</p>

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

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => {
            const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);
            return (
              <div
                key={product.id}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all hover:border-lime/30 hover:bg-white/[0.04]"
              >
                <div className="relative h-52 overflow-hidden bg-white/[0.03]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-lime px-2 py-0.5 text-xs font-bold text-black">
                    -{discount}%
                  </div>
                </div>
                <div className="p-5">
                  <span className="mb-2 inline-block rounded-full bg-white/5 px-2 py-0.5 text-xs text-muted">{product.category}</span>
                  <h3 className="mb-1 font-bold group-hover:text-lime transition-colors">{product.name}</h3>
                  <p className="mb-4 text-xs text-muted leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-lime">£{discountedPrice}</span>
                      <span className="ml-2 text-sm text-muted line-through">£{product.price}</span>
                    </div>
                    <button
                      onClick={() => setCartCount((c) => c + 1)}
                      className="rounded-full bg-lime px-4 py-1.5 text-xs font-bold text-black hover:bg-lime-dark cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ShopContent />
    </Suspense>
  );
}
