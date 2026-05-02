"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Wallet, Sparkles, ArrowUpRight } from "lucide-react"
import type { YearlyData } from "./compound-calculator"

interface ResultsSummaryProps {
  finalData: YearlyData
  years: number
}

export function ResultsSummary({ finalData, years }: ResultsSummaryProps) {
  const totalInterestEarned = finalData.interest
  const totalContributions = finalData.contributions
  const finalValue = finalData.totalValue
  const roi = ((finalValue - totalContributions) / totalContributions) * 100

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="relative overflow-hidden border-border/50 shadow-lg bg-primary text-primary-foreground">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-foreground/70">Final Value</p>
              <p className="mt-1 text-2xl font-bold tracking-tight">
                ${finalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="mt-1 text-xs text-primary-foreground/60">
                After {years} years
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-lg">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Contributions</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                ${totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Your investment
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Wallet className="h-6 w-6 text-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-lg">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Interest Earned</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-accent">
                ${totalInterestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Compound growth
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-lg">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total ROI</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-accent">
                {roi.toFixed(1)}%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Return on investment
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <ArrowUpRight className="h-6 w-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
