"use client";

import { CONCERNS } from "../lib/concerns";

interface ConcernFilterProps {
  activeConcern: string;
  onSelect: (slug: string) => void;
  className?: string;
}

export default function ConcernFilter({ activeConcern, onSelect, className = "" }: ConcernFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        onClick={() => onSelect("All")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
          activeConcern === "All"
            ? "bg-lime text-black"
            : "border border-white/10 text-muted hover:border-lime hover:text-lime"
        }`}
      >
        All Concerns
      </button>
      {CONCERNS.map((concern) => (
        <button
          key={concern.slug}
          onClick={() => onSelect(concern.slug)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
            activeConcern === concern.slug
              ? "bg-lime text-black"
              : "border border-white/10 text-muted hover:border-lime hover:text-lime"
          }`}
        >
          {concern.label}
        </button>
      ))}
    </div>
  );
}
