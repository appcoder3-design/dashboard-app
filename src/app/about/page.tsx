"use client";

import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/watchlist", label: "Watchlist" },
] as const;

export default function About() {
  const pageClasses = "bg-slate-50 text-slate-950";
  const cardClasses = "border border-slate-200 bg-white/95";
  const softCardClasses = "border border-slate-200 bg-slate-100";

  return (
    <div className={`min-h-screen px-4 py-8 transition-colors duration-300 ${pageClasses}`}>
      <div className="mx-auto max-w-5xl flex flex-col gap-8">
        <div className={`rounded-[32px] p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition ${cardClasses}`}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <p className="text-sm uppercase tracking-[0.35em] text-sky-500/80">About</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">About This Page</h1>
              </div>
              <div className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-sky-500 hover:bg-sky-500/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mt-0 max-w-3xl text-slate-600 dark:text-slate-400 leading-relaxed">
                This website is a private page dedicated to tracking personal investment performance via a polished and intuitive interface for tracking personal stock performance.
                             </p>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                I also write about my latest trading results on {" "}
                <a
                  href="https://steadywin.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 dark:text-cyan-400 font-semibold hover:underline"
                >
                  Substack
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-[32px] p-6 transition ${cardClasses}`}>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Project Details</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className={`rounded-[28px] p-6 transition ${softCardClasses}`}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Features</h3>
              <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-sky-500 dark:text-cyan-400 mt-1">✓</span>
                  <span>Real-time stock market data and price tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-500 dark:text-cyan-400 mt-1">✓</span>
                  <span>Advanced financial metrics analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-500 dark:text-cyan-400 mt-1">✓</span>
                  <span>Interactive candlestick and line charts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-500 dark:text-cyan-400 mt-1">✓</span>
                  <span>Compound interest demonstrator with custom inputs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-500 dark:text-cyan-400 mt-1">✓</span>
                  <span>Portfolio and watchlist management</span>
                </li>
              </ul>
            </div>

            <div className={`rounded-[28px] p-6 transition ${softCardClasses}`}>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Technology Stack</h3>
              <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 dark:text-emerald-400 mt-1">◆</span>
                  <span><strong>Framework:</strong> Next.js 16 with React 19</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 dark:text-emerald-400 mt-1">◆</span>
                  <span><strong>Styling:</strong> Tailwind CSS with dark mode support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 dark:text-emerald-400 mt-1">◆</span>
                  <span><strong>Charts:</strong> Recharts for data visualization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 dark:text-emerald-400 mt-1">◆</span>
                  <span><strong>Language:</strong> TypeScript for type safety</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 dark:text-emerald-400 mt-1">◆</span>
                  <span><strong>Build Tool:</strong> Turbopack for fast builds</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
