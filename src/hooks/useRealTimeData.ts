import { useState, useEffect, useRef } from "react";
import { SymbolData, dashboardData, buildFallbackData } from "../data/stocks";

export function useRealTimeData(symbol: string) {
  const normalizedSymbol = symbol.trim().toUpperCase() || "AAPL";
  const prevSymbolRef = useRef(normalizedSymbol);

  const [data, setData] = useState<SymbolData>(() => {
    return dashboardData[normalizedSymbol] ?? buildFallbackData(normalizedSymbol);
  });

  // Update data when symbol changes
  useEffect(() => {
    if (prevSymbolRef.current !== normalizedSymbol) {
      prevSymbolRef.current = normalizedSymbol;
      const newData = dashboardData[normalizedSymbol] ?? buildFallbackData(normalizedSymbol);
      setData(newData);
    }
  }, [normalizedSymbol]);

  // Simulate real-time market updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const change = (Math.random() - 0.5) * 2;
        const newValue = Math.max(0, prevData.marketValue + change);
        const pctChange = ((newValue - prevData.marketValue) / prevData.marketValue) * 100;
        return {
          ...prevData,
          marketValue: Number(newValue.toFixed(2)),
          marketChange: `${change >= 0 ? "+" : ""}${change.toFixed(2)} (${pctChange >= 0 ? "+" : ""}${pctChange.toFixed(2)}%) today`,
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return data;
}