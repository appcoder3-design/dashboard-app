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
      { label: "D2", open: 189.5, high: 191, low: 188.7, close: 190.8 },
      { label: "D3", open: 190.8, high: 192, low: 189.2, close: 191.4 },
      { label: "D4", open: 191.4, high: 193.2, low: 190.9, close: 192.8 },
      { label: "D5", open: 192.8, high: 193.4, low: 191.8, close: 192.1 },
      { label: "D6", open: 192.1, high: 193, low: 191.4, close: 192.7 },
      { label: "D7", open: 192.7, high: 194.1, low: 192.2, close: 193.5 },
      { label: "D8", open: 193.5, high: 194, low: 192.7, close: 193.1 },
      { label: "D9", open: 193.1, high: 193.9, low: 192.5, close: 192.9 },
      { label: "D10", open: 192.9, high: 193.8, low: 192.3, close: 193.3 },
    ],
  },
  NVDA: {
    marketLabel: "NVIDIA Corporation",
    marketValue: 892.18,
    marketChange: "+22.71 (+2.61%) today",
    volume: "46.87M",
    open: 874.53,
    high: 899.4,
    low: 870.62,
    earnings: {
      quarter: "Q1 2026",
      epsActual: 6.21,
      epsEstimate: 5.75,
      revenueActualB: 27.4,
      revenueEstimateB: 26.1,
      guidance: "Datacenter demand remains strong.",
    },
    candles: [
      { label: "D1", open: 845, high: 860, low: 838, close: 856 },
      { label: "D2", open: 856, high: 872, low: 851, close: 868 },
      { label: "D3", open: 868, high: 881, low: 862, close: 874 },
      { label: "D4", open: 874, high: 889, low: 870, close: 886 },
      { label: "D5", open: 886, high: 900, low: 879, close: 895 },
      { label: "D6", open: 895, high: 902, low: 888, close: 893 },
      { label: "D7", open: 893, high: 901, low: 884, close: 889 },
      { label: "D8", open: 889, high: 896, low: 878, close: 883 },
      { label: "D9", open: 883, high: 891, low: 876, close: 887 },
      { label: "D10", open: 887, high: 899, low: 882, close: 892 },
    ],
  },
  TSLA: {
    marketLabel: "Tesla Inc.",
    marketValue: 173.42,
    marketChange: "-1.52 (-0.87%) today",
    volume: "112.64M",
    open: 175.05,
    high: 176.72,
    low: 171.61,
    earnings: {
      quarter: "Q1 2026",
      epsActual: 0.57,
      epsEstimate: 0.61,
      revenueActualB: 22.8,
      revenueEstimateB: 23.2,
      guidance: "Auto margin pressure expected next quarter.",
    },
    candles: [
      { label: "D1", open: 182, high: 183, low: 178, close: 179 },
      { label: "D2", open: 179, high: 180.5, low: 176.8, close: 177.1 },
      { label: "D3", open: 177.1, high: 178.2, low: 174.5, close: 175.3 },
      { label: "D4", open: 175.3, high: 176.4, low: 173.9, close: 174.6 },
      { label: "D5", open: 174.6, high: 175.8, low: 172.2, close: 173.1 },
      { label: "D6", open: 173.1, high: 174.7, low: 171.8, close: 172.7 },
      { label: "D7", open: 172.7, high: 174.2, low: 171.2, close: 173.8 },
      { label: "D8", open: 173.8, high: 175.1, low: 172.9, close: 174.4 },
      { label: "D9", open: 174.4, high: 175.5, low: 172.6, close: 173.6 },
      { label: "D10", open: 173.6, high: 174.2, low: 172.1, close: 173.2 },
    ],
  },
  MSFT: {
    marketLabel: "Microsoft Corporation",
    marketValue: 408.29,
    marketChange: "+2.29 (+0.56%) today",
    volume: "21.06M",
    open: 406.15,
    high: 409.22,
    low: 404.97,
    earnings: {
      quarter: "Q1 2026",
      epsActual: 2.96,
      epsEstimate: 2.82,
      revenueActualB: 64.8,
      revenueEstimateB: 63.5,
      guidance: "Cloud revenue outlook above consensus.",
    },
    candles: [
      { label: "D1", open: 392, high: 396, low: 390, close: 395 },
      { label: "D2", open: 395, high: 398, low: 393, close: 397.2 },
      { label: "D3", open: 397.2, high: 401, low: 396, close: 400.4 },
      { label: "D4", open: 400.4, high: 404, low: 399.6, close: 403.3 },
      { label: "D5", open: 403.3, high: 407, low: 402, close: 405.9 },
      { label: "D6", open: 405.9, high: 408.4, low: 404.8, close: 406.7 },
      { label: "D7", open: 406.7, high: 409.6, low: 405.6, close: 408.2 },
      { label: "D8", open: 408.2, high: 410.1, low: 407.2, close: 409.4 },
      { label: "D9", open: 409.4, high: 410.6, low: 407.9, close: 408.7 },
      { label: "D10", open: 408.7, high: 409.8, low: 407.5, close: 408.3 },
    ],
  },
};

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

