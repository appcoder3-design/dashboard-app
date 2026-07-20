"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = window.localStorage.getItem("dashboard-theme");
    return savedTheme === "light";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.document.documentElement.classList.toggle("dark-theme", isDarkMode);
    window.document.documentElement.classList.toggle("light-theme", !isDarkMode);
    window.localStorage.setItem("dashboard-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const pageClasses = isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-950";
  const cardClasses = isDarkMode
    ? "border border-slate-800 bg-slate-900/90"
    : "border border-slate-200 bg-white/95";
  const softCardClasses = isDarkMode
    ? "border border-slate-800 bg-slate-900/80"
    : "border border-slate-200 bg-slate-100";

  return (
    <div className={`min-h-screen px-4 py-8 transition-colors duration-300 ${pageClasses}`}>
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        <div className={`rounded-[32px] p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition ${cardClasses}`}>
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm uppercase tracking-[0.35em] text-sky-500/80">About</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">About This Page</h1>
              </div>
              <button
                type="button"
                onClick={() => setIsDarkMode((current) => !current)}
                className="rounded-2xl border px-4 py-2 text-sm font-medium transition hover:border-sky-400 hover:bg-sky-500/10 dark:hover:border-cyan-400 whitespace-nowrap"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
            <div>
              <p className="mt-0 max-w-3xl text-slate-600 dark:text-slate-400 leading-relaxed">
                This website is a test project to learn coding and web design. It has been built using VS Code, Claude and GitHub. It aims to emulate a comprehensive financial dashboard application built with modern web technologies to provide a polished and intuitive interface for tracking stock performance, analyzing key financial metrics, and managing investment portfolios.
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

        <div className={`rounded-[32px] p-6 transition ${cardClasses}`}>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Navigation</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Explore other sections of the dashboard:</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-medium text-center transition hover:border-sky-500 hover:bg-sky-500/10 dark:border-slate-700 dark:hover:border-cyan-400 dark:hover:bg-cyan-500/10"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/portfolio"
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-medium text-center transition hover:border-sky-500 hover:bg-sky-500/10 dark:border-slate-700 dark:hover:border-cyan-400 dark:hover:bg-cyan-500/10"
            >
              Portfolio
            </Link>
            <Link
              href="/watchlist"
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-medium text-center transition hover:border-sky-500 hover:bg-sky-500/10 dark:border-slate-700 dark:hover:border-cyan-400 dark:hover:bg-cyan-500/10"
            >
              Watchlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
