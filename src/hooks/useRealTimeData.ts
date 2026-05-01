import { useState, useEffect } from "react";
import { SymbolData, dashboardData, buildFallbackData } from "../data/stocks";

export function useRealTimeData(symbol: string) {
  const [data, setData] = useState<SymbolData>(() => {
    const normalizedSymbol = symbol.trim().toUpperCase() || "AAPL";
    return dashboardData[normalizedSymbol] ?? buildFallbackData(normalizedSymbol);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
        const newValue = Math.max(0, prevData.marketValue + change);
        const pctChange = ((newValue - prevData.marketValue) / prevData.marketValue) * 100;
        return {
          ...prevData,
          marketValue: Number(newValue.toFixed(2)),
          marketChange: `${change >= 0 ? "+" : ""}${change.toFixed(2)} (${pctChange >= 0 ? "+" : ""}${pctChange.toFixed(2)}%) today`,
        };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return data;
}