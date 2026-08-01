import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PriceChartProps {
  data: { label: string; close: number }[];
  isDarkMode: boolean;
  chartMode?: "line" | "area" | "bar";
  showGrid?: boolean;
}

export default function PriceChart({
  data,
  isDarkMode,
  chartMode = "line",
  showGrid = true,
}: PriceChartProps) {
  const chartData = data.map((point) => ({
    date: point.label,
    price: point.close,
  }));

  const textColor = isDarkMode ? "#cbd5e1" : "#475569";
  const gridColor = isDarkMode ? "#334155" : "#e5e7eb";
  const tooltipBackground = isDarkMode ? "#111827" : "#ffffff";
  const tooltipBorder = isDarkMode ? "#334155" : "#e5e7eb";
  const strokeColor = isDarkMode ? "#22d3ee" : "#2563eb";
  const fillColor = isDarkMode ? "#22d3ee" : "#0ea5e9";

  const sharedProps = {
    data: chartData,
    margin: { top: 10, right: 10, left: 0, bottom: 0 },
  };

  return (
    <div className="w-full h-64 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <ResponsiveContainer>
        {chartMode === "bar" ? (
          <BarChart {...sharedProps}>
            {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray="2 2" />}
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBackground, border: `1px solid ${tooltipBorder}`, borderRadius: 10, fontSize: 12 }} />
            <Bar dataKey="price" fill={fillColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : chartMode === "area" ? (
          <AreaChart {...sharedProps}>
            {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray="2 2" />}
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBackground, border: `1px solid ${tooltipBorder}`, borderRadius: 10, fontSize: 12 }} />
            <Area type="monotone" dataKey="price" stroke={strokeColor} fill={fillColor} strokeWidth={3} />
          </AreaChart>
        ) : (
          <LineChart {...sharedProps}>
            {showGrid && <CartesianGrid stroke={gridColor} strokeDasharray="2 2" />}
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBackground, border: `1px solid ${tooltipBorder}`, borderRadius: 10, fontSize: 12 }} />
            <Line type="monotone" dataKey="price" stroke={strokeColor} strokeWidth={3} dot={false} activeDot={{ r: 5, fill: isDarkMode ? "#38bdf8" : "#0ea5e9" }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
