"use client";

import { useState, useMemo } from "react";
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
    <div
      className={`min-h-screen px-4 py-8 ${
        isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <Tabs selectedIndex={activeTab} onSelect={setActiveTab}>
          <TabList className="flex space-x-1 mb-6">
            <Tab className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-t-md cursor-pointer">Stocks</Tab>
            <Tab className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-t-md cursor-pointer">Portfolio</Tab>
            <Tab className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-t-md cursor-pointer">Watchlist</Tab>
          </TabList>

          <TabPanel>
            <div className="space-y-6">
              <header className="flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-end sm:justify-between border-slate-800">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Live Market Dashboard
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-semibold tracking-tight">
                      {normalizedSymbol}
                    </h1>
                    <span className="text-sm text-slate-400">
                      {displayData.marketLabel}
                    </span>
                    <label className="ml-0 text-xs sm:ml-4 text-slate-400">
                      Symbol
                      <input
                        type="text"
                        value={symbolInput}
                        onChange={(event) => setSymbolInput(event.target.value.toUpperCase())}
                        placeholder="Type symbol (e.g. AAPL)"
                        className={`ml-2 rounded-md border px-2 py-1 text-sm outline-none ring-emerald-400 focus:ring-1 ${
                          isDarkMode
                            ? "border-slate-700 bg-slate-950 text-slate-100"
                            : "border-slate-300 bg-white text-slate-900"
                        }`}
                        aria-label="Type stock symbol"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsDarkMode((current) => !current)}
                      className={`ml-0 rounded-md border px-3 py-1 text-xs font-medium sm:ml-2 ${
                        isDarkMode
                          ? "border-slate-700 bg-slate-950 text-slate-200"
                          : "border-slate-300 bg-slate-100 text-slate-700"
                      }`}
                    >
                      {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-emerald-400">
                    ${numberFormat.format(displayData.marketValue)}
                  </p>
                  <p
                    className={`text-sm ${
                      displayData.marketChange.startsWith("+")
                        ? "text-emerald-300"
                        : "text-rose-300"
                    }`}
                  >
                    {displayData.marketChange}
                  </p>
                </div>
              </header>

              <section className="rounded-xl border p-4 border-slate-800 bg-slate-950/70">
                <h2 className="text-lg font-semibold">Last Trading Day Information</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  <article className="rounded-lg border p-3 border-slate-800 bg-slate-900/70">
                    <p className="text-xs uppercase text-slate-400">Open</p>
                    <p className="mt-1 text-lg font-semibold">${numberFormat.format(displayData.open)}</p>
                  </article>
                  <article className="rounded-lg border p-3 border-slate-800 bg-slate-900/70">
                    <p className="text-xs uppercase text-slate-400">Close</p>
                    <p className="mt-1 text-lg font-semibold">${numberFormat.format(displayData.marketValue)}</p>
                  </article>
                  <article className="rounded-lg border p-3 border-slate-800 bg-slate-900/70">
                    <p className="text-xs uppercase text-slate-400">High</p>
                    <p className="mt-1 text-lg font-semibold text-emerald-400">
                      ${numberFormat.format(displayData.high)}
                    </p>
                  </article>
                  <article className="rounded-lg border p-3 border-slate-800 bg-slate-900/70">
                    <p className="text-xs uppercase text-slate-400">Low</p>
                    <p className="mt-1 text-lg font-semibold text-rose-400">
                      ${numberFormat.format(displayData.low)}
                    </p>
                  </article>
                  <article className="rounded-lg border p-3 border-slate-800 bg-slate-900/70">
                    <p className="text-xs uppercase text-slate-400">Volume</p>
                    <p className="mt-1 text-lg font-semibold">{displayData.volume}</p>
                  </article>
                </div>
              </section>

              <section className="rounded-xl border p-4 border-slate-800 bg-slate-950/70">
                <h2 className="text-lg font-semibold">Last Earning Highlights</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <article className="rounded-lg border p-3 border-slate-800 bg-slate-900/70">
                    <p className="text-xs uppercase text-slate-400">Quarter</p>
                    <p className="mt-1 text-lg font-semibold">{displayData.earnings.quarter}</p>
                  </article>
                  <article className="rounded-lg border p-3 border-slate-800 bg-slate-900/70">
                    <p className="text-xs uppercase text-slate-400">EPS (Actual vs Est)</p>
                    <p className="mt-1 text-lg font-semibold">
                      {numberFormat.format(displayData.earnings.epsActual)} vs {numberFormat.format(displayData.earnings.epsEstimate)}
                    </p>
                  </article>
                  <article className="rounded-lg border p-3 border-slate-800 bg-slate-900/70">
                    <p className="text-xs uppercase text-slate-400">Revenue (Actual vs Est)</p>
                    <p className="mt-1 text-lg font-semibold">
                      ${numberFormat.format(displayData.earnings.revenueActualB)}B vs $
                      {numberFormat.format(displayData.earnings.revenueEstimateB)}B
                    </p>
                  </article>
                  <article className="rounded-lg border p-3 border-slate-800 bg-slate-900/70">
                    <p className="text-xs uppercase text-slate-400">Guidance</p>
                    <p className="mt-1 text-sm text-slate-300">
                      {displayData.earnings.guidance}
                    </p>
                  </article>
                </div>
              </section>

              <section className="rounded-xl border p-4 border-slate-800 bg-slate-950/70">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Price Action (Candles)</h2>
                  <div className="flex gap-2">
                    {periods.map((period) => {
                      const isActive = selectedPeriod === period.id;
                      return (
                        <button
                          key={period.id}
                          type="button"
                          onClick={() => setSelectedPeriod(period.id)}
                          className={`rounded-full border px-3 py-1 text-xs ${
                            isDarkMode
                              ? isActive
                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                                : "border-slate-700 text-slate-300"
                              : isActive
                              ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                              : "border-slate-300 text-slate-600"
                          }`}
                        >
                          {period.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <CandlestickChart candles={displayData.candles} isDarkMode={isDarkMode} />
                <div className="mt-2 text-xs text-slate-400">
                  Candlestick chart shows open, high, low, and close with labeled axes.
                </div>
              </section>

              <section className="rounded-xl border p-4 border-slate-800 bg-slate-950/70">
                <h2 className="text-lg font-semibold mb-4">Price Trend</h2>
                <PriceChart data={displayData.candles} />
              </section>

              <section className="rounded-xl border p-4 border-slate-800 bg-slate-950/70">
                <h2 className="text-lg font-semibold mb-4">Financial Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MetricsChart metrics={displayData.metrics} type="pe" />
                  <MetricsChart metrics={displayData.metrics} type="roe" />
                  <MetricsChart metrics={displayData.metrics} type="debtToEquity" />
                  <MetricsChart metrics={displayData.metrics} type="revenue" />
                  <MetricsChart metrics={displayData.metrics} type="eps" />
                </div>
              </section>
            </div>
          </TabPanel>

          <TabPanel>
            <Portfolio />
          </TabPanel>

          <TabPanel>
            <Watchlist />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}