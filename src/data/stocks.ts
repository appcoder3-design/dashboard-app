export interface CandlePoint {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface FinancialMetrics {
  pe: number[];
  roe: number[];
  debtToEquity: number[];
  revenue: number[];
  eps: number[];
  dates: string[];
}

export interface SymbolData {
  marketLabel: string;
  marketValue: number;
  marketChange: string;
  volume: string;
  open: number;
  high: number;
  low: number;
  earnings: {
    quarter: string;
    epsActual: number;
    epsEstimate: number;
    revenueActualB: number;
    revenueEstimateB: number;
    guidance: string;
  };
  candles: CandlePoint[];
  metrics: FinancialMetrics;
}

export const dashboardData: Record<string, SymbolData> = {
  AAPL: {
    marketLabel: "Apple Inc.",
    marketValue: 192.34,
    marketChange: "+2.72 (+1.43%) today",
    volume: "58.12M",
    open: 190.11,
    high: 193.04,
    low: 189.67,
    earnings: {
      quarter: "Q1 2026",
      epsActual: 1.64,
      epsEstimate: 1.58,
      revenueActualB: 93.7,
      revenueEstimateB: 91.2,
      guidance: "Guidance raised for services growth.",
    },
    candles: [
      { label: "D1", open: 188, high: 190, low: 187, close: 189.5 },
      { label: "D2", open: 189.5, high: 191, low: 188.7, close: 190.8 },
      { label: "D3", open: 190.8, high: 192, low: 189.2, close: 191.4 },
      { label: "D4", open: 191.4, high: 193.2, low: 190.9, close: 192.8 },
      { label: "D5", open: 192.8, high: 193.4, low: 191.8, close: 192.1 },
      { label: "D6", open: 192.1, high: 193, low: 191.4, close: 192.7 },
      { label: "D7", open: 192.7, high: 194.1, low: 192.2, close: 193.5 },
      { label: "D8", open: 193.5, high: 194, low: 192.7, close: 193.1 },
      { label: "D9", open: 193.1, high: 193.9, low: 192.5, close: 192.9 },
      { label: "D10", open: 192.9, high: 193.8, low: 192.3, close: 193.3 },
    ],
    metrics: {
      pe: [28.5, 29.2, 27.8, 30.1, 29.5],
      roe: [0.28, 0.29, 0.27, 0.30, 0.31],
      debtToEquity: [1.5, 1.4, 1.6, 1.3, 1.2],
      revenue: [365, 380, 395, 410, 425],
      eps: [6.5, 6.8, 7.0, 7.2, 7.5],
      dates: ["2021", "2022", "2023", "2024", "2025"],
    },
  },
  NVDA: {
    marketLabel: "NVIDIA Corporation",
    marketValue: 892.18,
    marketChange: "+22.71 (+2.61%) today",
    volume: "46.87M",
    open: 874.53,
    high: 899.4,
    low: 870.62,
    earnings: {
      quarter: "Q1 2026",
      epsActual: 6.21,
      epsEstimate: 5.75,
      revenueActualB: 27.4,
      revenueEstimateB: 26.1,
      guidance: "Datacenter demand remains strong.",
    },
    candles: [
      { label: "D1", open: 845, high: 860, low: 838, close: 856 },
      { label: "D2", open: 856, high: 872, low: 851, close: 868 },
      { label: "D3", open: 868, high: 881, low: 862, close: 874 },
      { label: "D4", open: 874, high: 889, low: 870, close: 886 },
      { label: "D5", open: 886, high: 900, low: 879, close: 895 },
      { label: "D6", open: 895, high: 902, low: 888, close: 893 },
      { label: "D7", open: 893, high: 901, low: 884, close: 889 },
      { label: "D8", open: 889, high: 896, low: 878, close: 883 },
      { label: "D9", open: 883, high: 891, low: 876, close: 887 },
      { label: "D10", open: 887, high: 899, low: 882, close: 892 },
    ],
    metrics: {
      pe: [65.2, 68.1, 62.5, 70.3, 69.8],
      roe: [0.35, 0.38, 0.32, 0.40, 0.42],
      debtToEquity: [0.3, 0.25, 0.35, 0.2, 0.15],
      revenue: [26.9, 30.1, 34.2, 38.5, 42.8],
      eps: [12.1, 13.5, 15.2, 17.1, 19.0],
      dates: ["2021", "2022", "2023", "2024", "2025"],
    },
  },
  TSLA: {
    marketLabel: "Tesla Inc.",
    marketValue: 173.42,
    marketChange: "-1.52 (-0.87%) today",
    volume: "112.64M",
    open: 175.05,
    high: 176.72,
    low: 171.61,
    earnings: {
      quarter: "Q1 2026",
      epsActual: 0.57,
      epsEstimate: 0.61,
      revenueActualB: 22.8,
      revenueEstimateB: 23.2,
      guidance: "Auto margin pressure expected next quarter.",
    },
    candles: [
      { label: "D1", open: 182, high: 183, low: 178, close: 179 },
      { label: "D2", open: 179, high: 180.5, low: 176.8, close: 177.1 },
      { label: "D3", open: 177.1, high: 178.2, low: 174.5, close: 175.3 },
      { label: "D4", open: 175.3, high: 176.4, low: 173.9, close: 174.6 },
      { label: "D5", open: 174.6, high: 175.8, low: 172.2, close: 173.1 },
      { label: "D6", open: 173.1, high: 174.7, low: 171.8, close: 172.7 },
      { label: "D7", open: 172.7, high: 174.2, low: 171.2, close: 173.8 },
      { label: "D8", open: 173.8, high: 175.1, low: 172.9, close: 174.4 },
      { label: "D9", open: 174.4, high: 175.5, low: 172.6, close: 173.6 },
      { label: "D10", open: 173.6, high: 174.2, low: 172.1, close: 173.2 },
    ],
    metrics: {
      pe: [45.2, 48.1, 42.5, 50.3, 49.8],
      roe: [0.15, 0.18, 0.12, 0.20, 0.22],
      debtToEquity: [0.8, 0.7, 0.9, 0.6, 0.5],
      revenue: [53.8, 58.1, 62.5, 67.3, 72.8],
      eps: [3.8, 4.1, 4.5, 4.9, 5.3],
      dates: ["2021", "2022", "2023", "2024", "2025"],
    },
  },
  MSFT: {
    marketLabel: "Microsoft Corporation",
    marketValue: 408.29,
    marketChange: "+2.29 (+0.56%) today",
    volume: "21.06M",
    open: 406.15,
    high: 409.22,
    low: 404.97,
    earnings: {
      quarter: "Q1 2026",
      epsActual: 2.96,
      epsEstimate: 2.82,
      revenueActualB: 64.8,
      revenueEstimateB: 63.5,
      guidance: "Cloud revenue outlook above consensus.",
    },
    candles: [
      { label: "D1", open: 392, high: 396, low: 390, close: 395 },
      { label: "D2", open: 395, high: 398, low: 393, close: 397.2 },
      { label: "D3", open: 397.2, high: 401, low: 396, close: 400.4 },
      { label: "D4", open: 400.4, high: 404, low: 399.6, close: 403.3 },
      { label: "D5", open: 403.3, high: 407, low: 402, close: 405.9 },
      { label: "D6", open: 405.9, high: 408.4, low: 404.8, close: 406.7 },
      { label: "D7", open: 406.7, high: 409.6, low: 405.6, close: 408.2 },
      { label: "D8", open: 408.2, high: 410.1, low: 407.2, close: 409.4 },
      { label: "D9", open: 409.4, high: 410.6, low: 407.9, close: 408.7 },
      { label: "D10", open: 408.7, high: 409.8, low: 407.5, close: 408.3 },
    ],
    metrics: {
      pe: [32.5, 33.2, 31.8, 34.1, 33.5],
      roe: [0.32, 0.33, 0.31, 0.34, 0.35],
      debtToEquity: [0.4, 0.35, 0.45, 0.3, 0.25],
      revenue: [168, 175, 182, 190, 198],
      eps: [9.7, 10.1, 10.5, 10.9, 11.3],
      dates: ["2021", "2022", "2023", "2024", "2025"],
    },
  },
};

export function hashSymbol(symbol: string): number {
  return symbol.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function buildFallbackData(symbol: string): SymbolData {
  const seed = hashSymbol(symbol || "SYMB");
  const base = 100 + (seed % 700);
  const movement = ((seed % 21) - 10) / 10;
  const open = base + movement;
  const close = base + movement * 1.6;
  const high = Math.max(open, close) + 3;
  const low = Math.min(open, close) - 3;
  const candles: CandlePoint[] = Array.from({ length: 10 }, (_, index) => {
    const offset = (index - 4) * 0.9;
    const cOpen = open + offset + ((index % 3) - 1) * 0.7;
    const cClose = cOpen + ((index % 2 === 0 ? 1 : -1) * 0.9);
    const cHigh = Math.max(cOpen, cClose) + 1.4;
    const cLow = Math.min(cOpen, cClose) - 1.4;
    return {
      label: `D${index + 1}`,
      open: Number(cOpen.toFixed(2)),
      close: Number(cClose.toFixed(2)),
      high: Number(cHigh.toFixed(2)),
      low: Number(cLow.toFixed(2)),
    };
  });
  const pct = ((close - open) / open) * 100;
  const signed = close - open;

  return {
    marketLabel: "Custom Symbol",
    marketValue: Number(close.toFixed(2)),
    marketChange: `${signed >= 0 ? "+" : ""}${signed.toFixed(2)} (${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%) today`,
    volume: `${(12 + (seed % 80)).toFixed(2)}M`,
    open: Number(open.toFixed(2)),
    high: Number(high.toFixed(2)),
    low: Number(low.toFixed(2)),
    earnings: {
      quarter: "Q1 2026",
      epsActual: Number((1.2 + (seed % 30) / 20).toFixed(2)),
      epsEstimate: Number((1.1 + (seed % 30) / 22).toFixed(2)),
      revenueActualB: Number((10 + (seed % 120) / 4).toFixed(2)),
      revenueEstimateB: Number((9.5 + (seed % 120) / 4.2).toFixed(2)),
      guidance: "Outlook stable with balanced demand trends.",
    },
    candles,
    metrics: {
      pe: Array.from({ length: 5 }, () => Number((20 + (seed % 50)).toFixed(1))),
      roe: Array.from({ length: 5 }, () => Number((0.1 + (seed % 30) / 100).toFixed(2))),
      debtToEquity: Array.from({ length: 5 }, () => Number((0.5 + (seed % 20) / 10).toFixed(1))),
      revenue: Array.from({ length: 5 }, (_, i) => Number((50 + i * 10 + (seed % 50)).toFixed(1))),
      eps: Array.from({ length: 5 }, (_, i) => Number((2 + i * 0.5 + (seed % 5)).toFixed(1))),
      dates: ["2021", "2022", "2023", "2024", "2025"],
    },
  };
}

export function generatePeriodCandles(
  baseCandles: CandlePoint[],
  period: "1D" | "1W" | "1M",
  seed: number
): CandlePoint[] {
  if (period === "1D") {
    // 5 past trading days with 5-min intervals (showing 5 candles for the last trading days)
    return baseCandles.slice(-5).map((candle, idx) => ({
      ...candle,
      label: `Day ${idx + 1}`,
    }));
  } else if (period === "1W") {
    // 5 past trading days with 1-day intervals
    return baseCandles.slice(-5).map((candle, idx) => ({
      ...candle,
      label: `Day ${idx + 1}`,
    }));
  } else if (period === "1M") {
    // All trading days in current calendar month (typically 20-22)
    const daysInMonth = Math.floor(18 + (seed % 6)); // 18-23 trading days in a month
    return Array.from({ length: daysInMonth }, (_, index) => {
      const baseIndex = Math.floor((index / daysInMonth) * baseCandles.length);
      const baseCandle = baseCandles[baseIndex] || baseCandles[baseCandles.length - 1];
      const volatility = (Math.sin(index * 0.5 + seed) * 0.5 + 0.5) * 2;
      const dayNum = index + 1;

      return {
        label: `${dayNum}`,
        open: Number((baseCandle.open + (seed % 10 - 5) * volatility).toFixed(2)),
        high: Number((baseCandle.high + (seed % 15 - 7) * volatility).toFixed(2)),
        low: Number((baseCandle.low - (seed % 15 - 7) * volatility).toFixed(2)),
        close: Number((baseCandle.close + (seed % 10 - 5) * volatility).toFixed(2)),
      };
    });
  }

  return baseCandles;
}