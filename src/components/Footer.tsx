export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stock Dashboard</h3>
            <p className="text-sm">
              Comprehensive stock analysis platform for informed investing decisions.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>Real-time Charts</li>
              <li>Portfolio Tracking</li>
              <li>Watchlist Management</li>
              <li>Financial Metrics</li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm">
          <p>&copy; 2026 Stock Dashboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}