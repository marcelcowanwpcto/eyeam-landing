"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

const CATEGORIES = ["All", "Skincare Science", "Meditation", "Nutrition", "Self-Care Rituals"];

const COURSES = [
  { id: 1, title: "Skincare Science 101", category: "Skincare Science", difficulty: "Beginner", duration: "4 weeks", lessons: 12, progress: 100, description: "Understand the biology of your skin, the science behind active ingredients, and how neuro-cosmetics work.", gradient: "from-lime/30 to-lime/10" },
  { id: 2, title: "Meditation for Radiance", category: "Meditation", difficulty: "Beginner", duration: "3 weeks", lessons: 9, progress: 60, description: "Learn how daily meditation reduces cortisol, improves skin health, and cultivates inner glow.", gradient: "from-rose/30 to-rose/10" },
  { id: 3, title: "Advanced Ingredient Decoding", category: "Skincare Science", difficulty: "Advanced", duration: "6 weeks", lessons: 18, progress: 0, description: "Deep dive into peptides, retinoids, AHAs, and how to build the perfect skincare routine.", gradient: "from-warm/30 to-warm/10" },
  { id: 4, title: "Nutrition for Skin Health", category: "Nutrition", difficulty: "Intermediate", duration: "5 weeks", lessons: 15, progress: 30, description: "Discover the gut-skin connection, anti-inflammatory diets, and supplements that transform your skin.", gradient: "from-muted/30 to-muted/10" },
  { id: 5, title: "Morning Ritual Mastery", category: "Self-Care Rituals", difficulty: "Beginner", duration: "2 weeks", lessons: 7, progress: 0, description: "Design your perfect morning routine combining skincare, movement, and mindfulness.", gradient: "from-lime/20 to-warm/10" },
  { id: 6, title: "Breathwork & Beauty", category: "Meditation", difficulty: "Intermediate", duration: "4 weeks", lessons: 12, progress: 0, description: "Advanced breathing techniques that reduce stress, improve circulation, and enhance skin vitality.", gradient: "from-rose/20 to-lime/10" },
  { id: 7, title: "Holistic Sleep Science", category: "Self-Care Rituals", difficulty: "Intermediate", duration: "3 weeks", lessons: 10, progress: 45, description: "Optimize your sleep for skin repair, hormonal balance, and mental clarity.", gradient: "from-muted/20 to-rose/10" },
  { id: 8, title: "Plant-Based Beauty Foods", category: "Nutrition", difficulty: "Beginner", duration: "3 weeks", lessons: 9, progress: 0, description: "Learn to nourish your skin from within with antioxidant-rich whole foods and superfoods.", gradient: "from-warm/20 to-lime/10" },
];

const SAMPLE_LESSONS = [
  "Introduction & Welcome",
  "Understanding the Basics",
  "Deep Dive: Core Concepts",
  "Practical Application",
  "Advanced Techniques",
  "Case Studies",
  "Building Your Routine",
  "Final Assessment & Next Steps",
];

function CoursesContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Demo User";
  const tier = searchParams.get("tier") || "premium";
  const qs = `?name=${encodeURIComponent(name)}&tier=${encodeURIComponent(tier)}`;

  const [category, setCategory] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const filtered = category === "All" ? COURSES : COURSES.filter((c) => c.category === category);
  const detail = COURSES.find((c) => c.id === selectedCourse);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted">
          <Link href={`/dashboard${qs}`} className="hover:text-lime transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-foreground">Courses</span>
        </div>

        {selectedCourse && detail ? (
          /* Course Detail View */
          <div>
            <button onClick={() => setSelectedCourse(null)} className="mb-6 flex items-center gap-2 text-sm text-muted hover:text-lime transition-colors cursor-pointer">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Courses
            </button>

            <div className={`mb-8 rounded-2xl bg-gradient-to-br ${detail.gradient} p-8 md:p-12`}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium">{detail.category}</span>
                <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium">{detail.difficulty}</span>
                <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium">{detail.duration}</span>
              </div>
              <h1 className="mb-3 text-3xl font-bold md:text-4xl">{detail.title}</h1>
              <p className="max-w-2xl text-muted">{detail.description}</p>
            </div>

            {detail.progress > 0 && (
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Your Progress</span>
                  <span className="text-sm text-lime">{detail.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-lime transition-all" style={{ width: `${detail.progress}%` }} />
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="mb-4 text-lg font-bold">Lessons ({detail.lessons})</h2>
              <div className="space-y-3">
                {SAMPLE_LESSONS.slice(0, detail.lessons > 8 ? 8 : detail.lessons).map((lesson, i) => (
                  <div key={lesson} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      detail.progress > 0 && i < Math.ceil((detail.progress / 100) * detail.lessons)
                        ? "bg-lime/20 text-lime"
                        : "bg-white/5 text-muted"
                    }`}>
                      {detail.progress > 0 && i < Math.ceil((detail.progress / 100) * detail.lessons) ? (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className="text-sm">{lesson}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full rounded-full bg-lime py-3 text-sm font-bold text-black hover:bg-lime-dark cursor-pointer">
                {detail.progress > 0 && detail.progress < 100 ? "Continue Course" : detail.progress === 100 ? "Review Course" : "Start Course"}
              </button>
            </div>
          </div>
        ) : (
          /* Course List View */
          <>
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">Courses</h1>
            <p className="mb-8 text-muted">Master skincare science, meditation, nutrition, and self-care rituals.</p>

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

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((course) => (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all hover:border-lime/30 hover:bg-white/[0.04]"
                >
                  <div className={`h-32 bg-gradient-to-br ${course.gradient} flex items-center justify-center`}>
                    <svg className="w-10 h-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-muted">{course.category}</span>
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-muted">{course.difficulty}</span>
                    </div>
                    <h3 className="mb-1 font-bold group-hover:text-lime transition-colors">{course.title}</h3>
                    <p className="mb-3 text-xs text-muted">{course.duration} &middot; {course.lessons} lessons</p>
                    {course.progress > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted">Progress</span>
                          <span className="text-xs text-lime">{course.progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10">
                          <div className="h-1.5 rounded-full bg-lime" style={{ width: `${course.progress}%` }} />
                        </div>
                      </div>
                    )}
                    {course.progress === 0 && (
                      <span className="text-xs font-medium text-lime">New</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CoursesContent />
    </Suspense>
  );
}
