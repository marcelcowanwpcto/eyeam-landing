export const CONCERNS = [
  { slug: "acne", label: "Acne", description: "Target breakouts and blemishes with science-backed treatments." },
  { slug: "hormones", label: "Hormones", description: "Rebalance your body with hormone-supportive wellness rituals." },
  { slug: "inflammation", label: "Inflammation", description: "Calm irritation and redness with soothing, restorative care." },
  { slug: "stress", label: "Stress", description: "Melt away tension with mind-body treatments and adaptogens." },
  { slug: "hydration", label: "Hydration", description: "Replenish and plump your skin with deep hydration therapies." },
  { slug: "anti-ageing", label: "Anti-ageing", description: "Turn back the clock with collagen-boosting, renewal treatments." },
  { slug: "sleep", label: "Sleep", description: "Restore restful sleep with calming rituals and supplements." },
] as const;

export type ConcernSlug = (typeof CONCERNS)[number]["slug"];
