import { CompoundCalculator } from "@/components/compound-calculator"
import { TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">CompoundGrowth</span>
          </div>
          <nav className="hidden sm:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Calculator</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Resources</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border/50 bg-card">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Watch Your Money{" "}
              <span className="text-accent">Grow</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
              Visualize the power of compound interest. See how your investments can grow exponentially over time with regular contributions and the magic of compounding.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="container mx-auto px-4 py-8 lg:py-12">
        <CompoundCalculator />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-foreground">CompoundGrowth</span>
            </div>
            <p className="text-sm text-muted-foreground">
              For educational purposes only. Consult a financial advisor for investment decisions.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
