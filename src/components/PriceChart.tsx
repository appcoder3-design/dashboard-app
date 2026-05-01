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
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#1e40af" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}