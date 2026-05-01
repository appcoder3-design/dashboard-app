"use client";

import { useMemo, useState } from "react";

type ChartPoint = {
  day: string;
  value: number;
};

type Position = {
  symbol: string;
  company: string;
  last: string;
  change: string;
};

type SymbolData = {
  marketLabel: string;
  marketValue: string;
  marketChange: string;
  volume: string;
  open: string;
  high: string;
  low: string;
  chartPoints: ChartPoint[];
  positions: Position[];
};

const dashboardData: Record<string, SymbolData> = {
  AAPL: {
    marketLabel: "Apple Inc.",
    marketValue: "192.34",
    marketChange: "+2.72 (+1.43%) today",
    volume: "58.12M",
    open: "190.11",
    high: "193.04",
    low: "189.67",
    chartPoints: [
      { day: "Mon", value: 42 },
      { day: "Tue", value: 48 },
      { day: "Wed", value: 44 },
      { day: "Thu", value: 55 },
      { day: "Fri", value: 61 },
      { day: "Sat", value: 58 },
      { day: "Sun", value: 66 },
    ],
    positions: [
      { symbol: "AAPL", company: "Apple Inc.", last: "$192.34", change: "+1.43%" },
      { symbol: "MSFT", company: "Microsoft", last: "$408.29", change: "+0.56%" },
      { symbol: "NVDA", company: "NVIDIA", last: "$892.18", change: "+2.61%" },
      { symbol: "AMZN", company: "Amazon", last: "$184.12", change: "+1.02%" },
      { symbol: "TSLA", company: "Tesla", last: "$173.42", change: "-0.87%" },
    ],
  },
  NVDA: {
    marketLabel: "NVIDIA Corporation",
    marketValue: "892.18",
    marketChange: "+22.71 (+2.61%) today",
    volume: "46.87M",
    open: "874.53",
    high: "899.40",
    low: "870.62",
    chartPoints: [
      { day: "Mon", value: 50 },
      { day: "Tue", value: 53 },
      { day: "Wed", value: 58 },
      { day: "Thu", value: 61 },
      { day: "Fri", value: 64 },
      { day: "Sat", value: 69 },
      { day: "Sun", value: 73 },
    ],
    positions: [
      { symbol: "NVDA", company: "NVIDIA", last: "$892.18", change: "+2.61%" },
      { symbol: "AMD", company: "Advanced Micro Devices", last: "$171.20", change: "+1.78%" },
      { symbol: "TSM", company: "Taiwan Semiconductor", last: "$148.33", change: "+0.92%" },
      { symbol: "ASML", company: "ASML Holding", last: "$968.14", change: "+1.06%" },
      { symbol: "AVGO", company: "Broadcom", last: "$1,388.73", change: "+2.11%" },
    ],
  },
  TSLA: {
    marketLabel: "Tesla Inc.",
    marketValue: "173.42",
    marketChange: "-1.52 (-0.87%) today",
    volume: "112.64M",
    open: "175.05",
    high: "176.72",
    low: "171.61",
    chartPoints: [
      { day: "Mon", value: 64 },
      { day: "Tue", value: 59 },
      { day: "Wed", value: 55 },
      { day: "Thu", value: 57 },
      { day: "Fri", value: 52 },
      { day: "Sat", value: 49 },
      { day: "Sun", value: 46 },
    ],
    positions: [
      { symbol: "TSLA", company: "Tesla", last: "$173.42", change: "-0.87%" },
      { symbol: "RIVN", company: "Rivian", last: "$10.84", change: "-1.09%" },
      { symbol: "LCID", company: "Lucid Group", last: "$2.91", change: "-0.68%" },
      { symbol: "F", company: "Ford", last: "$12.70", change: "-0.24%" },
      { symbol: "GM", company: "General Motors", last: "$42.11", change: "+0.19%" },
    ],
  },
  MSFT: {
    marketLabel: "Microsoft Corporation",
    marketValue: "408.29",
    marketChange: "+2.29 (+0.56%) today",
    volume: "21.06M",
    open: "406.15",
    high: "409.22",
    low: "404.97",
    chartPoints: [
      { day: "Mon", value: 45 },
      { day: "Tue", value: 47 },
      { day: "Wed", value: 49 },
      { day: "Thu", value: 51 },
      { day: "Fri", value: 56 },
      { day: "Sat", value: 54 },
      { day: "Sun", value: 58 },
    ],
    positions: [
      { symbol: "MSFT", company: "Microsoft", last: "$408.29", change: "+0.56%" },
      { symbol: "AAPL", company: "Apple Inc.", last: "$192.34", change: "+1.43%" },
      { symbol: "GOOGL", company: "Alphabet", last: "$163.59", change: "+0.47%" },
      { symbol: "AMZN", company: "Amazon", last: "$184.12", change: "+1.02%" },
      { symbol: "META", company: "Meta Platforms", last: "$488.90", change: "-0.31%" },
    ],
  },
};

