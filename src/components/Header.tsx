export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 text-sm font-bold">
              S
            </span>
            <h1 className="text-2xl font-bold">Stock Dashboard</h1>
          </div>
          <nav className="flex space-x-8">
            <span className="px-3 py-2 rounded-md text-sm font-medium text-white">Stocks</span>
            <span className="px-3 py-2 rounded-md text-sm font-medium text-white">Portfolio</span>
            <span className="px-3 py-2 rounded-md text-sm font-medium text-white">Watchlist</span>
          </nav>
        </div>
      </div>
    </header>
  );
}