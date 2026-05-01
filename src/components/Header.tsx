import { BarChart3, Briefcase, Star } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Stock Dashboard</h1>
          </div>
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("stocks")}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === "stocks"
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Stocks</span>
            </button>
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === "portfolio"
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Portfolio</span>
            </button>
            <button
              onClick={() => setActiveTab("watchlist")}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === "watchlist"
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <Star className="h-4 w-4" />
              <span>Watchlist</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}