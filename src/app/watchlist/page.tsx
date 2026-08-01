"use client";

import Link from "next/link";
import Watchlist from "../../components/Watchlist";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/watchlist", label: "Watchlist" },
  { href: "/about", label: "About" },
] as const;

export default function WatchlistPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 rounded-[32px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">Watchlist</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Track and monitor stocks of interest.</p>
            </div>
            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:border-sky-500 hover:bg-sky-500/10 dark:border-slate-700 dark:hover:border-cyan-400 dark:hover:bg-cyan-500/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/90">
          <Watchlist />
        </div>
      </div>
    </div>
  );
}
