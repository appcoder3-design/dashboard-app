import { useState, useEffect } from "react";

interface WatchlistItem {
  symbol: string;
  alertPrice?: number;
}

export default function Watchlist() {
  const [watchlists, setWatchlists] = useState<Record<string, WatchlistItem[]>>({});
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>("");
  const [newSymbol, setNewSymbol] = useState("");
  const [newAlertPrice, setNewAlertPrice] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("watchlists");
    if (saved) {
      setWatchlists(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlists", JSON.stringify(watchlists));
  }, [watchlists]);

  const createWatchlist = () => {
    const name = prompt("Enter watchlist name:");
    if (name && !watchlists[name]) {
      setWatchlists((prev) => ({ ...prev, [name]: [] }));
      setSelectedWatchlist(name);
    }
  };

  const addToWatchlist = () => {
    if (!selectedWatchlist || !newSymbol) return;
    const alertPrice = newAlertPrice ? parseFloat(newAlertPrice) : undefined;
    setWatchlists((prev) => ({
      ...prev,
      [selectedWatchlist]: [
        ...prev[selectedWatchlist],
        { symbol: newSymbol.toUpperCase(), alertPrice },
      ],
    }));
    setNewSymbol("");
    setNewAlertPrice("");
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlists((prev) => ({
      ...prev,
      [selectedWatchlist]: prev[selectedWatchlist].filter((item) => item.symbol !== symbol),
    }));
  };

  const currentWatchlist = watchlists[selectedWatchlist] || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Watchlist Management</h2>
        <button
          onClick={createWatchlist}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Watchlist
        </button>
      </div>

      <div className="flex space-x-4">
        <select
          value={selectedWatchlist}
          onChange={(e) => setSelectedWatchlist(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">Select Watchlist</option>
          {Object.keys(watchlists).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {selectedWatchlist && (
        <>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add to Watchlist</h3>
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
                placeholder="Alert Price (optional)"
                value={newAlertPrice}
                onChange={(e) => setNewAlertPrice(e.target.value)}
                className="border rounded-md px-3 py-2 w-32"
              />
              <button
                onClick={addToWatchlist}
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
                  <th className="px-4 py-2 text-left">Alert Price</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentWatchlist.map((item) => (
                  <tr key={item.symbol} className="border-t">
                    <td className="px-4 py-2">{item.symbol}</td>
                    <td className="px-4 py-2">
                      {item.alertPrice ? `$${item.alertPrice.toFixed(2)}` : "None"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => removeFromWatchlist(item.symbol)}
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