"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRealTimeData } from "../../hooks/useRealTimeData";
import { generatePeriodCandles, hashSymbol } from "../../data/stocks";
import PriceChart from "../../components/PriceChart";
import MetricsChart from "../../components/MetricsChart";
import CandlestickChart from "../../components/CandlestickChart";

const supportedSymbols = ["AAPL", "MSFT", "NVDA", "QQQ"];

const periods = [
  { id: "1D", label: "1D", points: 4 },
  { id: "1W", label: "1W", points: 7 },
  { id: "1M", label: "1M", points: 10 },
] as const;

type PeriodId = (typeof periods)[number]["id"];

const numberFormat = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/watchlist", label: "Watchlist" },
  { href: "/about", label: "About" },
] as const;

export default function Dashboard() {
  const [symbolInput, setSymbolInput] = useState("AAPL");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = window.localStorage.getItem("dashboard-theme");
    return savedTheme === "dark";
  });
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodId>("1W");

  const normalizedSymbol = symbolInput.trim().toUpperCase() || "AAPL";
  const data = useRealTimeData(normalizedSymbol);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.document.documentElement.classList.toggle("dark-theme", isDarkMode);
    window.document.documentElement.classList.toggle("light-theme", !isDarkMode);
    window.localStorage.setItem("dashboard-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const pointsCount = periods.find((period) => period.id === selectedPeriod)?.points ?? 7;
  const seed = hashSymbol(normalizedSymbol);
  const periodCandles = useMemo(
    () => generatePeriodCandles(data.candles, selectedPeriod, seed),
    [data.candles, selectedPeriod, seed]
  );
  const visibleCandles = useMemo(() => periodCandles.slice(-pointsCount), [periodCandles, pointsCount]);

  const displayData = {
    ...data,
    candles: visibleCandles,
  };

  const pageClasses = isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-slate-950";
  const cardClasses = isDarkMode
    ? "border border-slate-800 bg-slate-900/90"
    : "border border-slate-200 bg-white/95";
  const softCardClasses = isDarkMode
    ? "border border-slate-800 bg-slate-900/80"
    : "border border-slate-200 bg-slate-100";

  return (
    <div className={`min-h-screen px-4 py-8 transition-colors duration-300 ${pageClasses}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className={`rounded-[32px] p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition ${cardClasses}`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/images/logo.png"
                alt="KALKI Business Logo"
                className="h-14 w-14 rounded-lg object-contain border-2 border-sky-500/50 dark:border-cyan-400/50"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-sky-500 dark:text-cyan-300">Kalki Business</p>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Market Dashboard</h1>
              </div>
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
              <button
                type="button"
                onClick={() => setIsDarkMode((current) => !current)}
                className="rounded-2xl border px-4 py-2 text-sm font-medium transition hover:border-sky-400 hover:bg-sky-500/10 dark:hover:border-cyan-400"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </nav>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className={`rounded-[28px] p-6 transition ${cardClasses}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">{normalizedSymbol} overview</p>
                  <p className="mt-2 text-5xl font-semibold text-sky-700 dark:text-cyan-300">${numberFormat.format(displayData.marketValue)}</p>
                </div>
                <span className={`rounded-3xl px-4 py-2 text-sm font-semibold ${displayData.marketChange.startsWith("+") ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>
                  {displayData.marketChange}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className={`rounded-3xl p-4 transition ${softCardClasses}`}>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Open</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">${numberFormat.format(displayData.open)}</p>
                </div>
                <div className={`rounded-3xl p-4 transition ${softCardClasses}`}>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">High</p>
                  <p className="mt-2 text-xl font-semibold text-sky-700 dark:text-cyan-300">${numberFormat.format(displayData.high)}</p>
                </div>
                <div className={`rounded-3xl p-4 transition ${softCardClasses}`}>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Low</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">${numberFormat.format(displayData.low)}</p>
                </div>
                <div className={`rounded-3xl p-4 transition ${softCardClasses}`}>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Volume</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{displayData.volume}</p>
                </div>
              </div>
            </div>

            <div className={`rounded-[28px] p-6 transition ${cardClasses}`}>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Trading pulse</p>
              <div className={`mt-6 rounded-[28px] p-4 transition ${softCardClasses}`}>
                <CandlestickChart candles={displayData.candles} isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
          <section className={`rounded-[32px] p-6 transition ${cardClasses}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Market details</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Analyze price action, earnings, and the latest market trends.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {periods.map((period) => {
                  const isActive = selectedPeriod === period.id;
                  return (
                    <button
                      key={period.id}
                      type="button"
                      onClick={() => setSelectedPeriod(period.id)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:text-cyan-200"
                          : "border-slate-300 bg-slate-100 text-slate-700 hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-white"
                      }`}
                    >
                      {period.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`mt-6 rounded-[28px] p-4 transition ${softCardClasses}`}>
              <PriceChart data={displayData.candles} isDarkMode={isDarkMode} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <article className={`rounded-3xl p-4 transition ${softCardClasses}`}>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Estimated EPS</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{numberFormat.format(displayData.earnings.epsActual)} vs {numberFormat.format(displayData.earnings.epsEstimate)}</p>
              </article>
              <article className={`rounded-3xl p-4 transition ${softCardClasses}`}>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Revenue</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">${numberFormat.format(displayData.earnings.revenueActualB)}B</p>
              </article>
            </div>
          </section>

          <aside className="space-y-6">
            <section className={`rounded-[32px] p-6 transition ${cardClasses}`}>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Earnings summary</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className={`rounded-3xl p-4 transition ${softCardClasses}`}>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Quarter</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{displayData.earnings.quarter}</p>
                </div>
                <div className={`rounded-3xl p-4 transition ${softCardClasses}`}>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Guidance</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{displayData.earnings.guidance}</p>
                </div>
              </div>
            </section>

            <section className={`rounded-[32px] p-6 transition ${cardClasses}`}>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Portfolio pulse</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Manage positions and watchlist items with quick access tabs.</p>
              <div className={`mt-6 rounded-[28px] p-4 transition ${softCardClasses}`}>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Market label</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{displayData.marketLabel}</p>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-3xl p-4 transition border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/80">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Market change</span>
                    <span className={`text-sm font-semibold ${displayData.marketChange.startsWith("+") ? "text-emerald-500" : "text-rose-500"}`}>{displayData.marketChange}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl p-4 transition border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/80">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Volume</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{displayData.volume}</span>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>

        <section className={`rounded-[32px] p-6 transition ${cardClasses}`}>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Financial metrics</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Fundamental analytics for the selected stock and timeframe.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricsChart metrics={displayData.metrics} type="pe" isDarkMode={isDarkMode} />
            <MetricsChart metrics={displayData.metrics} type="roe" isDarkMode={isDarkMode} />
            <MetricsChart metrics={displayData.metrics} type="debtToEquity" isDarkMode={isDarkMode} />
            <MetricsChart metrics={displayData.metrics} type="revenue" isDarkMode={isDarkMode} />
            <MetricsChart metrics={displayData.metrics} type="eps" isDarkMode={isDarkMode} />
          </div>
        </section>
      </div>
    </div>
  );
}
