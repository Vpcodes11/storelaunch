import Link from 'next/link';
import {
  Rocket,
  Shield,
  Zap,
  Package,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  BarChart3,
  Globe2,
  Sparkles,
  Search,
  Check,
  AlertTriangle,
  Store,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Store<span className="text-blue-600">Launch</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#readiness" className="hover:text-blue-600 transition-colors">7-Point Audit</a>
            <a href="#channels" className="hover:text-blue-600 transition-colors">40+ Channels</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2"
            >
              Dashboard
            </Link>
            <a
              href="#connect"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
            >
              Connect Store
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="connect" className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.100),theme(colors.slate.50))]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Shopify Store Launch & Distribution Engine
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
            Launch Your Shopify Store{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Everywhere.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Audit store readiness in seconds, get matched with <strong>40+ curated distribution channels</strong> across 4 tiers, and generate platform-optimized, ethical launch copy to drive your first 100 sales.
          </p>

          {/* Connect Store Input Box */}
          <div className="mt-10 max-w-xl mx-auto">
            <form
              action="/api/shopify/auth"
              method="GET"
              className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl shadow-blue-500/5 border border-slate-200"
            >
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Store className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="shop"
                  placeholder="your-store.myshopify.com"
                  required
                  pattern="^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$"
                  title="Must be in the format your-store.myshopify.com"
                  className="w-full pl-11 pr-4 py-3 text-slate-900 bg-transparent text-sm placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/20 whitespace-nowrap gap-2"
              >
                <span>Start Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-3 text-xs text-slate-500">
              Zero sensitive permissions requested. Read-only catalog, policies, and store information.
            </p>
          </div>

          {/* Distribution Platform Badges */}
          <div className="mt-16 pt-10 border-t border-slate-200/60">
            <p className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-6">
              Launch across high-intent channels & directories
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-600 font-semibold text-sm">
              <span className="flex items-center gap-1.5"><Globe2 className="w-4 h-4 text-blue-500" /> Google Merchant Center</span>
              <span className="flex items-center gap-1.5"><ShoppingBag className="w-4 h-4 text-pink-500" /> Meta & Instagram Shop</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-red-500" /> Pinterest Catalogs</span>
              <span className="flex items-center gap-1.5"><Package className="w-4 h-4 text-slate-800" /> TikTok Shop</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-orange-500" /> Reddit Communities</span>
              <span className="flex items-center gap-1.5"><Store className="w-4 h-4 text-emerald-600" /> Faire & Wholesale</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Features Grid */}
      <section id="features" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              End-to-End Launch Infrastructure
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Everything required to launch without ad waste
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-lg hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                7-Point Store Readiness Audit
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Pre-flight validation engine that scans for missing images, short descriptions, omitted alt text, missing refund/shipping policies, and missing contact pages before Google and Meta reject your feeds.
              </p>
              <ul className="space-y-2 text-xs text-slate-500 font-medium">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600" /> Instant 0-100 score</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600" /> Severity-ranked issues</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-600" /> 1-click fix guidance</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-lg hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                40+ Curated Distribution Channels
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Get matched with 4 tiers of high-intent organic distribution: Shopping Feeds, Niche Subreddits, Editorial Deal Sites (DesiDime, Slickdeals), and Wholesale Registries (Faire, Good On You).
              </p>
              <ul className="space-y-2 text-xs text-slate-500 font-medium">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600" /> Global & Indian market targeting</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600" /> Category-specific filters</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-600" /> Submission rules & guidelines</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-lg hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Ethical AI Copy & UTM Attribution
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Generates platform-tailored submission copy respecting character limits and tone. Strict built-in filters block fake ratings or artificial scarcity, while UTM links track every order back to source.
              </p>
              <ul className="space-y-2 text-xs text-slate-500 font-medium">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Deception-free marketing copy</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Automatic UTM link generator</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Channel revenue tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Point Audit Deep Dive */}
      <section id="readiness" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Pre-Flight Validation
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                The 7-Point Store Readiness Audit
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Most new stores fail not because of product quality, but because their listings get suspended on ad networks or shoppers bounce due to missing trust markers. StoreLaunch audits your store automatically before submitting:
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { title: 'Primary Product Images', desc: 'Guarantees no products go to feeds without high-res imagery (-20 pts).', crit: true },
                  { title: 'Legal & Compliance Policies', desc: 'Checks for active Refund, Shipping, and Privacy policies (-20 pts).', crit: true },
                  { title: 'Contact Us Infrastructure', desc: 'Ensures shoppers and reviewers have a visible direct contact method (-15 pts).', crit: true },
                  { title: 'Comprehensive Descriptions', desc: 'Flags thin copy with under 40 words to improve shopping discovery (-15 pts).', crit: false },
                  { title: 'Image Alt Text Accessibility', desc: 'Identifies missing alt attributes for Google Images and Pinterest (-10 pts).', crit: false },
                  { title: 'SEO Meta Titles & Descriptions', desc: 'Validates 50-60 character keyword-focused meta tags (-10 pts).', crit: false },
                  { title: 'Brand Trust Markers', desc: 'Verifies Favicon and OpenGraph social preview images (-10 pts).', crit: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
                    {item.crit ? (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Readiness Mock Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Store Readiness Status</h3>
                  <p className="text-xs text-slate-500">Live GraphQL synchronization</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-blue-600">85/100</span>
                  <p className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Ready to Launch</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">2 Warnings Detected</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-200/70 text-amber-800">Action Needed</span>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-xs text-amber-800">
                    <li>• 3 products missing SEO meta titles</li>
                    <li>• Missing OpenGraph social preview image</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <span className="text-xs font-bold text-slate-800">Matched Distribution Potential</span>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="text-xl font-bold text-slate-900">7</div>
                      <div className="text-[11px] text-slate-500">Tier 1 Product Feeds</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="text-xl font-bold text-slate-900">12</div>
                      <div className="text-[11px] text-slate-500">Niche Subreddits</div>
                    </div>
                  </div>
                </div>

                <a
                  href="#connect"
                  className="w-full mt-4 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all"
                >
                  Run Audit on Your Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 40+ Channels Breakdown */}
      <section id="channels" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Distribution Blueprint</span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              4 Tiers of High-Intent Channels
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Each channel includes specific submission requirements, tone guidelines, and tailored copy formulas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Tier 1</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Free Shopping Feeds</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Google Merchant Center, Bing Merchant, Pinterest Catalogs, Meta Shop, TikTok Shop, and ONDC.
              </p>
              <span className="text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                High Volume / Passive
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Tier 2</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Niche Communities</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                High-intent communities like r/BuyItForLife, r/IndianFashionAddicts, Indie Hackers, and Quora Spaces.
              </p>
              <span className="text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                Value-First / High Trust
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-2">Tier 3</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Deals & Editorial Pitches</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Deal platforms and editorial submissions: Slickdeals, DesiDime, Thingtesting, Uncrate, and LBB.
              </p>
              <span className="text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                Launch Spikes
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">Tier 4</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Directories & Wholesale</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                B2B & specialized registries: Faire Wholesale, Product Hunt, Good On You, Abillion, and PETA.
              </p>
              <span className="text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                Long-Term Authority
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Transparent Pricing</span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Pay once to launch, or scale monthly
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Dual-currency billing supported via Stripe (USD) and Razorpay (INR).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Plan 1 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Launch Kit</h3>
                <p className="text-xs text-slate-500 mt-1">One-time launch toolkit</p>
                
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900">$19</span>
                  <span className="text-sm font-semibold text-slate-500">/ ₹1,499</span>
                </div>

                <ul className="mt-8 space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> Full 7-Point Store Readiness Audit</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> 40+ Channel matching matrix</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> AI copy generation for Top 10 channels</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> Automated UTM link builder</li>
                </ul>
              </div>

              <a
                href="#connect"
                className="mt-8 block w-full text-center px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Choose Launch Kit
              </a>
            </div>

            {/* Plan 2 - Featured */}
            <div className="p-8 rounded-3xl bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 flex flex-col justify-between relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white rounded-full text-[11px] font-bold tracking-wide uppercase">
                Most Popular
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Done-For-You (DFY)</h3>
                <p className="text-xs text-slate-500 mt-1">Complete setup & submissions</p>
                
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900">$79</span>
                  <span className="text-sm font-semibold text-slate-500">/ ₹5,999</span>
                </div>

                <ul className="mt-8 space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> Everything in Launch Kit</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> Google Merchant Center feed setup</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> Pinterest & Meta catalog syncing</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> Custom legal policies tailored for store</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> Manual directory submissions to 15 sites</li>
                </ul>
              </div>

              <a
                href="#connect"
                className="mt-8 block w-full text-center px-4 py-3 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
              >
                Get DFY Launch
              </a>
            </div>

            {/* Plan 3 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Growth Plan</h3>
                <p className="text-xs text-slate-500 mt-1">Ongoing monthly traction</p>
                
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900">$19</span>
                  <span className="text-sm font-semibold text-slate-500">/ mo (₹1,499)</span>
                </div>

                <ul className="mt-8 space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> Continuous catalog & readiness sync</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> Real-time order revenue attribution</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> 30-Day interactive roadmap progression</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-blue-600" /> Monthly new channel discoveries</li>
                </ul>
              </div>

              <a
                href="#connect"
                className="mt-8 block w-full text-center px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Subscribe to Growth
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">How long does the audit take?</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Under 30 seconds. StoreLaunch connects through Shopify's secure GraphQL API, pulls your catalog and policies, and generates your readiness score immediately.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Do you require admin write permissions on my store?</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                No. We only request read scopes (products, policies, locales, pages, and orders for UTM attribution). We never alter your store theme or customer data without your explicit approval.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Which payment methods do you support?</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                We accept cards, UPI, net banking in INR via Razorpay, and international credit cards / Apple Pay in USD via Stripe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-white font-bold text-base">
            <Rocket className="w-5 h-5 text-blue-500" />
            <span>StoreLaunch</span>
          </div>
          <p>© {new Date().getFullYear()} StoreLaunch. All rights reserved. Not affiliated with Shopify Inc.</p>
          <div className="flex space-x-6">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <a href="#readiness" className="hover:text-white transition-colors">Audit Criteria</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