function hashSymbol(symbol: string): number {
  return symbol.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function buildFallbackData(symbol: string): SymbolData {
  const seed = hashSymbol(symbol || "SYMB");
  const base = 100 + (seed % 700);
  const movement = ((seed % 21) - 10) / 10;
  const open = base + movement;
  const close = base + movement * 1.6;
  const high = Math.max(open, close) + 3;
  const low = Math.min(open, close) - 3;
  const candles: CandlePoint[] = Array.from({ length: 10 }, (_, index) => {
    const offset = (index - 4) * 0.9;
    const cOpen = open + offset + ((index % 3) - 1) * 0.7;
    const cClose = cOpen + ((index % 2 === 0 ? 1 : -1) * 0.9);
    const cHigh = Math.max(cOpen, cClose) + 1.4;
    const cLow = Math.min(cOpen, cClose) - 1.4;
    return {
      label: `D${index + 1}`,
      open: Number(cOpen.toFixed(2)),
      close: Number(cClose.toFixed(2)),
      high: Number(cHigh.toFixed(2)),
      low: Number(cLow.toFixed(2)),
    };
  });
  const pct = ((close - open) / open) * 100;
  const signed = close - open;

  return {
    marketLabel: "Custom Symbol",
    marketValue: Number(close.toFixed(2)),
    marketChange: `${signed >= 0 ? "+" : ""}${signed.toFixed(2)} (${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%) today`,
    volume: `${(12 + (seed % 80)).toFixed(2)}M`,
    open: Number(open.toFixed(2)),
    high: Number(high.toFixed(2)),
    low: Number(low.toFixed(2)),
    earnings: {
      quarter: "Q1 2026",
      epsActual: Number((1.2 + (seed % 30) / 20).toFixed(2)),
      epsEstimate: Number((1.1 + (seed % 30) / 22).toFixed(2)),
      revenueActualB: Number((10 + (seed % 120) / 4).toFixed(2)),
      revenueEstimateB: Number((9.5 + (seed % 120) / 4.2).toFixed(2)),
      guidance: "Outlook stable with balanced demand trends.",
    },
    candles,
  };
}

export default function Home() {
  const [symbolInput, setSymbolInput] = useState("AAPL");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodId>("1W");

  const normalizedSymbol = symbolInput.trim().toUpperCase() || "AAPL";
  const baseData = dashboardData[normalizedSymbol] ?? buildFallbackData(normalizedSymbol);
  const pointsCount = periods.find((period) => period.id === selectedPeriod)?.points ?? 7;
  const visibleCandles = baseData.candles.slice(-pointsCount);

  const data = {
    ...baseData,
    candles: visibleCandles,
  };

  const chartMeta = useMemo(() => {
    const highs = data.candles.map((candle) => candle.high);
    const lows = data.candles.map((candle) => candle.low);
    const max = Math.max(...highs);
    const min = Math.min(...lows);
    const range = Math.max(max - min, 1);
    const yTicks = Array.from({ length: 5 }, (_, idx) => max - (range / 4) * idx);

    return {
      max,
      min,
      range,
      yTicks,
    };
  }, [data.candles]);

  return (
    <div
      className={`min-h-screen px-4 py-8 ${
        isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <main
        className={`mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-2xl border p-6 shadow-2xl ${
          isDarkMode
            ? "border-slate-800 bg-slate-900 shadow-slate-950/60"
            : "border-slate-200 bg-white shadow-slate-300/50"
        }`}
      >
        <header
          className={`flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-end sm:justify-between ${
            isDarkMode ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <div>
            <p
              className={`text-xs uppercase tracking-[0.28em] ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Live Market Dashboard
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                {normalizedSymbol}
              </h1>
              <span
                className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {data.marketLabel}
              </span>
              <label
                className={`ml-0 text-xs sm:ml-4 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
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
              ${numberFormat.format(data.marketValue)}
            </p>
            <p
              className={`text-sm ${
                data.marketChange.startsWith("+")
                  ? "text-emerald-300"
                  : "text-rose-300"
              }`}
            >
              {data.marketChange}
            </p>
          </div>
        </header>

        <section
          className={`rounded-xl border p-4 ${
            isDarkMode ? "border-slate-800 bg-slate-950/70" : "border-slate-200 bg-slate-50"
          }`}
        >
          <h2 className="text-lg font-semibold">Last Trading Day Information</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <article
              className={`rounded-lg border p-3 ${
                isDarkMode ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
              }`}
            >
              <p className={`text-xs uppercase ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Open
              </p>
              <p className="mt-1 text-lg font-semibold">${numberFormat.format(data.open)}</p>
            </article>
            <article
              className={`rounded-lg border p-3 ${
                isDarkMode ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
              }`}
            >
              <p className={`text-xs uppercase ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Close
              </p>
              <p className="mt-1 text-lg font-semibold">${numberFormat.format(data.marketValue)}</p>
            </article>
            <article
              className={`rounded-lg border p-3 ${
                isDarkMode ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
              }`}
            >
              <p className={`text-xs uppercase ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                High
              </p>
              <p className="mt-1 text-lg font-semibold text-emerald-400">
                ${numberFormat.format(data.high)}
              </p>
            </article>
            <article
              className={`rounded-lg border p-3 ${
                isDarkMode ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
              }`}
            >
              <p className={`text-xs uppercase ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Low
              </p>
              <p className="mt-1 text-lg font-semibold text-rose-400">
                ${numberFormat.format(data.low)}
              </p>
            </article>
            <article
              className={`rounded-lg border p-3 ${
                isDarkMode ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
              }`}
            >
              <p className={`text-xs uppercase ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Volume
              </p>
              <p className="mt-1 text-lg font-semibold">{data.volume}</p>
            </article>
          </div>
        </section>

        <section
          className={`rounded-xl border p-4 ${
            isDarkMode ? "border-slate-800 bg-slate-950/70" : "border-slate-200 bg-slate-50"
          }`}
        >
          <h2 className="text-lg font-semibold">Last Earning Highlights</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article
              className={`rounded-lg border p-3 ${
                isDarkMode ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
              }`}
            >
              <p className={`text-xs uppercase ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Quarter
              </p>
              <p className="mt-1 text-lg font-semibold">{data.earnings.quarter}</p>
            </article>
            <article
              className={`rounded-lg border p-3 ${
                isDarkMode ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
              }`}
            >
              <p className={`text-xs uppercase ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                EPS (Actual vs Est)
              </p>
              <p className="mt-1 text-lg font-semibold">
                {numberFormat.format(data.earnings.epsActual)} vs {numberFormat.format(data.earnings.epsEstimate)}
              </p>
            </article>
            <article
              className={`rounded-lg border p-3 ${
                isDarkMode ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
              }`}
            >
              <p className={`text-xs uppercase ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Revenue (Actual vs Est)
              </p>
              <p className="mt-1 text-lg font-semibold">
                ${numberFormat.format(data.earnings.revenueActualB)}B vs $
                {numberFormat.format(data.earnings.revenueEstimateB)}B
              </p>
            </article>
            <article
              className={`rounded-lg border p-3 ${
                isDarkMode ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
              }`}
            >
              <p className={`text-xs uppercase ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Guidance
              </p>
              <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                {data.earnings.guidance}
              </p>
            </article>
          </div>
        </section>

        <section
          className={`rounded-xl border p-4 ${
            isDarkMode ? "border-slate-800 bg-slate-950/70" : "border-slate-200 bg-slate-50"
          }`}
        >
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
          <svg
            viewBox="0 0 640 300"
            className={`h-64 w-full rounded-lg border ${
              isDarkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"
            }`}
            role="img"
            aria-label="Stock candlestick chart with axes"
          >
            {[0, 1, 2, 3, 4].map((tickIndex) => {
              const y = 30 + tickIndex * 50;
              return (
                <g key={tickIndex}>
                  <line
                    x1="60"
                    y1={y}
                    x2="620"
                    y2={y}
                    stroke={isDarkMode ? "#1f2937" : "#cbd5e1"}
                    strokeWidth="1"
                  />
                  <text
                    x="54"
                    y={y + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill={isDarkMode ? "#94a3b8" : "#64748b"}
                  >
                    {numberFormat.format(chartMeta.yTicks[tickIndex])}
                  </text>
                </g>
              );
            })}
            <line
              x1="60"
              y1="230"
              x2="620"
              y2="230"
              stroke={isDarkMode ? "#334155" : "#94a3b8"}
              strokeWidth="1.5"
            />
            <line
              x1="60"
              y1="30"
              x2="60"
              y2="230"
              stroke={isDarkMode ? "#334155" : "#94a3b8"}
              strokeWidth="1.5"
            />
            {data.candles.map((candle, index) => {
              const x = 90 + index * (520 / Math.max(data.candles.length - 1, 1));
              const yFromPrice = (price: number) =>
                30 + ((chartMeta.max - price) / chartMeta.range) * 200;
              const yOpen = yFromPrice(candle.open);
              const yClose = yFromPrice(candle.close);
              const yHigh = yFromPrice(candle.high);
              const yLow = yFromPrice(candle.low);
              const bodyTop = Math.min(yOpen, yClose);
              const bodyHeight = Math.max(Math.abs(yOpen - yClose), 2);
              const isUp = candle.close >= candle.open;

              return (
                <g key={`${candle.label}-${index}`}>
                  <line
                    x1={x}
                    y1={yHigh}
                    x2={x}
                    y2={yLow}
                    stroke={isDarkMode ? "#94a3b8" : "#64748b"}
                    strokeWidth="1.5"
                  />
                  <rect
                    x={x - 9}
                    y={bodyTop}
                    width="18"
                    height={bodyHeight}
                    rx="2"
                    fill={isUp ? "#22c55e" : "#ef4444"}
                    opacity="0.85"
                  />
                  <text
                    x={x}
                    y="248"
                    textAnchor="middle"
                    fontSize="10"
                    fill={isDarkMode ? "#94a3b8" : "#64748b"}
                  >
                    {candle.label}
                  </text>
                </g>
              );
            })}
            <text
              x="14"
              y="16"
              fontSize="10"
              fill={isDarkMode ? "#94a3b8" : "#64748b"}
            >
              Price ($)
            </text>
            <text
              x="600"
              y="272"
              fontSize="10"
              fill={isDarkMode ? "#94a3b8" : "#64748b"}
            >
              Time
            </text>
          </svg>
          <div
            className={`mt-2 text-xs ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Candlestick chart shows open, high, low, and close with labeled axes.
          </div>
        </section>
      </main>
    </div>
  );
}
