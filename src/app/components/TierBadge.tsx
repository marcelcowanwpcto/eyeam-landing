"use client";

const TIER_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  essential: { bg: "bg-white/10", text: "text-white", label: "Essential" },
  premium: { bg: "bg-lime/20", text: "text-lime", label: "Premium" },
  vip: { bg: "bg-rose/20", text: "text-rose", label: "VIP" },
};

export default function TierBadge({ tier }: { tier: string }) {
  const style = TIER_STYLES[tier] || TIER_STYLES.essential;
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
