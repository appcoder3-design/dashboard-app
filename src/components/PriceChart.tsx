import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PriceChartProps {
  data: { label: string; close: number }[];
  isDarkMode: boolean;
}

export default function PriceChart({ data, isDarkMode }: PriceChartProps) {
  const chartData = data.map((point) => ({
    date: point.label,
    price: point.close,
  }));

  const textColor = isDarkMode ? "#cbd5e1" : "#475569";
  const gridColor = isDarkMode ? "#334155" : "#e5e7eb";
  const tooltipBackground = isDarkMode ? "#111827" : "#ffffff";
  const tooltipBorder = isDarkMode ? "#334155" : "#e5e7eb";

  return (
    <div className="w-full h-64 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <ResponsiveContainer>
        <LineChart data={chartData}>
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
              borderRadius: 10,
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isDarkMode ? "#22d3ee" : "#2563eb"}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5, fill: isDarkMode ? "#38bdf8" : "#0ea5e9" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
