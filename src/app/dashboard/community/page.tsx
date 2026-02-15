"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

const CHANNELS = [
  { id: "general", name: "General", unread: 3 },
  { id: "skincare", name: "Skincare Tips", unread: 7 },
  { id: "wellness", name: "Wellness Journey", unread: 0 },
  { id: "events", name: "Events", unread: 1 },
];

const MESSAGES: Record<string, { sender: string; initials: string; text: string; time: string }[]> = {
  general: [
    { sender: "Amara K.", initials: "AK", text: "Good morning everyone! Just finished my morning ritual and feeling amazing today.", time: "9:15 AM" },
    { sender: "Sofia R.", initials: "SR", text: "Has anyone tried the new Neuro-Glow Serum? My skin is literally glowing after 2 weeks!", time: "9:32 AM" },
    { sender: "Jade L.", initials: "JL", text: "Yes! I got it last week. The texture is incredible — absorbs so quickly.", time: "9:45 AM" },
    { sender: "Marcus T.", initials: "MT", text: "I'm more into the supplements side. The Calm Mind Capsules have really helped with my sleep.", time: "10:10 AM" },
    { sender: "Priya N.", initials: "PN", text: "Speaking of sleep, has anyone taken the Holistic Sleep Science course? Thinking of starting it.", time: "10:28 AM" },
    { sender: "Amara K.", initials: "AK", text: "I completed it last month — highly recommend! The breathing techniques before bed are game-changing.", time: "10:35 AM" },
    { sender: "Lena W.", initials: "LW", text: "Anyone going to the VIP Members Mixer on the 25th? Would love to meet some of you!", time: "11:02 AM" },
  ],
  skincare: [
    { sender: "Dr. Chen", initials: "DC", text: "Tip of the day: Always apply your vitamin C serum before sunscreen for maximum photoprotection.", time: "8:00 AM" },
    { sender: "Sofia R.", initials: "SR", text: "Is it okay to use retinol and niacinamide together? I've heard mixed things.", time: "8:45 AM" },
    { sender: "Dr. Chen", initials: "DC", text: "Great question! Yes, they work beautifully together. The old advice about not mixing them has been debunked.", time: "9:00 AM" },
    { sender: "Jade L.", initials: "JL", text: "My skin barrier was so damaged before joining eyeam. The course on ingredient layering saved me.", time: "9:30 AM" },
    { sender: "Amara K.", initials: "AK", text: "Same here! Learning about pH-dependent actives changed everything for my routine.", time: "10:15 AM" },
  ],
  wellness: [
    { sender: "Marcus T.", initials: "MT", text: "Day 30 of my meditation streak! The Meditation for Radiance course got me hooked.", time: "7:30 AM" },
    { sender: "Priya N.", initials: "PN", text: "That's amazing Marcus! I'm on day 12. It's already helping with my anxiety.", time: "8:00 AM" },
    { sender: "Lena W.", initials: "LW", text: "I started journaling alongside my skincare routine. The mind-skin connection is real.", time: "9:00 AM" },
  ],
  events: [
    { sender: "eyeam Team", initials: "EY", text: "VIP Members Mixer — Feb 25, 7PM at our London flagship. RSVP in the app!", time: "Yesterday" },
    { sender: "eyeam Team", initials: "EY", text: "New Workshop: 'Building Your Night Routine' with Dr. Chen — March 5, 6PM. Open to Premium & VIP.", time: "2 days ago" },
    { sender: "Amara K.", initials: "AK", text: "Can't wait for the mixer! Will there be product samples?", time: "Yesterday" },
  ],
};

const PINNED = "Welcome to the eyeam community! Be kind, share your journey, and remember: you are enough.";

function CommunityContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Demo User";
  const tier = searchParams.get("tier") || "premium";
  const qs = `?name=${encodeURIComponent(name)}&tier=${encodeURIComponent(tier)}`;

  const [activeChannel, setActiveChannel] = useState("general");
  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<string, { sender: string; initials: string; text: string; time: string }[]>>({});

  const allMessages = [
    ...(MESSAGES[activeChannel] || []),
    ...(localMessages[activeChannel] || []),
  ];

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    setLocalMessages((prev) => ({
      ...prev,
      [activeChannel]: [
        ...(prev[activeChannel] || []),
        { sender: name, initials, text: message, time: "Just now" },
      ],
    }));
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted">
          <Link href={`/dashboard${qs}`} className="hover:text-lime transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-foreground">Community</span>
        </div>

        <div className="flex h-[calc(100vh-12rem)] rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {/* Sidebar */}
          <div className="hidden w-64 flex-shrink-0 border-r border-white/10 md:block">
            <div className="border-b border-white/10 p-4">
              <h2 className="font-bold">Channels</h2>
              <p className="text-xs text-muted">142 members online</p>
            </div>
            <div className="p-2">
              {CHANNELS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all cursor-pointer ${
                    activeChannel === ch.id
                      ? "bg-lime/10 text-lime"
                      : "text-muted hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <span># {ch.name}</span>
                  {ch.unread > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime text-xs font-bold text-black">
                      {ch.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex flex-1 flex-col">
            {/* Channel Header */}
            <div className="border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">#{CHANNELS.find((c) => c.id === activeChannel)?.name}</h3>
                <span className="text-xs text-muted">142 online</span>
              </div>
              {/* Mobile channel selector */}
              <div className="mt-2 flex gap-2 overflow-x-auto md:hidden">
                {CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`flex-shrink-0 rounded-full px-3 py-1 text-xs cursor-pointer ${
                      activeChannel === ch.id
                        ? "bg-lime text-black font-bold"
                        : "bg-white/5 text-muted"
                    }`}
                  >
                    #{ch.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Pinned */}
            <div className="border-b border-white/5 bg-lime/5 px-4 py-2">
              <p className="text-xs text-lime">
                <span className="font-bold">Pinned:</span> {PINNED}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {allMessages.map((msg, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-lime/10 text-xs font-bold text-lime">
                    {msg.initials}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold">{msg.sender}</span>
                      <span className="text-xs text-muted">{msg.time}</span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="border-t border-white/10 p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder={`Message #${CHANNELS.find((c) => c.id === activeChannel)?.name}...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-lime focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-lime px-5 py-3 text-sm font-bold text-black hover:bg-lime-dark cursor-pointer"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CommunityContent />
    </Suspense>
  );
}
