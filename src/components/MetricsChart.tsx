import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { FinancialMetrics } from "../data/stocks";

interface MetricsChartProps {
  metrics: FinancialMetrics;
  type: "pe" | "roe" | "debtToEquity" | "revenue" | "eps";
}

export default function MetricsChart({ metrics, type }: MetricsChartProps) {
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

  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer>
        {type === "revenue" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#1e40af" strokeWidth={2} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}