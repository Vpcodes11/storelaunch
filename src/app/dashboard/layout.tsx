import Link from 'next/link';
import {
  Rocket,
  LayoutDashboard,
  Share2,
  CheckSquare,
  ShieldCheck,
  Settings,
  ExternalLink,
  Store,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between border-r border-slate-800">
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <Link href="/" className="flex items-center space-x-2 text-white font-extrabold text-lg tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Rocket className="w-4 h-4" />
              </div>
              <span>Store<span className="text-blue-500">Launch</span></span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-600 text-white font-semibold transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </Link>

            <a
              href="#channels"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Matched Channels</span>
            </a>

            <a
              href="#tasks"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              <CheckSquare className="w-4 h-4" />
              <span>30-Day Tasks</span>
            </a>

            <a
              href="#audit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Readiness Audit</span>
            </a>

            <a
              href="#settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white transition-colors text-slate-400"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </a>
          </nav>
        </div>

        {/* Bottom Store Indicator */}
        <div className="p-4 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-white truncate">Connected Store</div>
                <div className="text-[10px] text-slate-400">Sync Active</div>
              </div>
            </div>
            <Link href="/" title="Landing Page" className="text-slate-400 hover:text-white">
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between">
          <h1 className="text-base font-bold text-slate-900">Merchant Launch Console</h1>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync
            </span>
            <Link
              href="/"
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded border border-slate-200"
            >
              Back to Home
            </Link>
          </div>
        </header>

        <div className="p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
