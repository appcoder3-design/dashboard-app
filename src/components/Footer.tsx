export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">NewFinanceGuide</h3>
            <p className="text-sm text-slate-400">
              A modern platform for active investors to monitor, analyze, and manage positions with confidence.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Live price action and charts</li>
              <li>Portfolio performance tracking</li>
              <li>Watchlist alerts and management</li>
              <li>Deep financial metrics</li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          <p>&copy; 2026 Stock Dashboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
