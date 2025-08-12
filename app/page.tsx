
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Course = {
  id: string;
  title: string;
  description: string;
  category: "Agentic AI" | "Data Science" | "Machine Learning" | "LLM Ops" | "Analytics" | "MLOps";
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  tags: string[];
  price: string;
  students: number;
  rating: number;
};

const allCourses: Course[] = [
  {
    id: "agentic-ai-bootcamp",
    title: "Agentic AI Automation Bootcamp",
    description:
      "Start your AI career! Learn to build AI agents from scratch with hands-on projects. Perfect for beginners with basic Python knowledge.",
    category: "Agentic AI",
    level: "Beginner",
    duration: "8 weeks",
    tags: ["Agents", "Python", "Projects", "Portfolio"],
    price: "₹24,999",
    students: 1247,
    rating: 4.8,
  },
  {
    id: "llm-engineering-langchain",
    title: "LLM Engineering with LangChain & OpenAI",
    description:
      "Master the hottest skill in tech! Build real LLM applications and get hired. No prior AI experience required.",
    category: "LLM Ops",
    level: "Beginner",
    duration: "6 weeks",
    tags: ["LLM", "OpenAI", "Projects", "Hiring"],
    price: "₹19,999",
    students: 2156,
    rating: 4.9,
  },
  {
    id: "rag-systems-mastery",
    title: "RAG Systems Mastery",
    description:
      "Build AI chatbots that actually work! Learn RAG from scratch and create impressive portfolio projects that get you hired.",
    category: "LLM Ops",
    level: "Beginner",
    duration: "6 weeks",
    tags: ["RAG", "Chatbots", "Portfolio", "Jobs"],
    price: "₹19,999",
    students: 1893,
    rating: 4.7,
  },
  {
    id: "mlops-kubernetes",
    title: "MLOps with Kubernetes & CI/CD",
    description:
      "Level up your career! Master MLOps and become the go-to person for deploying AI models. Great for experienced developers.",
    category: "MLOps",
    level: "Advanced",
    duration: "10 weeks",
    tags: ["MLOps", "K8s", "Deployment", "Senior"],
    price: "₹34,999",
    students: 892,
    rating: 4.9,
  },
  {
    id: "data-science-foundations",
    title: "Data Science Foundations",
    description:
      "Your first step into data science! Learn Python, statistics, and visualization. Build a portfolio that opens doors to data jobs.",
    category: "Data Science",
    level: "Beginner",
    duration: "3 months",
    tags: ["Python", "Statistics", "Portfolio", "Entry"],
    price: "₹29,999",
    students: 3421,
    rating: 4.8,
  },
  {
    id: "applied-ml",
    title: "Applied Machine Learning",
    description:
      "Go from theory to practice! Build real ML models and deploy them. Perfect for data scientists ready to level up.",
    category: "Machine Learning",
    level: "Intermediate",
    duration: "3 months",
    tags: ["ML", "Deployment", "Real-world", "Growth"],
    price: "₹29,999",
    students: 1876,
    rating: 4.7,
  },
  {
    id: "prompt-engineering-eval",
    title: "Prompt Engineering & Evaluation",
    description:
      "Master the art of AI communication! Learn to write prompts that work and evaluate AI systems. Essential for AI careers.",
    category: "Agentic AI",
    level: "Beginner",
    duration: "4 weeks",
    tags: ["Prompts", "AI", "Communication", "Skills"],
    price: "₹14,999",
    students: 3124,
    rating: 4.6,
  },
  {
    id: "ai-agents-tools",
    title: "AI Agents with Tools & Workflows",
    description:
      "Build the future of AI! Create intelligent agents that can use tools and work autonomously. For experienced developers.",
    category: "Agentic AI",
    level: "Advanced",
    duration: "8 weeks",
    tags: ["Agents", "Autonomy", "Tools", "Innovation"],
    price: "₹24,999",
    students: 756,
    rating: 4.9,
  },
  {
    id: "analytics-python",
    title: "Data Analytics with Python",
    description:
      "Turn data into insights! Learn Python analytics and create dashboards that tell stories. Great for business analysts.",
    category: "Analytics",
    level: "Beginner",
    duration: "8 weeks",
    tags: ["Analytics", "Dashboards", "Business", "Insights"],
    price: "₹19,999",
    students: 2654,
    rating: 4.7,
  },
  {
    id: "deep-learning-pytorch",
    title: "Deep Learning with PyTorch",
    description:
      "Dive into neural networks! Build cutting-edge AI models with PyTorch. For ML engineers and researchers.",
    category: "Machine Learning",
    level: "Advanced",
    duration: "10 weeks",
    tags: ["Deep Learning", "PyTorch", "Research", "Advanced"],
    price: "₹34,999",
    students: 634,
    rating: 4.8,
  },
  {
    id: "genai-for-business",
    title: "GenAI for Business Leaders",
    description:
      "Lead AI transformation! Understand AI strategy and implementation. Perfect for managers and business professionals.",
    category: "Analytics",
    level: "Beginner",
    duration: "3 weeks",
    tags: ["Strategy", "Leadership", "Business", "AI"],
    price: "₹14,999",
    students: 1892,
    rating: 4.5,
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

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Data Analyst at TCS",
    image: "👩‍💼",
    quote: "Data Council helped me switch from marketing to data science. I got hired within 3 months of completing the course!",
    rating: 5,
  },
  {
    name: "Rahul Patel",
    role: "AI Engineer at Infosys",
    image: "👨‍💻",
    quote: "The hands-on projects were amazing. I built a real AI agent that impressed my interviewers and got me the job.",
    rating: 5,
  },
  {
    name: "Anjali Desai",
    role: "ML Engineer at Wipro",
    image: "👩‍🔬",
    quote: "From zero coding experience to ML engineer in 6 months. The instructors are incredibly supportive and patient.",
    rating: 5,
  },
];

