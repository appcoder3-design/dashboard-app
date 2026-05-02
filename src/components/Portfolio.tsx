import { useState, useEffect } from "react";

interface Holding {
  symbol: string;
  shares: number;
  avgCost: number;
}

interface PortfolioData {
  name: string;
  holdings: Holding[];
}

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = window.localStorage.getItem("portfolios");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("");
  const [newSymbol, setNewSymbol] = useState("");
  const [newShares, setNewShares] = useState("");
  const [newCost, setNewCost] = useState("");

  useEffect(() => {
    localStorage.setItem("portfolios", JSON.stringify(portfolios));
  }, [portfolios]);

  const addHolding = () => {
    if (!selectedPortfolio || !newSymbol || !newShares || !newCost) return;
    const shares = parseFloat(newShares);
    const cost = parseFloat(newCost);
    if (isNaN(shares) || isNaN(cost)) return;

    setPortfolios((prev) =>
      prev.map((p) =>
        p.name === selectedPortfolio
          ? {
              ...p,
              holdings: [...p.holdings, { symbol: newSymbol.toUpperCase(), shares, avgCost: cost }],
            }
          : p
      )
    );
    setNewSymbol("");
    setNewShares("");
    setNewCost("");
  };

  const removeHolding = (symbol: string) => {
    setPortfolios((prev) =>
      prev.map((p) =>
        p.name === selectedPortfolio
          ? { ...p, holdings: p.holdings.filter((h) => h.symbol !== symbol) }
          : p
      )
    );
  };

  const createPortfolio = () => {
    const name = prompt("Enter portfolio name:");
    if (name) {
      setPortfolios((prev) => [...prev, { name, holdings: [] }]);
      setSelectedPortfolio(name);
    }
  };

  const currentPortfolio = portfolios.find((p) => p.name === selectedPortfolio);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio Management</h2>
        <button
          onClick={createPortfolio}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Portfolio
        </button>
      </div>

      <div className="flex space-x-4">
        <select
          value={selectedPortfolio}
          onChange={(e) => setSelectedPortfolio(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">Select Portfolio</option>
          {portfolios.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {currentPortfolio && (
        <>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add Holding</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Symbol"
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value)}
                className="border rounded-md px-3 py-2 flex-1"
              />
              <input
                type="number"
                placeholder="Shares"
                value={newShares}
                onChange={(e) => setNewShares(e.target.value)}
                className="border rounded-md px-3 py-2 w-24"
              />
              <input
                type="number"
                placeholder="Avg Cost"
                value={newCost}
                onChange={(e) => setNewCost(e.target.value)}
                className="border rounded-md px-3 py-2 w-24"
              />
              <button
                onClick={addHolding}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-2 text-left">Symbol</th>
                  <th className="px-4 py-2 text-left">Shares</th>
                  <th className="px-4 py-2 text-left">Avg Cost</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPortfolio.holdings.map((holding) => (
                  <tr key={holding.symbol} className="border-t">
                    <td className="px-4 py-2">{holding.symbol}</td>
                    <td className="px-4 py-2">{holding.shares}</td>
                    <td className="px-4 py-2">${holding.avgCost.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => removeHolding(holding.symbol)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}