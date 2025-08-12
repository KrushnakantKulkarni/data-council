"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Course = {
  id: string;
  title: string;
  description: string;
  category: "Agentic AI" | "Data Science" | "Machine Learning" | "LLM Ops" | "Analytics" | "MLOps";
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  tags: string[];
};

const allCourses: Course[] = [
  {
    id: "agentic-ai-bootcamp",
    title: "Agentic AI Automation Bootcamp",
    description:
      "Build production-grade AI agents with tool use, memory, planning, and evaluation. Implement real workflows for support, ops, and growth.",
    category: "Agentic AI",
    level: "Intermediate",
    duration: "8 weeks",
    tags: ["Agents", "Workflows", "Toolformer", "Evaluation"],
  },
  {
    id: "llm-engineering-langchain",
    title: "LLM Engineering with LangChain & OpenAI",
    description:
      "Design, orchestrate, and optimize LLM apps: prompts, chains, structured outputs, function calling, and guardrails.",
    category: "LLM Ops",
    level: "Beginner",
    duration: "6 weeks",
    tags: ["LLM", "Prompting", "Guardrails", "Tracing"],
  },
  {
    id: "rag-systems-mastery",
    title: "RAG Systems Mastery",
    description:
      "End‑to‑end retrieval‑augmented generation: data ingestion, chunking, embeddings, ranking, caching, and evaluation.",
    category: "LLM Ops",
    level: "Intermediate",
    duration: "6 weeks",
    tags: ["RAG", "Embeddings", "Vector DB", "Evaluation"],
  },
  {
    id: "mlops-kubernetes",
    title: "MLOps with Kubernetes & CI/CD",
    description:
      "Ship and monitor ML/AI systems with containers, feature stores, model registries, automated evaluation, and observability.",
    category: "MLOps",
    level: "Advanced",
    duration: "10 weeks",
    tags: ["MLOps", "K8s", "CI/CD", "Monitoring"],
  },
  {
    id: "data-science-foundations",
    title: "Data Science Foundations",
    description:
      "Hands‑on statistics, Python, data wrangling, visualization, and experimentation to make data‑driven decisions.",
    category: "Data Science",
    level: "Beginner",
    duration: "3 months",
    tags: ["Python", "Pandas", "Viz", "Statistics"],
  },
  {
    id: "applied-ml",
    title: "Applied Machine Learning",
    description:
      "Supervised and unsupervised learning, model selection, feature engineering, and deployment best practices.",
    category: "Machine Learning",
    level: "Intermediate",
    duration: "3 months",
    tags: ["Sklearn", "Modeling", "XGBoost", "Evaluation"],
  },
  {
    id: "prompt-engineering-eval",
    title: "Prompt Engineering & Evaluation",
    description:
      "System prompts, function calling, safety, structured outputs, and automated eval for reliability at scale.",
    category: "Agentic AI",
    level: "Beginner",
    duration: "4 weeks",
    tags: ["Prompting", "Safety", "JSON", "Eval"],
  },
  {
    id: "ai-agents-tools",
    title: "AI Agents with Tools & Workflows",
    description:
      "Plan‑act‑reflect loops, multi‑agent collaboration, tool use, memory, and long‑running task orchestration.",
    category: "Agentic AI",
    level: "Advanced",
    duration: "8 weeks",
    tags: ["Agents", "Planning", "Memory", "Tools"],
  },
  {
    id: "analytics-python",
    title: "Data Analytics with Python",
    description:
      "From raw data to insight: cleaning, feature extraction, dashboards, and storytelling with modern Python tooling.",
    category: "Analytics",
    level: "Beginner",
    duration: "8 weeks",
    tags: ["Pandas", "Dashboards", "SQL", "EDA"],
  },
  {
    id: "deep-learning-pytorch",
    title: "Deep Learning with PyTorch",
    description:
      "Neural networks, CNNs, RNNs, transformers, training tricks, and deployment for modern DL systems.",
    category: "Machine Learning",
    level: "Advanced",
    duration: "10 weeks",
    tags: ["PyTorch", "DL", "Transformers", "Deployment"],
  },
  {
    id: "genai-for-business",
    title: "GenAI for Business Leaders",
    description:
      "Strategy, ROI, risk, and governance of AI initiatives. Build an adoption playbook across teams and functions.",
    category: "Analytics",
    level: "Beginner",
    duration: "3 weeks",
    tags: ["Strategy", "ROI", "Governance", "Use Cases"],
  },
];

const categories = [
  "Agentic AI",
  "Data Science",
  "Machine Learning",
  "LLM Ops",
  "Analytics",
  "MLOps",
] as const;

const levels = ["Beginner", "Intermediate", "Advanced"] as const;

