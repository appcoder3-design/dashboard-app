"use client";

import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/watchlist", label: "Watchlist" },
] as const;

export default function Home() {
  const pageClasses = "bg-slate-50 text-slate-950";
  const cardClasses = "border border-slate-200 bg-white/95";
  const softCardClasses = "border border-slate-200 bg-slate-100";

  return (
    <div className={`min-h-screen px-4 py-8 transition-colors duration-300 ${pageClasses}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className={`rounded-[32px] p-4 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition ${cardClasses}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <img
                src="/images/logo.png"
                alt="KALKI Business Logo"
                className="h-20 w-20 rounded-xl object-contain border-2 border-sky-500/50 dark:border-cyan-400/50"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.55em] text-sky-500 dark:text-cyan-300">Kalki Business</p>
                <h1 className="text-[1.35rem] font-semibold tracking-tight text-slate-900 dark:text-slate-100">Private Investment Company</h1>
              </div>
            </div>

            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                    item.href === "/"
                      ? "border-sky-500 bg-sky-500/10 text-sky-700"
                      : "border-slate-300 hover:border-sky-500 hover:bg-sky-500/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <section className={`overflow-hidden rounded-[32px] p-8 transition ${cardClasses}`}>
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100">
              <div
                className="h-[420px] w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://photostorage.explorest.com/asia/Singapore/yik-keat-lee-marina-east-view-of_marina-bay-sands-singapore-flyer-and-singapore-skyline-compressed.jpg')",
                  backgroundPosition: "center center",
                }}
              />
            </div>

            <div className="rounded-[28px] bg-slate-50 p-6">
              <h2 className="text-[1.65rem] font-medium leading-tight tracking-tight text-slate-900">
                Kalki Business was created in Singapore as a private limited firm to trade on global stock exchanges and generate investment income.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
                This landing page presents the company profile and gives visitors a clear path into the market dashboard, portfolio tools, and watchlist pages.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  Open Dashboard
                </Link>
                <Link
                  href="/portfolio"
                  className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold transition hover:border-sky-500 hover:bg-sky-500/10"
                >
                  View Portfolio
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Singapore</span>
                <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Global Markets</span>
                <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Investment Income</span>
              </div>
            </div>
          </div>
        </section>

        <section className={`rounded-[32px] p-6 transition ${cardClasses}`}>
          <div className="grid gap-6 md:grid-cols-3">
            <div className={`rounded-[28px] p-5 transition ${softCardClasses}`}>
              <div className="mb-4 inline-flex rounded-2xl bg-sky-500/10 px-3 py-2 text-sky-700 dark:bg-cyan-500/10 dark:text-cyan-200">📊</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Dashboard</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">See live market information, symbol performance, and charts in a dedicated analytics page.</p>
            </div>
            <div className={`rounded-[28px] p-5 transition ${softCardClasses}`}>
              <div className="mb-4 inline-flex rounded-2xl bg-sky-500/10 px-3 py-2 text-sky-700 dark:bg-cyan-500/10 dark:text-cyan-200">💼</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Portfolio</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Manage own private investment holdings across our portfolio.</p>
            </div>
            <div className={`rounded-[28px] p-5 transition ${softCardClasses}`}>
              <div className="mb-4 inline-flex rounded-2xl bg-sky-500/10 px-3 py-2 text-sky-700 dark:bg-cyan-500/10 dark:text-cyan-200">⭐</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Watchlist</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Follow symbols of interest and keep a focused shortlist for review.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
