"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { YearlyData } from "./compound-calculator"

interface GrowthChartProps {
  data: YearlyData[]
}

export function GrowthChart({ data }: GrowthChartProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value}`
  }

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-card p-4 shadow-xl">
          <p className="mb-2 text-sm font-semibold text-foreground">Year {label}</p>
          <div className="space-y-1.5">
            {payload.reverse().map((entry) => (
              <div key={entry.dataKey} className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-muted-foreground capitalize">
                    {entry.dataKey === "contributions" ? "Contributions" : "Interest"}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  ${entry.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Investment Growth Over Time</CardTitle>
        <CardDescription>
          See how your money compounds year by year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.15 0.02 260)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="oklch(0.15 0.02 260)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.18 145)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="oklch(0.65 0.18 145)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.01 90)" />
              <XAxis
                dataKey="year"
                tick={{ fill: "oklch(0.45 0.01 260)", fontSize: 12 }}
                tickLine={{ stroke: "oklch(0.88 0.01 90)" }}
                axisLine={{ stroke: "oklch(0.88 0.01 90)" }}
                label={{ value: "Years", position: "insideBottom", offset: -5, fill: "oklch(0.45 0.01 260)" }}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fill: "oklch(0.45 0.01 260)", fontSize: 12 }}
                tickLine={{ stroke: "oklch(0.88 0.01 90)" }}
                axisLine={{ stroke: "oklch(0.88 0.01 90)" }}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value: string) => (
                  <span className="text-sm text-foreground capitalize">{value}</span>
                )}
              />
              <Area
                type="monotone"
                dataKey="contributions"
                stackId="1"
                stroke="oklch(0.15 0.02 260)"
                fill="url(#colorContributions)"
                strokeWidth={2}
                name="Contributions"
              />
              <Area
                type="monotone"
                dataKey="interest"
                stackId="1"
                stroke="oklch(0.65 0.18 145)"
                fill="url(#colorInterest)"
                strokeWidth={2}
                name="Interest"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
