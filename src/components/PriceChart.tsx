import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PriceChartProps {
  data: { label: string; close: number }[];
}

export default function PriceChart({ data }: PriceChartProps) {
  const chartData = data.map((point) => ({
    date: point.label,
    price: point.close,
  }));

  return (
    <div className="w-full h-64 bg-white p-4 rounded-lg border border-gray-200">
      <ResponsiveContainer>
        <LineChart data={chartData}>
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
            dataKey="price"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}