const stats = [
  { number: "15,000+", label: "Students Trained" },
  { number: "89%", label: "Job Placement Rate" },
  { number: "₹8.5L", label: "Average Salary Hike" },
  { number: "4.8/5", label: "Student Rating" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"featured" | "durationAsc" | "durationDesc" | "priceAsc" | "priceDesc">(
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
      const lower = d.toLowerCase().trim();
      if (lower.includes("month")) {
        const num = parseInt(lower, 10);
        return isNaN(num) ? 12 : num * 4;
      }
      const num = parseInt(lower, 10);
      return isNaN(num) ? 8 : num;
    };

    const parsedPrice = (p: string) => parseInt(p.replace(/[₹,]/g, ""), 10);

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
    } else if (sortBy === "priceAsc") {
      results = [...results].sort((a, b) => parsedPrice(a.price) - parsedPrice(b.price));
    } else if (sortBy === "priceDesc") {
      results = [...results].sort((a, b) => parsedPrice(b.price) - parsedPrice(a.price));
    }

    return results;
  }, [search, selectedCategories, selectedLevels, sortBy]);

  const toggleFrom = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="px-6 sm:px-10 md:px-14 lg:px-20 pt-16 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-white/90 backdrop-blur-md shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-50 to-cyan-100" />
            <div className="relative px-6 py-10 sm:px-10 sm:py-14 md:py-16">
              <div className="flex flex-col gap-4 md:gap-6">
                <span className="inline-flex items-center gap-2 self-start rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  <span>🎓</span> #1 AI & Data Science Institute
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
                  Launch Your Tech Career in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-600">AI & Data Science</span>
                </h1>
                <p className="max-w-3xl text-sm sm:text-base text-gray-700">
                  Join 15,000+ students who transformed their careers. Learn from industry experts, build real projects, 
                  and get hired with our proven job placement program. <strong>No prior experience required!</strong>
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="#courses"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-teal-600 text-white px-6 py-3 text-sm font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    🚀 Start Learning Free
                  </a>
                  <a
                    href="#success-stories"
                    className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-medium hover:bg-blue-50 transition text-gray-700"
                  >
                    📊 See Success Stories
                  </a>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>89% Job Placement Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>15,000+ Students Trained</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>4.8/5 Student Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 sm:px-10 md:px-14 lg:px-20 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl border border-blue-200 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="px-6 sm:px-10 md:px-14 lg:px-20 py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
              Real Students, Real Success Stories
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See how our students transformed their careers and landed dream jobs in AI & Data Science
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-2xl border border-blue-200 bg-white/90 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-800 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="px-6 sm:px-10 md:px-14 lg:px-20 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
              Why Students Choose Data Council?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We're not just another online course platform. We're your career transformation partner.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl border border-blue-200 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Career-First Approach</h3>
              <p className="text-gray-700">
                Every course is designed with job market needs in mind. Build skills that actually get you hired.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl border border-blue-200 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">👨‍💻</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Industry Mentors</h3>
              <p className="text-gray-700">
                Learn from professionals working at Google, Microsoft, Amazon, and top Indian tech companies.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl border border-blue-200 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Job Placement Support</h3>
              <p className="text-gray-700">
                Get resume reviews, mock interviews, and direct connections to hiring managers at top companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-6 sm:px-10 md:px-14 lg:px-20 pb-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-blue-200 bg-white/90 backdrop-blur-md shadow-sm p-4 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="relative flex-1">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses by title, topic, or skill..."
                  className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400/50 text-gray-900"
                />
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  🔍
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs sm:text-sm text-gray-600">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-gray-900"
                >
                  <option value="featured">Featured</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="durationAsc">Duration: Shortest</option>
                  <option value="durationDesc">Duration: Longest</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {/* Category chips */}
              <div>
                <div className="mb-2 text-xs font-medium text-gray-600">Course Categories</div>
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
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white border-blue-200 hover:bg-blue-50 text-gray-700")
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
                <div className="mb-2 text-xs font-medium text-gray-600">Experience Level</div>
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
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white border-blue-200 hover:bg-blue-50 text-gray-700")
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
                <span className="text-gray-600">Active filters:</span>
                {[...selectedCategories, ...selectedLevels]
                  .filter(Boolean)
                  .map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setSelectedCategories((prev) => prev.filter((v) => v !== f));
                        setSelectedLevels((prev) => prev.filter((v) => v !== f));
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-gray-700 hover:bg-blue-50"
                    >
                      {f} <span className="opacity-60">✕</span>
                    </button>
                  ))}
                {(search?.length ?? 0) > 0 && (
                  <button
                    onClick={() => setSearch("")}
                    className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-gray-700 hover:bg-blue-50"
                  >
                    search: "{search}" <span className="opacity-60">✕</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategories([]);
                    setSelectedLevels([]);
                    setSortBy("featured");
                  }}
                  className="ml-auto rounded-full border border-blue-200 bg-white px-3 py-1.5 text-gray-700 hover:bg-blue-50"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Courses Catalog */}
      <section id="courses" className="px-6 sm:px-10 md:px-14 lg:px-20 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-900">Choose Your Career Path</h2>
              <p className="text-gray-700">Found {filtered.length} courses matching your criteria</p>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-blue-200 bg-white/90 backdrop-blur-md shadow-sm p-8 text-center text-sm">
              <div className="text-4xl mb-4">🔍</div>
              <p className="mb-2 text-gray-900">No courses match your filters.</p>
              <p className="text-gray-600">Try adjusting the search or filters to find your perfect course.</p>
            </div>
          ) : (
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course) => (
                <li key={course.id}>
                  <article className="group h-full rounded-2xl border border-blue-200 bg-white/90 backdrop-blur-md p-6 transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                        {course.category}
                      </span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        {course.level}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold leading-tight mb-3 group-hover:text-indigo-600 transition-colors text-gray-900">
                      {course.title}
                    </h3>
                    
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] text-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-4 text-gray-600">
                        <span>⏱ {course.duration}</span>
                        <span>👥 {course.students.toLocaleString()}</span>
                        <span>⭐ {course.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-indigo-600">
                        {course.price}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg bg-gradient-to-r from-indigo-600 to-teal-600 text-white px-4 py-2 text-sm font-medium hover:shadow-lg transition-all hover:-translate-y-0.5">
                          Enroll Now
                        </button>
                        <button className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium hover:bg-blue-50 transition text-gray-700">
                          Preview
                        </button>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 sm:px-10 md:px-14 lg:px-20 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-indigo-600 to-teal-600 text-white p-8 sm:p-12 text-center shadow-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already taken the first step towards their dream tech career. 
              Start learning today with our risk-free trial!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="rounded-full bg-white text-indigo-600 px-8 py-3 font-medium hover:shadow-lg transition-all hover:-translate-y-0.5">
                🚀 Start Free Trial
              </button>
              <button className="rounded-full border border-white/30 text-white px-8 py-3 font-medium hover:bg-white/10 transition">
                📞 Talk to Counselor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-10 md:px-14 lg:px-20 py-12 border-t border-blue-200 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Data Council</h3>
              <p className="text-sm text-gray-700">
                Empowering students with cutting-edge AI automation and data science education. 
                Your journey to a successful tech career starts here.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-gray-900">Student Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#courses" className="text-gray-700 hover:text-indigo-600">All Courses</a></li>
                <li><a href="#success-stories" className="text-gray-700 hover:text-indigo-600">Success Stories</a></li>
                <li><a href="#" className="text-gray-700 hover:text-indigo-600">Career Support</a></li>
                <li><a href="#" className="text-gray-700 hover:text-indigo-600">Student Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-gray-900">Popular Courses</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-700 hover:text-indigo-600">Data Science Foundations</a></li>
                <li><a href="#" className="text-gray-700 hover:text-indigo-600">AI Automation Bootcamp</a></li>
                <li><a href="#" className="text-gray-700 hover:text-indigo-600">LLM Engineering</a></li>
                <li><a href="#" className="text-gray-700 hover:text-indigo-600">Machine Learning</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-gray-900">Get in Touch</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>📧 hr@datacouncil.in</p>
                <p>📞 +91 8080152238</p>
                <p>📍 Pune, Maharashtra</p>
                <p>⏰ Mon-Fri: 9AM-6PM</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-blue-200 text-center text-sm text-gray-600">
            <p>&copy; 2024 Data Council. All rights reserved. | Empowering students to build successful tech careers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
