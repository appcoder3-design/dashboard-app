"use client";

import Link from "next/link";
import Portfolio from "../../components/Portfolio";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Portfolio</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Manage your investment holdings and positions.</p>
          </div>
          <Link
            href="/"
            className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-sky-500 hover:bg-sky-500/10 dark:border-slate-700 dark:hover:border-cyan-400 dark:hover:bg-cyan-500/10"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/90">
          <Portfolio />
        </div>
      </div>
    </div>
  );
}
