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
    <div className="w-full h-64 bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
      <ResponsiveContainer>
        {type === "revenue" ? (
          <BarChart data={data}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="2 2" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="value" fill="#10b981" radius={[2, 2, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="2 2" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#2563eb' }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}