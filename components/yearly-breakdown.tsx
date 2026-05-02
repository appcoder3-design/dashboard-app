"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { YearlyData } from "./compound-calculator"

interface YearlyBreakdownProps {
  data: YearlyData[]
}

export function YearlyBreakdown({ data }: YearlyBreakdownProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const displayData = isExpanded ? data : data.slice(0, 5)

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Year-by-Year Breakdown</CardTitle>
        <CardDescription>
          Deposits made at year-end (Dec 31), becoming next year&apos;s opening balance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-foreground">Year</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Total Contributions</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Interest Earned</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Total Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((row, index) => (
                <TableRow
                  key={row.year}
                  className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                >
                  <TableCell className="font-medium">{row.year}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    ${row.contributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-accent font-medium">
                    ${row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-semibold">
                    ${row.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {data.length > 5 && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show All {data.length} Years
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
