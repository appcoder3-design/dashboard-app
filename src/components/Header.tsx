export default function Header() {
  return (
    <header className="bg-slate-950 text-slate-100 shadow-[0_25px_80px_-42px_rgba(15,23,42,0.85)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-base font-bold text-slate-950 shadow-lg shadow-emerald-500/20">
              S
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">NewFinanceGuide</h1>
              <p className="text-sm text-slate-400">Real-time analytics for smarter trading and portfolio decisions.</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-300">
            <a href="#" className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-emerald-400 hover:text-white">Stocks</a>
            <a href="#" className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-emerald-400 hover:text-white">Portfolio</a>
            <a href="#" className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-emerald-400 hover:text-white">Watchlist</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