export default function Home() {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const data = dashboardData[selectedSymbol];

  const polyline = useMemo(
    () =>
      data.chartPoints
        .map((point, index) => `${index * 90},${200 - point.value * 2.2}`)
        .join(" "),
    [data.chartPoints]
  );

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/60">
        <header className="flex flex-col gap-2 border-b border-slate-800 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Live Market Dashboard
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                {selectedSymbol}
              </h1>
              <span className="text-sm text-slate-400">{data.marketLabel}</span>
              <label className="ml-0 text-xs text-slate-400 sm:ml-4">
                Symbol
                <select
                  value={selectedSymbol}
                  onChange={(event) => setSelectedSymbol(event.target.value)}
                  className="ml-2 rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 outline-none ring-emerald-400 focus:ring-1"
                  aria-label="Choose stock symbol"
                >
                  {Object.keys(dashboardData).map((symbol) => (
                    <option key={symbol} value={symbol}>
                      {symbol}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-emerald-400">
              ${data.marketValue}
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

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Volume
            </p>
            <p className="mt-1 text-xl font-semibold">{data.volume}</p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Open
            </p>
            <p className="mt-1 text-xl font-semibold">${data.open}</p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              High
            </p>
            <p className="mt-1 text-xl font-semibold text-emerald-400">
              ${data.high}
            </p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Low
            </p>
            <p className="mt-1 text-xl font-semibold text-rose-400">
              ${data.low}
            </p>
          </article>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Price Action (7D)</h2>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              Candles + Trend
            </span>
          </div>
          <svg
            viewBox="0 0 540 220"
            className="h-64 w-full rounded-lg border border-slate-800 bg-slate-950"
            role="img"
            aria-label="Stock chart trend line"
          >
            {[40, 80, 120, 160].map((line) => (
              <line
                key={line}
                x1="0"
                y1={line}
                x2="540"
                y2={line}
                stroke="#1f2937"
                strokeWidth="1"
              />
            ))}
            {data.chartPoints.map((point, index) => (
              <g key={point.day}>
                <line
                  x1={index * 90}
                  y1={195}
                  x2={index * 90}
                  y2={30}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
                <rect
                  x={index * 90 - 8}
                  y={180 - point.value * 1.8}
                  width="16"
                  height="30"
                  rx="3"
                  fill={index % 2 === 0 ? "#22c55e" : "#38bdf8"}
                  opacity="0.75"
                />
              </g>
            ))}
            <polyline
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              points={polyline}
            />
          </svg>
          <div className="mt-2 grid grid-cols-7 text-center text-xs text-slate-400">
            {data.chartPoints.map((point) => (
              <span key={point.day}>{point.day}</span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Positions</h2>
            <span className="text-xs text-slate-400">
              Snapshot as of market close
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-400">
                  <th className="py-2 pr-2">Symbol</th>
                  <th className="py-2 pr-2">Company</th>
                  <th className="py-2 pr-2">Last Price</th>
                  <th className="py-2">Change</th>
                </tr>
              </thead>
              <tbody>
                {data.positions.map((position) => {
                  const isPositive = position.change.startsWith("+");
                  return (
                    <tr
                      key={position.symbol}
                      className="border-b border-slate-800/70 last:border-b-0"
                    >
                      <td className="py-3 pr-2 font-semibold">{position.symbol}</td>
                      <td className="py-3 pr-2 text-slate-300">{position.company}</td>
                      <td className="py-3 pr-2">{position.last}</td>
                      <td
                        className={`py-3 font-medium ${
                          isPositive ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {position.change}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