// Note: Metadata export is server-only in Next.js app router.
// This page is a client component due to stateful filtering UI.

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"featured" | "durationAsc" | "durationDesc">(
    "featured",
  );

  const filtered = useMemo(() => {
    const normalize = (s: string) => s.toLowerCase();

    const matchesSearch = (course: Course) => {
      if (!search) return true;
      const q = normalize(search);
      return (
        normalize(course.title).includes(q) ||
        normalize(course.description).includes(q) ||
        course.tags.some((t) => normalize(t).includes(q))
      );
    };

    const matchesCategory = (course: Course) =>
      selectedCategories.length === 0 || selectedCategories.includes(course.category);

    const matchesLevel = (course: Course) =>
      selectedLevels.length === 0 || selectedLevels.includes(course.level);

    const parsedDurationWeeks = (d: string) => {
      // Very simple parser for labels like "8 weeks", "3 months", "10 weeks"
      const lower = d.toLowerCase().trim();
      if (lower.includes("month")) {
        const num = parseInt(lower, 10);
        return isNaN(num) ? 12 : num * 4;
      }
      const num = parseInt(lower, 10);
      return isNaN(num) ? 8 : num;
    };

    let results = allCourses.filter(
      (c) => matchesSearch(c) && matchesCategory(c) && matchesLevel(c),
    );

    if (sortBy === "durationAsc") {
      results = [...results].sort(
        (a, b) => parsedDurationWeeks(a.duration) - parsedDurationWeeks(b.duration),
      );
    } else if (sortBy === "durationDesc") {
      results = [...results].sort(
        (a, b) => parsedDurationWeeks(b.duration) - parsedDurationWeeks(a.duration),
      );
    }

    return results;
  }, [search, selectedCategories, selectedLevels, sortBy]);

  const toggleFrom = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-[#0b0b12] dark:via-[#0a0a0a] dark:to-[#0a1515]">
      {/* Hero */}
      <section className="px-6 sm:px-10 md:px-14 lg:px-20 pt-16 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-emerald-500/10" />
            <div className="relative px-6 py-10 sm:px-10 sm:py-14 md:py-16">
              <div className="flex flex-col gap-4 md:gap-6">
                <span className="inline-flex items-center gap-2 self-start rounded-full border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/10 px-3 py-1 text-xs font-medium">
                  <span>🎓</span> Agentic AI Automation · Data Science
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                  Learn to build real‑world AI agents and data products
                </h1>
                <p className="max-w-3xl text-sm sm:text-base text-black/70 dark:text-white/70">
                  Project‑based courses covering agents, LLM ops, RAG, analytics, and MLOps. Designed to take you from fundamentals to production.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href="#catalog"
                    className="inline-flex items-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium shadow-sm hover:opacity-90 transition"
                  >
                    Browse catalog
                  </Link>
                  <a
                    href="#filters"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/20 bg-white/70 dark:bg-transparent px-4 py-2 text-sm font-medium hover:bg-white transition"
                  >
                    Filter courses
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section id="filters" className="px-6 sm:px-10 md:px-14 lg:px-20 pb-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-4 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="relative flex-1">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, topic, or tag..."
                  className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400/50"
                />
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 text-sm">
                  ⌘K
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs sm:text-sm text-black/60 dark:text-white/60">Sort</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-lg border border-black/10 dark:border-white/15 bg-white/80 dark:bg-transparent px-3 py-2 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="durationAsc">Duration: Shortest</option>
                  <option value="durationDesc">Duration: Longest</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {/* Category chips */}
              <div>
                <div className="mb-2 text-xs font-medium text-black/60 dark:text-white/60">Categories</div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => {
                    const active = selectedCategories.includes(c);
                    return (
                      <button
                        key={c}
                        onClick={() => setSelectedCategories((prev) => toggleFrom(prev, c))}
                        className={
                          "rounded-full px-3 py-1.5 text-xs font-medium border transition " +
                          (active
                            ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                            : "bg-white/80 dark:bg-transparent border-black/10 dark:border-white/15 hover:bg-white")
                        }
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Level chips */}
              <div>
                <div className="mb-2 text-xs font-medium text-black/60 dark:text-white/60">Levels</div>
                <div className="flex flex-wrap gap-2">
                  {levels.map((lv) => {
                    const active = selectedLevels.includes(lv);
                    return (
                      <button
                        key={lv}
                        onClick={() => setSelectedLevels((prev) => toggleFrom(prev, lv))}
                        className={
                          "rounded-full px-3 py-1.5 text-xs font-medium border transition " +
                          (active
                            ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                            : "bg-white/80 dark:bg-transparent border-black/10 dark:border-white/15 hover:bg-white")
                        }
                      >
                        {lv}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {(selectedCategories.length > 0 || selectedLevels.length > 0 || search) && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-black/60 dark:text-white/60">Active filters:</span>
                {[...selectedCategories, ...selectedLevels]
                  .filter(Boolean)
                  .map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setSelectedCategories((prev) => prev.filter((v) => v !== f));
                        setSelectedLevels((prev) => prev.filter((v) => v !== f));
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-transparent px-3 py-1.5"
                    >
                      {f} <span className="opacity-60">✕</span>
                    </button>
                  ))}
                {(search?.length ?? 0) > 0 && (
                  <button
                    onClick={() => setSearch("")}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-transparent px-3 py-1.5"
                  >
                    search: “{search}” <span className="opacity-60">✕</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategories([]);
                    setSelectedLevels([]);
                    setSortBy("featured");
                  }}
                  className="ml-auto rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-transparent px-3 py-1.5"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="px-6 sm:px-10 md:px-14 lg:px-20 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold">Courses ({filtered.length})</h2>
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-8 text-center text-sm">
              No courses match your filters. Try adjusting the search or filters.
            </div>
          ) : (
            <ul className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((course) => (
                <li key={course.id}>
                  <article className="group h-full rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-5 sm:p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-white/70 dark:bg-transparent px-3 py-1 text-[11px] font-medium">
                        {course.category}
                      </span>
                      <span className="text-[11px] text-black/60 dark:text-white/60">{course.level}</span>
                    </div>
                    <h3 className="mt-3 text-base sm:text-lg font-semibold leading-tight">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm text-black/70 dark:text-white/70 line-clamp-3">
                      {course.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {course.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-black/10 dark:border-white/15 bg-white/70 dark:bg-transparent px-2.5 py-1 text-[11px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-black/70 dark:text-white/70">⏱ {course.duration}</span>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/#enroll-${course.id}`}
                          className="rounded-lg bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 text-xs font-medium hover:opacity-90"
                        >
                          Enroll
                        </Link>
                        <Link
                          href={`/#course-${course.id}`}
                          className="rounded-lg border border-black/10 dark:border-white/15 px-3 py-1.5 text-xs font-medium hover:bg-white/70"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}


