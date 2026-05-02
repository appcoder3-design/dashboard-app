import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { FinancialMetrics } from "../data/stocks";

interface MetricsChartProps {
  metrics: FinancialMetrics;
  type: "pe" | "roe" | "debtToEquity" | "revenue" | "eps";
  isDarkMode: boolean;
}

export default function MetricsChart({ metrics, type, isDarkMode }: MetricsChartProps) {
  const data = metrics.dates.map((date, index) => ({
    date,
    value: metrics[type][index],
  }));

  const title = {
    pe: "P/E Ratio",
    roe: "Return on Equity (ROE)",
    debtToEquity: "Debt-to-Equity Ratio",
    revenue: "Revenue (B)",
    eps: "Earnings Per Share (EPS)",
  }[type];

  const textColor = isDarkMode ? "#cbd5e1" : "#475569";
  const gridColor = isDarkMode ? "#334155" : "#e5e7eb";
  const tooltipBackground = isDarkMode ? "#111827" : "#ffffff";
  const tooltipBorder = isDarkMode ? "#334155" : "#e5e7eb";
  const surfaceClass = isDarkMode ? "bg-slate-950 text-slate-100 border-slate-800" : "bg-white text-slate-900 border-slate-200";

  return (
    <div className={`w-full h-64 rounded-lg border p-4 ${surfaceClass}`}>
      <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">{title}</h3>
      <ResponsiveContainer>
        {type === "revenue" ? (
          <BarChart data={data}>
            <CartesianGrid stroke={gridColor} strokeDasharray="2 2" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: textColor }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: textColor }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBackground,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 6,
                fontSize: 12,
              }}
            />
            <Bar dataKey="value" fill={isDarkMode ? "#22d3ee" : "#0ea5e9"} radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid stroke={gridColor} strokeDasharray="2 2" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: textColor }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: textColor }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBackground,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 6,
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={isDarkMode ? "#22d3ee" : "#2563eb"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: isDarkMode ? "#38bdf8" : "#0ea5e9" }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}