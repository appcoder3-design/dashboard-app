import { useState, useEffect, useRef } from "react";
import { SymbolData, dashboardData, buildFallbackData } from "../data/stocks";

export function useRealTimeData(symbol: string) {
  const normalizedSymbol = symbol.trim().toUpperCase() || "AAPL";
  const prevSymbolRef = useRef(normalizedSymbol);

  const [data, setData] = useState<SymbolData>(() => {
    return dashboardData[normalizedSymbol] ?? buildFallbackData(normalizedSymbol);
  });

  useEffect(() => {
    if (prevSymbolRef.current !== normalizedSymbol) {
      prevSymbolRef.current = normalizedSymbol;
      const newData = dashboardData[normalizedSymbol] ?? buildFallbackData(normalizedSymbol);
      setData(newData);
    }
  }, [normalizedSymbol]);

  useEffect(() => {
    let isActive = true;

    async function loadStockData() {
      try {
        const response = await fetch(`/api/stock?symbol=${encodeURIComponent(normalizedSymbol)}`);

        if (!response.ok) {
          throw new Error("Unable to load stock data");
        }

        const nextData = (await response.json()) as SymbolData;

        if (isActive) {
          setData(nextData);
        }
      } catch {
        if (isActive) {
          setData(dashboardData[normalizedSymbol] ?? buildFallbackData(normalizedSymbol));
        }
      }
    }

    loadStockData();

    return () => {
      isActive = false;
    };
  }, [normalizedSymbol]);

  return data;
}