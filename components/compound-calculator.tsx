"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, DollarSign, Percent, Calendar, PiggyBank, Wallet, RefreshCw } from "lucide-react"
import { GrowthChart } from "./growth-chart"
import { ResultsSummary } from "./results-summary"
import { YearlyBreakdown } from "./yearly-breakdown"

type CompoundFrequency = "annually" | "semi-annually" | "quarterly" | "monthly" | "daily"
type ContributionFrequency = "weekly" | "monthly" | "yearly"

const frequencyMap: Record<CompoundFrequency, number> = {
  annually: 1,
  "semi-annually": 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
}

const contributionPeriodsPerYear: Record<ContributionFrequency, number> = {
  weekly: 52,
  monthly: 12,
  yearly: 1,
}

const contributionLabels: Record<ContributionFrequency, string> = {
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
}

export interface YearlyData {
  year: number
  principal: number
  interest: number
  totalValue: number
  contributions: number
}

export function CompoundCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [contribution, setContribution] = useState(500)
  const [contributionFrequency, setContributionFrequency] = useState<ContributionFrequency>("monthly")
  const [annualRate, setAnnualRate] = useState(8)
  const [years, setYears] = useState(20)
  const [compoundFrequency, setCompoundFrequency] = useState<CompoundFrequency>("monthly")

  const yearlyData = useMemo(() => {
    const n = frequencyMap[compoundFrequency]
    const r = annualRate / 100
    const periodsPerYear = contributionPeriodsPerYear[contributionFrequency]
    const data: YearlyData[] = []

    // Year 1: Initial deposit made at end of year (Dec 31), no interest yet
    // This becomes the opening balance for Year 2
    // Subsequent years: interest accrues on opening balance, contributions added at end of each period

    let runningBalance = 0
    let totalContributed = 0

    for (let year = 1; year <= years; year++) {
      if (year === 1) {
        // Year 1: Initial deposit at end of year, no interest earned yet
        runningBalance = initialInvestment
        totalContributed = initialInvestment
      } else {
        // Years 2+: Opening balance is previous year's closing balance
        // Interest compounds throughout the year on opening balance
        const openingBalance = runningBalance
        
        // Compound interest on the opening balance for the year
        const compoundedOpening = openingBalance * Math.pow(1 + r / n, n)
        
        // Contributions made throughout the year (end of each period)
        // Using ordinary annuity formula for end-of-period payments
        let contributionsWithInterest = 0
        const yearlyContribution = contribution * periodsPerYear
        
        if (r > 0) {
          // Each contribution earns interest for remaining time in year
          // For end-of-period contributions: FV = PMT * [((1 + r/n)^n - 1) / (r/n)]
          const periodicRate = r / periodsPerYear
          contributionsWithInterest = contribution * 
            ((Math.pow(1 + periodicRate, periodsPerYear) - 1) / periodicRate)
        } else {
          contributionsWithInterest = yearlyContribution
        }
        
        runningBalance = compoundedOpening + contributionsWithInterest
        totalContributed += yearlyContribution
      }

      const totalInterest = runningBalance - totalContributed

      data.push({
        year,
        principal: initialInvestment,
        interest: Math.max(0, totalInterest),
        totalValue: runningBalance,
        contributions: totalContributed,
      })
    }

    return data
  }, [initialInvestment, contribution, contributionFrequency, annualRate, years, compoundFrequency])

  const finalData = yearlyData[yearlyData.length - 1]

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Input Controls */}
      <Card className="lg:col-span-1 border-border/50 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-5 w-5" />
            </div>
            Calculator Inputs
          </CardTitle>
          <CardDescription>
            Adjust the parameters to see how your investment grows
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Initial Investment */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="initial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                Initial Investment
              </Label>
              <span className="text-sm font-semibold text-foreground">
                ${initialInvestment.toLocaleString()}
              </span>
            </div>
            <Slider
              id="initial"
              min={0}
              max={100000}
              step={1000}
              value={[initialInvestment]}
              onValueChange={(value) => setInitialInvestment(value[0])}
              className="py-2"
            />
            <Input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="h-10"
            />
          </div>

          {/* Contribution Amount */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="contribution" className="flex items-center gap-2">
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
                {contributionLabels[contributionFrequency]} Contribution
              </Label>
              <span className="text-sm font-semibold text-foreground">
                ${contribution.toLocaleString()}
              </span>
            </div>
            <Slider
              id="contribution"
              min={0}
              max={contributionFrequency === "yearly" ? 50000 : contributionFrequency === "weekly" ? 1000 : 5000}
              step={contributionFrequency === "yearly" ? 500 : contributionFrequency === "weekly" ? 10 : 50}
              value={[contribution]}
              onValueChange={(value) => setContribution(value[0])}
              className="py-2"
            />
            <Input
              type="number"
              value={contribution}
              onChange={(e) => setContribution(Number(e.target.value))}
              className="h-10"
            />
          </div>

          {/* Contribution Frequency */}
          <div className="space-y-3">
            <Label htmlFor="contrib-frequency" className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Contribution Frequency
            </Label>
            <Select
              value={contributionFrequency}
              onValueChange={(value: ContributionFrequency) => setContributionFrequency(value)}
            >
              <SelectTrigger id="contrib-frequency" className="h-10">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Annual Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="rate" className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                Annual Interest Rate
              </Label>
              <span className="text-sm font-semibold text-foreground">{annualRate}%</span>
            </div>
            <Slider
              id="rate"
              min={0}
              max={20}
              step={0.1}
              value={[annualRate]}
              onValueChange={(value) => setAnnualRate(value[0])}
              className="py-2"
            />
            <Input
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              step="0.1"
              className="h-10"
            />
          </div>

          {/* Investment Period */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="years" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
                Investment Period
              </Label>
              <span className="text-sm font-semibold text-foreground">{years} years</span>
            </div>
            <Slider
              id="years"
              min={1}
              max={50}
              step={1}
              value={[years]}
              onValueChange={(value) => setYears(value[0])}
              className="py-2"
            />
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="h-10"
            />
          </div>

          {/* Compound Frequency */}
          <div className="space-y-3">
            <Label htmlFor="frequency" className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              Compound Frequency
            </Label>
            <Select
              value={compoundFrequency}
              onValueChange={(value: CompoundFrequency) => setCompoundFrequency(value)}
            >
              <SelectTrigger id="frequency" className="h-10">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annually">Annually</SelectItem>
                <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="lg:col-span-2 space-y-6">
        <ResultsSummary finalData={finalData} years={years} />
        <GrowthChart data={yearlyData} />
        <YearlyBreakdown data={yearlyData} />
      </div>
    </div>
  )
}
