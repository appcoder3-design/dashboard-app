export default function Home() {
  const chartPoints = [
    { day: "Mon", value: 42 },
    { day: "Tue", value: 48 },
    { day: "Wed", value: 44 },
    { day: "Thu", value: 55 },
    { day: "Fri", value: 61 },
    { day: "Sat", value: 58 },
    { day: "Sun", value: 66 },
  ];

  const positions = [
    { symbol: "AAPL", company: "Apple Inc.", last: "$192.34", change: "+1.43%" },
    { symbol: "NVDA", company: "NVIDIA", last: "$892.18", change: "+2.61%" },
    { symbol: "TSLA", company: "Tesla", last: "$173.42", change: "-0.87%" },
    { symbol: "MSFT", company: "Microsoft", last: "$408.29", change: "+0.56%" },
    { symbol: "AMZN", company: "Amazon", last: "$184.12", change: "+1.02%" },
  ];

  const polyline = chartPoints
    .map((point, index) => `${index * 90},${200 - point.value * 2.2}`)
    .join(" ");

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/60">
        <header className="flex flex-col gap-2 border-b border-slate-800 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Live Market Dashboard
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              NASDAQ Composite
            </h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-emerald-400">15,428.73</p>
            <p className="text-sm text-emerald-300">+152.80 (+1.00%) today</p>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Volume
            </p>
            <p className="mt-1 text-xl font-semibold">1.24B</p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Open
            </p>
            <p className="mt-1 text-xl font-semibold">15,312.09</p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              High
            </p>
            <p className="mt-1 text-xl font-semibold text-emerald-400">
              15,445.16
            </p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Low
            </p>
            <p className="mt-1 text-xl font-semibold text-rose-400">15,210.24</p>
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
            {chartPoints.map((point, index) => (
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
            {chartPoints.map((point) => (
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
                {positions.map((position) => {
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
