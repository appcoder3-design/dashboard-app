"use client";

import { useEffect, useRef } from "react";
import {
  AreaSeries,
  CandlestickSeries,
  ColorType,
  HistogramSeries,
  LineSeries,
  createChart,
  type IChartApi,
  type UTCTimestamp,
} from "lightweight-charts";

interface CandlePoint {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

interface CandlestickChartProps {
  candles: CandlePoint[];
  isDarkMode: boolean;
  chartMode?: "candles" | "line" | "area";
  showGrid?: boolean;
  showVolume?: boolean;
}

export default function CandlestickChart({
  candles,
  isDarkMode,
  chartMode = "candles",
  showGrid = true,
  showVolume = true,
}: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const chart = createChart(containerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: isDarkMode ? "#020617" : "#ffffff",
        },
        textColor: isDarkMode ? "#cbd5e1" : "#0f172a",
        fontFamily: "Inter, sans-serif",
      },
      grid: {
        vertLines: {
          color: showGrid ? (isDarkMode ? "#1e293b" : "#e2e8f0") : "transparent",
          style: 1,
        },
        horzLines: {
          color: showGrid ? (isDarkMode ? "#1e293b" : "#e2e8f0") : "transparent",
          style: 1,
        },
      },
      rightPriceScale: {
        borderColor: isDarkMode ? "#334155" : "#cbd5e1",
      },
      timeScale: {
        borderColor: isDarkMode ? "#334155" : "#cbd5e1",
        timeVisible: true,
        secondsVisible: false,
      },
      width: containerRef.current.clientWidth || 640,
      height: 320,
      crosshair: {
        mode: 1,
      },
    });

    const baseEndDate = new Date();
    baseEndDate.setHours(0, 0, 0, 0);

    const priceData = candles.map((candle, index) => {
      const time = new Date(baseEndDate);
      time.setDate(baseEndDate.getDate() - (candles.length - index - 1));

      return {
        time: Math.floor(time.getTime() / 1000) as UTCTimestamp,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
      };
    });

    const volumeData = candles.map((candle, index) => {
      const time = new Date(baseEndDate);
      time.setDate(baseEndDate.getDate() - (candles.length - index - 1));
      return {
        time: Math.floor(time.getTime() / 1000) as UTCTimestamp,
        value: Math.max(1, Math.round(candle.volume ?? candle.close * 110000)),
        color: candle.close >= candle.open ? "rgba(34, 197, 94, 0.45)" : "rgba(239, 68, 68, 0.45)",
      };
    });

    if (chartMode === "line") {
      const series = chart.addSeries(LineSeries, {
        color: isDarkMode ? "#38bdf8" : "#2563eb",
        lineWidth: 2,
      });
      series.setData(priceData.map((item) => ({ time: item.time, value: item.close })));
      chartRef.current = chart;
    } else if (chartMode === "area") {
      const series = chart.addSeries(AreaSeries, {
        topColor: isDarkMode ? "rgba(56, 189, 248, 0.4)" : "rgba(37, 99, 235, 0.28)",
        bottomColor: isDarkMode ? "rgba(56, 189, 248, 0.04)" : "rgba(37, 99, 235, 0.04)",
        lineColor: isDarkMode ? "#38bdf8" : "#2563eb",
        lineWidth: 2,
      });
      series.setData(priceData.map((item) => ({ time: item.time, value: item.close })));
      chartRef.current = chart;
    } else {
      const series = chart.addSeries(CandlestickSeries, {
        upColor: isDarkMode ? "#22c55e" : "#16a34a",
        downColor: isDarkMode ? "#fb7185" : "#dc2626",
        borderVisible: false,
        wickUpColor: isDarkMode ? "#22c55e" : "#16a34a",
        wickDownColor: isDarkMode ? "#fb7185" : "#dc2626",
      });
      series.setData(priceData);
      chartRef.current = chart;
    }

    if (showVolume) {
      const volumeSeries = chart.addSeries(HistogramSeries, {
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "",
      });
      volumeSeries.setData(volumeData);
    }

    chart.timeScale().fitContent();

    const resize = () => {
      chart.applyOptions({ width: containerRef.current?.clientWidth ?? 640 });
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
      chartRef.current = null;
    };
  }, [candles, chartMode, isDarkMode, showGrid, showVolume]);

  return (
    <div
      ref={containerRef}
      className={`h-80 w-full overflow-hidden rounded-[20px] border ${isDarkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"}`}
      role="img"
      aria-label="TradingView-style stock chart"
    />
  );
}