"use client";

import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useRealTimeData } from "../hooks/useRealTimeData";
import PriceChart from "../components/PriceChart";
import MetricsChart from "../components/MetricsChart";
import CandlestickChart from "../components/CandlestickChart";
import Portfolio from "../components/Portfolio";
import Watchlist from "../components/Watchlist";

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

export default function Home() {
  const [symbolInput, setSymbolInput] = useState("AAPL");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodId>("1W");
  const [activeTab, setActiveTab] = useState(0);

  const normalizedSymbol = symbolInput.trim().toUpperCase() || "AAPL";
  const data = useRealTimeData(normalizedSymbol);
  const pointsCount = periods.find((period) => period.id === selectedPeriod)?.points ?? 7;
  const visibleCandles = data.candles.slice(-pointsCount);

  const displayData = {
    ...data,
    candles: visibleCandles,
  };

  return (
    <div className={`min-h-screen px-4 py-8 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-950"}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">Market dashboard</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">NewFinanceGuide</h1>
              <p className="mt-2 max-w-2xl text-slate-400">Track the latest stock performance, compare key metrics, and explore portfolio health in one polished view.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
                <span>Symbol</span>
                <input
                  type="text"
                  value={symbolInput}
                  onChange={(event) => setSymbolInput(event.target.value.toUpperCase())}
                  placeholder="AAPL"
                  aria-label="Type stock symbol"
                  className="w-24 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsDarkMode((current) => !current)}
                className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-emerald-400 hover:bg-slate-800"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{normalizedSymbol} overview</p>
                  <p className="mt-2 text-5xl font-semibold text-emerald-300">${numberFormat.format(displayData.marketValue)}</p>
                </div>
                <span className={`rounded-3xl px-4 py-2 text-sm font-semibold ${displayData.marketChange.startsWith("+") ? "bg-emerald-500/10 text-emerald-200" : "bg-rose-500/10 text-rose-200"}`}>
                  {displayData.marketChange}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Open</p>
                  <p className="mt-2 text-xl font-semibold">${numberFormat.format(displayData.open)}</p>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">High</p>
                  <p className="mt-2 text-xl font-semibold text-emerald-300">${numberFormat.format(displayData.high)}</p>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Low</p>
                  <p className="mt-2 text-xl font-semibold text-rose-300">${numberFormat.format(displayData.low)}</p>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Volume</p>
                  <p className="mt-2 text-xl font-semibold">{displayData.volume}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/10">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Trading pulse</p>
              <div className="mt-6 rounded-[28px] border border-slate-800 bg-slate-950/80 p-4">
                <CandlestickChart candles={displayData.candles} isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
          <section className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Market details</h2>
                <p className="mt-2 text-slate-400">Analyze price action, earnings, and the latest market trends.</p>
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
                          ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                          : "border-slate-700 bg-slate-900/80 text-slate-300 hover:border-emerald-400 hover:text-white"
                      }`}
                    >
                      {period.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-[28px] border border-slate-800 bg-slate-900/80 p-4">
              <PriceChart data={displayData.candles} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <article className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Estimated EPS</p>
                <p className="mt-2 text-lg font-semibold text-white">{numberFormat.format(displayData.earnings.epsActual)} vs {numberFormat.format(displayData.earnings.epsEstimate)}</p>
              </article>
              <article className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Revenue</p>
                <p className="mt-2 text-lg font-semibold text-white">${numberFormat.format(displayData.earnings.revenueActualB)}B</p>
              </article>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/20">
              <h3 className="text-xl font-semibold">Earnings summary</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Quarter</p>
                  <p className="mt-3 text-lg font-semibold text-white">{displayData.earnings.quarter}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Guidance</p>
                  <p className="mt-3 text-lg font-semibold text-white">{displayData.earnings.guidance}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/20">
              <h3 className="text-xl font-semibold">Portfolio pulse</h3>
              <p className="mt-2 text-slate-400">Manage positions and watchlist items with quick access tabs.</p>
              <div className="mt-6 rounded-[28px] border border-slate-800 bg-slate-900/80 p-4">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Market label</p>
                  <p className="text-lg font-semibold text-white">{displayData.marketLabel}</p>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-3xl bg-slate-950/80 p-4">
                    <span className="text-sm text-slate-400">Market change</span>
                    <span className={`text-sm font-semibold ${displayData.marketChange.startsWith("+") ? "text-emerald-300" : "text-rose-300"}`}>{displayData.marketChange}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-slate-950/80 p-4">
                    <span className="text-sm text-slate-400">Volume</span>
                    <span className="text-sm font-semibold text-white">{displayData.volume}</span>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>

        <section className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/20">
          <h2 className="text-2xl font-semibold">Financial metrics</h2>
          <p className="mt-2 text-slate-400">Fundamental analytics for the selected stock and timeframe.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <MetricsChart metrics={displayData.metrics} type="pe" />
            <MetricsChart metrics={displayData.metrics} type="roe" />
            <MetricsChart metrics={displayData.metrics} type="debtToEquity" />
            <MetricsChart metrics={displayData.metrics} type="revenue" />
            <MetricsChart metrics={displayData.metrics} type="eps" />
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/20">
          <Tabs selectedIndex={activeTab} onSelect={setActiveTab}>
            <TabList className="grid gap-2 sm:grid-cols-3 mb-4">
              <Tab className="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-400 hover:text-white" selectedClassName="border-emerald-400 bg-emerald-500/10 text-emerald-200">Stocks</Tab>
              <Tab className="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-400 hover:text-white" selectedClassName="border-emerald-400 bg-emerald-500/10 text-emerald-200">Portfolio</Tab>
              <Tab className="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-400 hover:text-white" selectedClassName="border-emerald-400 bg-emerald-500/10 text-emerald-200">Watchlist</Tab>
            </TabList>

            <TabPanel>
              <div className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6">
                <h3 className="text-xl font-semibold">Stocks</h3>
                <p className="mt-2 text-slate-400">A live view of stock performance and technical indicators.</p>
              </div>
            </TabPanel>
            <TabPanel>
              <Portfolio />
            </TabPanel>
            <TabPanel>
              <Watchlist />
            </TabPanel>
          </Tabs>
        </section>
      </div>
    </div>
  );
}