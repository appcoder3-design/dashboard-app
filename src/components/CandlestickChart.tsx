import { useMemo } from "react";

interface CandlePoint {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  candles: CandlePoint[];
  isDarkMode: boolean;
}

export default function CandlestickChart({ candles, isDarkMode }: CandlestickChartProps) {
  const chartMeta = useMemo(() => {
    const highs = candles.map((candle) => candle.high);
    const lows = candles.map((candle) => candle.low);
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
  }, [candles]);

  return (
    <svg
      viewBox="0 0 640 300"
      className="h-64 w-full rounded-lg border border-gray-200 bg-white p-4"
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
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x="54"
              y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="#6b7280"
            >
              {chartMeta.yTicks[tickIndex].toFixed(2)}
            </text>
          </g>
        );
      })}
      <line
        x1="60"
        y1="230"
        x2="620"
        y2="230"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <line
        x1="60"
        y1="30"
        x2="60"
        y2="230"
        stroke="#374151"
        strokeWidth="1.5"
      />
      {candles.map((candle, index) => {
        const x = 90 + index * (520 / Math.max(candles.length - 1, 1));
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
              stroke="#6b7280"
              strokeWidth="1.5"
            />
            <rect
              x={x - 9}
              y={bodyTop}
              width="18"
              height={bodyHeight}
              rx="2"
              fill={isUp ? "#10b981" : "#ef4444"}
              opacity="0.9"
            />
            <text
              x={x}
              y="248"
              textAnchor="middle"
              fontSize="10"
              fill="#6b7280"
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
        fill="#374151"
      >
        Price ($)
      </text>
      <text
        x="600"
        y="272"
        fontSize="10"
        fill="#374151"
      >
        Time
      </text>
    </svg>
  );
}