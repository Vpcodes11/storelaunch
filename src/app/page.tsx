import Link from 'next/link';
import {
  Sparkles,
  Pin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Store,
  Layers,
  Search,
  ExternalLink,
  Heart,
  Share2,
  Bookmark,
  Camera,
  Check,
  Zap,
  Globe2,
  AlertCircle,
  Palette,
  BarChart3,
  Copy,
  Maximize2,
  RotateCw,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-warmnoir-900 selection:bg-pinred-500 selection:text-white relative overflow-hidden font-sans">
      {/* ─────────────────────────────────────────────────────────────────────────────
          HERO SECTION: TRAIN OBSERVATION WINDOW (REFERENCE MATCH)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between bg-warmnoir-950 overflow-hidden shadow-2xl">
        {/* Photorealistic Background: Train Observation Window View */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/train-window-hero.jpg')` }}
        />

        {/* Soft vignette & ambient glass overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />

        {/* Top Floating Glass Navigation (Railroad.ai Style) */}
        <header className="relative z-30 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-pinred-500 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <Pin className="w-4 h-4 fill-pinred-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight leading-none text-white drop-shadow-md">
                Store<span className="text-white/90">Launch</span>
              </span>
              <span className="text-[10px] font-serif italic text-white/80 tracking-widest drop-shadow-sm">
                curated commerce
              </span>
            </div>
          </Link>

          {/* Frosted Glass Navigation Capsule (Direct Reference) */}
          <nav className="hidden md:flex items-center space-x-7 px-6 py-2.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg text-xs font-semibold tracking-wide text-white drop-shadow-sm">
            <a href="#audit" className="hover:text-white/80 transition-colors">7-Point Audit</a>
            <a href="#channels" className="hover:text-white/80 transition-colors">40+ Channels</a>
            <a href="#moodboard" className="hover:text-white/80 transition-colors">Moodboard</a>
            <a href="#roadmap" className="hover:text-white/80 transition-colors">30-Day Plan</a>
            <a href="#pricing" className="hover:text-white/80 transition-colors">Pricing</a>
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white px-3 py-2 hidden sm:block drop-shadow-sm"
            >
              Console
            </Link>
            <a
              href="#connect"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold tracking-wide uppercase text-warmnoir-950 bg-white hover:bg-cream-100 rounded-full shadow-lg transition-all duration-200"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-warmnoir-950" />
            </a>
          </div>
        </header>

        {/* Hero Central Content: Positioned directly inside the center window pane */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center flex flex-col items-center justify-center my-auto">
          {/* Centered Pill Badge (Matches "200+ users onboard" pill from reference) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white text-[11px] font-semibold tracking-wider uppercase mb-6 shadow-md drop-shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>40+ Verified Channels • Free Product Feeds</span>
          </div>

          {/* Primary Hero Headline (Matches Railroad.ai typography & mood) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-[1.08] max-w-3xl">
            Launch in a Constantly{' '}
            <span className="font-serif italic font-normal text-white drop-shadow-md">
              Distracted World
            </span>
          </h1>

          {/* Subtitle with soft frosted glass readability */}
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
            Cut through the noise of empty storefronts and rejected feeds. Audit store readiness in 60 seconds, synchronize across 40+ curated channels, and drive your first 100 sales.
          </p>

          {/* Glassmorphic Domain Input Capsule (Matches input bar in reference) */}
          <div id="connect" className="mt-8 sm:mt-10 w-full max-w-lg">
            <form
              action="/api/shopify/auth"
              method="GET"
              className="p-1.5 sm:p-2 bg-white/25 backdrop-blur-xl border border-white/40 rounded-full shadow-2xl flex flex-col sm:flex-row gap-2 transition-all focus-within:bg-white/35 focus-within:border-white/60"
            >
              <div className="relative flex-grow flex items-center">
                <div className="pl-4 pr-2 text-white/80">
                  <Store className="w-5 h-5 text-white/90" />
                </div>
                <input
                  type="text"
                  name="shop"
                  placeholder="your-store.myshopify.com"
                  required
                  pattern="^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$"
                  title="Format: your-store.myshopify.com"
                  className="w-full py-3 text-white placeholder:text-white/70 bg-transparent text-sm focus:outline-none font-medium"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-white text-warmnoir-950 hover:bg-cream-100 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95 flex-shrink-0"
              >
                <span>Scan Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Trust Markers */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] font-semibold text-white/90 drop-shadow-sm">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> AES-256 Encrypted
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-300" /> Free 7-Point Audit
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Zero Deceptive Claims
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Window Control Badges (Matches reference expand / refresh widget) */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-6 flex items-center justify-between text-white/70 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-white/80 drop-shadow-sm">
              Live Shopify GraphQL &amp; Supabase Connected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#moodboard"
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-md"
              title="Explore Moodboard"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </a>
            <a
              href="#audit"
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-md"
              title="Re-check Audit"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          PINTEREST MASONRY SHOWCASE ("The Launch Board")
          ───────────────────────────────────────────────────────────────────────────── */}
      <section id="moodboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-stone-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-pinred-500 mb-1.5 flex items-center gap-1.5">
              <Pin className="w-3.5 h-3.5 fill-pinred-500" />
              <span>Live Moodboard Preview</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-warmnoir-900">
              The anatomy of a <span className="font-serif italic font-normal text-pinred-500">flawless</span> Shopify launch.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mt-2 md:mt-0 font-medium">
            Everything your store needs to get indexed by search engines, cataloged on Pinterest &amp; Meta, and trusted by first-time shoppers.
          </p>
        </div>

        {/* Masonry Pin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            {/* PIN 1: Product Showcase Pin with Real Lifestyle Photography */}
            <div className="bg-white rounded-4xl p-5 shadow-pin border border-stone-200/70 hover:shadow-pin-hover transition-all duration-300 group">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-stone-100 mb-4 border border-stone-100">
                <img
                  src="/images/green-hills.jpg"
                  alt="Nordic Botanical Sourcing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Pin hover pill button */}
                <div className="absolute top-3.5 right-3.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="px-3 py-1 bg-pinred-500 text-white text-[11px] font-bold rounded-full shadow-md flex items-center gap-1">
                    <Bookmark className="w-3 h-3 fill-white" /> Save Pin
                  </span>
                </div>

                {/* Score badge */}
                <div className="absolute bottom-3.5 left-3.5">
                  <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md text-emerald-800 border border-emerald-200 text-[10px] font-bold rounded-full shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% Feed Ready
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-warmnoir-900 leading-snug">Nordic Botanical Serum</h3>
                  <p className="text-xs text-stone-500 mt-0.5 font-medium">$54.00 USD • Organic Sourcing</p>
                </div>
                <span className="text-xs font-bold text-pinred-500 bg-pinred-500/10 px-2.5 py-1 rounded-full">
                  Tier 1
                </span>
              </div>

              <div className="mt-4 pt-3.5 border-t border-stone-100 text-xs text-stone-600 leading-relaxed font-serif italic">
                &ldquo;Formulated with cold-pressed Arctic cloudberry seed oil and organic squalane. Zero synthetic fragrance.&rdquo;
              </div>
            </div>

            {/* PIN 2: Attributed Revenue Card */}
            <div className="bg-gradient-to-br from-[#1C1917] to-[#292524] text-white rounded-4xl p-6 shadow-pin border border-stone-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> 30-Day Channel Attribution
                </span>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-stone-300">Live</span>
              </div>

              <div className="text-3xl font-extrabold tracking-tight">+$3,490.00</div>
              <p className="text-xs text-stone-400 mt-1">Generated across zero-ad-spend launch channels</p>

              <div className="mt-5 space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-stone-800">
                  <span className="text-stone-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-pinred-500" /> Pinterest Catalogs
                  </span>
                  <span className="font-bold text-white">$1,540</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-stone-800">
                  <span className="text-stone-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Google Merchant Free
                  </span>
                  <span className="font-bold text-white">$1,180</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-stone-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Reddit r/BuyItForLife
                  </span>
                  <span className="font-bold text-white">$770</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            {/* PIN 3: 7-Point Store Readiness Audit Card */}
            <div className="bg-[#FAF7F2] rounded-4xl p-6 shadow-pin border border-stone-300/80">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-terracotta-500">Diagnostic Pass</div>
                  <h3 className="font-serif italic font-bold text-xl text-warmnoir-900">Pre-Flight Audit</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-700 text-sm shadow-xs">
                  98/100
                </div>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200/60">
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Refund &amp; Shipping Policy
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Pass</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200/60">
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Alt Text on All 48 Media
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">100%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200/60">
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Contact Page &amp; Support Form
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200/60">
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> High-Resolution OG Social Image
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">1200x630</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200/60">
                  <span className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Merchant Center Feed Spec
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Approved</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] text-emerald-900 font-medium flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Zero policy suspension risks detected for Google or Meta ad networks.</span>
              </div>
            </div>

            {/* PIN 4: Curated Channels Grid */}
            <div className="bg-white rounded-4xl p-6 shadow-pin border border-stone-200/70">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-warmnoir-900">
                  40+ Curated Channels
                </h4>
                <span className="text-xs text-pinred-500 font-bold">4 Strategic Tiers</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <div className="p-3 bg-cream-100 rounded-2xl border border-stone-200/50 flex flex-col justify-between">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider">Tier 1: Catalogs</span>
                  <span className="mt-1 text-stone-900 font-bold">Google &amp; Pinterest</span>
                </div>
                <div className="p-3 bg-cream-100 rounded-2xl border border-stone-200/50 flex flex-col justify-between">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider">Tier 2: Communities</span>
                  <span className="mt-1 text-stone-900 font-bold">r/BuyItForLife</span>
                </div>
                <div className="p-3 bg-cream-100 rounded-2xl border border-stone-200/50 flex flex-col justify-between">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider">Tier 3: Editorial</span>
                  <span className="mt-1 text-stone-900 font-bold">Thingtesting &amp; LBB</span>
                </div>
                <div className="p-3 bg-cream-100 rounded-2xl border border-stone-200/50 flex flex-col justify-between">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider">Tier 4: Wholesale</span>
                  <span className="mt-1 text-stone-900 font-bold">Faire &amp; Good On You</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            {/* PIN 5: Ethical AI Copywriter Pin */}
            <div className="bg-white rounded-4xl p-6 shadow-pin border border-stone-200/70">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <Sparkles className="w-3.5 h-3.5 text-pinred-500" />
                  <span>Ethical AI Copy Engine</span>
                </div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Filtered</span>
              </div>

              <p className="text-xs text-stone-500 mb-4">
                Platforms ban deceptive reviews and fake scarcity. StoreLaunch enforces strict authenticity:
              </p>

              {/* Bad vs Good comparison */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-950">
                  <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider text-rose-700 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600" /> Blocked Deceptive Claim
                  </div>
                  <p className="line-through opacity-75 font-mono text-[11px]">
                    &ldquo;Rated 4.9/5 stars by 10,000+ happy customers! Hurry, only 2 left in stock!&rdquo;
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-950">
                  <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider text-emerald-700 mb-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Approved Authentic Pitch
                  </div>
                  <p className="font-serif italic text-xs leading-relaxed text-emerald-900">
                    &ldquo;Handcrafted from 100% GOTS certified organic flax linen. Woven in small artisan batches for breathable year-round comfort.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* PIN 6: Pinterest & Observation Window Editorial Card */}
            <div className="relative rounded-4xl overflow-hidden shadow-pin border border-stone-200/80 group aspect-[4/3] bg-stone-900">
              <img
                src="/images/train-window-side.jpg"
                alt="Luxury train observation car"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Pin className="w-4 h-4 text-pinred-500 fill-pinred-500" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/90">
                    The Atelier Journey
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white leading-snug">
                  Curate your arrival on 40+ global channels.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          7-POINT AUDIT SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section id="audit" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-pinred-500">
            Automated Diagnostics
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-warmnoir-900 tracking-tight mt-2">
            The 7-Point <span className="font-serif italic font-normal text-pinred-500">Pre-Flight</span> Audit
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base">
            Google Merchant Center, Pinterest, and Meta Shop suspend 38% of new merchant feeds within 48 hours. StoreLaunch stops rejections before they happen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-pin transition-all">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-50 text-terracotta-500 flex items-center justify-center font-bold text-base mb-4">
              01
            </div>
            <h3 className="font-bold text-base text-warmnoir-900">Legal Policy Integrity</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Verifies dedicated, published Refund, Shipping, and Privacy policies (&gt; 50 words) to pass compliance checks.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-pin transition-all">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-50 text-terracotta-500 flex items-center justify-center font-bold text-base mb-4">
              02
            </div>
            <h3 className="font-bold text-base text-warmnoir-900">Primary Product Images</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Detects any catalog products missing main photography that cause immediate feed rejections.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-pin transition-all">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-50 text-terracotta-500 flex items-center justify-center font-bold text-base mb-4">
              03
            </div>
            <h3 className="font-bold text-base text-warmnoir-900">Accessibility Alt Text</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Audits image alt attributes across your entire catalog to boost Google Images &amp; Pinterest visual search ranking.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-pin transition-all">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-50 text-terracotta-500 flex items-center justify-center font-bold text-base mb-4">
              04
            </div>
            <h3 className="font-bold text-base text-warmnoir-900">SEO Meta Titles</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Flags missing or weak search titles (&lt; 10 characters) and recommends high-intent search keywords.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-pin transition-all">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-50 text-terracotta-500 flex items-center justify-center font-bold text-base mb-4">
              05
            </div>
            <h3 className="font-bold text-base text-warmnoir-900">Description Depth</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Scans product copy word count. Items under 40 words miss key shopping feed attributes and conversion triggers.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-pin transition-all">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-50 text-terracotta-500 flex items-center justify-center font-bold text-base mb-4">
              06
            </div>
            <h3 className="font-bold text-base text-warmnoir-900">Favicon &amp; Social OpenGraph</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Crawls your storefront DOM to ensure brand trust icons and rich social preview cards render when links are shared.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          40+ CURATED CHANNELS BREAKDOWN
          ───────────────────────────────────────────────────────────────────────────── */}
      <section id="channels" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-pinred-500">
            Multi-Tier Omnichannel Reach
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-warmnoir-900 tracking-tight mt-2">
            Where your store will be seen.
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base">
            We seeded 40 verified distribution channels with exact country filters, tone guidelines, and submission links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tier 1 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pinred-500 bg-pinred-500/10 px-2 py-0.5 rounded-full">
                Tier 1 • Feeds
              </span>
              <h3 className="font-extrabold text-lg text-warmnoir-900 mt-3">Free Shopping Feeds</h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">Direct catalog sync without advertising cost.</p>
              
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-center gap-2">✓ Google Merchant Free Listings</li>
                <li className="flex items-center gap-2">✓ Pinterest Catalogs &amp; Pins</li>
                <li className="flex items-center gap-2">✓ Meta Shop (IG &amp; FB)</li>
                <li className="flex items-center gap-2">✓ TikTok Shop Center</li>
                <li className="flex items-center gap-2">✓ YouTube Store Shelf</li>
                <li className="flex items-center gap-2">✓ ONDC Mystore (India)</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-semibold text-stone-400">
              Highest passive conversion volume
            </div>
          </div>

          {/* Tier 2 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-500 bg-terracotta-50 px-2 py-0.5 rounded-full">
                Tier 2 • Communities
              </span>
              <h3 className="font-extrabold text-lg text-warmnoir-900 mt-3">High-Intent Forums</h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">Niche subreddits and founder communities.</p>
              
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-center gap-2">✓ Reddit r/BuyItForLife</li>
                <li className="flex items-center gap-2">✓ Reddit r/IndianFashionAddicts</li>
                <li className="flex items-center gap-2">✓ Reddit r/EDC</li>
                <li className="flex items-center gap-2">✓ Indie Hackers D2C</li>
                <li className="flex items-center gap-2">✓ Quora Topic Spaces</li>
                <li className="flex items-center gap-2">✓ Team-BHP Enthusiasts</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-semibold text-stone-400">
              High domain authority backlinks
            </div>
          </div>

          {/* Tier 3 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage-600 bg-sage-50 px-2 py-0.5 rounded-full">
                Tier 3 • Editorial
              </span>
              <h3 className="font-extrabold text-lg text-warmnoir-900 mt-3">Curations &amp; Deals</h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">Launch features and deal publications.</p>
              
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-center gap-2">✓ Thingtesting Brand Submit</li>
                <li className="flex items-center gap-2">✓ DesiDime New Store Deals</li>
                <li className="flex items-center gap-2">✓ Slickdeals Merchant Self-Promo</li>
                <li className="flex items-center gap-2">✓ Uncrate / Cool Material</li>
                <li className="flex items-center gap-2">✓ Little Black Book (LBB)</li>
                <li className="flex items-center gap-2">✓ Homegrown India Feature</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-semibold text-stone-400">
              Founder story &amp; launch press
            </div>
          </div>

          {/* Tier 4 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                Tier 4 • B2B / Specialty
              </span>
              <h3 className="font-extrabold text-lg text-warmnoir-900 mt-3">Wholesale &amp; Certs</h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">Wholesale marketplaces &amp; directories.</p>
              
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-center gap-2">✓ Faire Wholesale B2B</li>
                <li className="flex items-center gap-2">✓ Product Hunt D2C Launch</li>
                <li className="flex items-center gap-2">✓ Good On You Eco Index</li>
                <li className="flex items-center gap-2">✓ Abillion Cruelty-Free</li>
                <li className="flex items-center gap-2">✓ GoImagine Handcrafted</li>
                <li className="flex items-center gap-2">✓ PETA Brand Registry</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-semibold text-stone-400">
              Long-term boutique retail orders
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          30-DAY LAUNCH PLAN ROADMAP
          ───────────────────────────────────────────────────────────────────────────── */}
      <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-pinred-500">
            A Step-by-Step Blueprint
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-warmnoir-900 tracking-tight mt-2">
            The 30-Day Path to 100 Sales
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base">
            No guesswork. Follow a phased launch roadmap that unlocks higher-tier channels week by week.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-2xl bg-cream-200 text-stone-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                W1
              </span>
              <div>
                <h3 className="font-bold text-base text-warmnoir-900">Week 1: Pre-Flight Integrity &amp; Catalog Feeds</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Run the 7-Point Audit, fix alt text &amp; missing policies, and submit clean product feeds to Google Merchant Center and Pinterest Catalogs.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full self-start sm:self-center">
              Days 1–7
            </span>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-2xl bg-cream-200 text-stone-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                W2
              </span>
              <div>
                <h3 className="font-bold text-base text-warmnoir-900">Week 2: High-Intent Community Seeding</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Deploy tailored, authentic founder stories to targeted subreddits and enthusiast forums using ethical AI blurbs without spamming.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-terracotta-600 bg-terracotta-50 px-3 py-1 rounded-full self-start sm:self-center">
              Days 8–15
            </span>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-2xl bg-cream-200 text-stone-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                W3
              </span>
              <div>
                <h3 className="font-bold text-base text-warmnoir-900">Week 3: Editorial Submissions &amp; Launch Promotions</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Submit press packages to Thingtesting, DesiDime, Slickdeals, and lifestyle blogs with tracking UTM links.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-sage-600 bg-sage-50 px-3 py-1 rounded-full self-start sm:self-center">
              Days 16–23
            </span>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-2xl bg-cream-200 text-stone-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                W4
              </span>
              <div>
                <h3 className="font-bold text-base text-warmnoir-900">Week 4: Wholesale Applications &amp; Attribution Review</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Apply to Faire B2B wholesale, launch on Product Hunt, and analyze which channels drove the highest order volume in your console.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full self-start sm:self-center">
              Days 24–30
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          PRICING SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-pinred-500">
            Straightforward Investment
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-warmnoir-900 tracking-tight mt-2">
            Pricing built for new brands.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            No expensive agency retainers. Choose self-serve or full hands-on launch assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Launch Kit */}
          <div className="bg-white rounded-4xl p-7 border border-stone-200/80 shadow-pin flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Self-Serve</div>
              <h3 className="font-extrabold text-2xl text-warmnoir-900 mt-1">Launch Kit</h3>
              <p className="text-xs text-stone-500 mt-2">Everything needed to audit &amp; submit manually.</p>
              
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-warmnoir-900">$19</span>
                <span className="text-xs text-stone-500 ml-2">USD one-time (₹1,499)</span>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-stone-700">
                <li className="flex items-center gap-2">✓ Full 7-Point Store Audit Scan</li>
                <li className="flex items-center gap-2">✓ Matched Catalog of 40+ Channels</li>
                <li className="flex items-center gap-2">✓ AI-Generated Pitch Copy for All Channels</li>
                <li className="flex items-center gap-2">✓ 30-Day Step-by-Step Task Checklist</li>
                <li className="flex items-center gap-2">✓ UTM Link Generator</li>
              </ul>
            </div>

            <a
              href="#connect"
              className="mt-8 block w-full py-3 text-center bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs uppercase tracking-wider rounded-2.5xl transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Card 2: DFY (Featured) */}
          <div className="bg-warmnoir-900 text-white rounded-4xl p-7 border border-warmnoir-800 shadow-pin-hover flex flex-col justify-between relative transform md:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pinred-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-pinred-500">Concierge</div>
              <h3 className="font-extrabold text-2xl text-white mt-1">Done-For-You</h3>
              <p className="text-xs text-stone-400 mt-2">We handle store policy fixes and initial channel submissions.</p>
              
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-white">$79</span>
                <span className="text-xs text-stone-400 ml-2">USD one-time (₹5,999)</span>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-stone-200">
                <li className="flex items-center gap-2">✓ Everything in Launch Kit</li>
                <li className="flex items-center gap-2">✓ Human Review &amp; Storefront Fixes</li>
                <li className="flex items-center gap-2">✓ Direct Submission to Top 15 Feeds</li>
                <li className="flex items-center gap-2">✓ Pinterest &amp; Google Merchant Setup</li>
                <li className="flex items-center gap-2">✓ Dedicated Launch Specialist Support</li>
              </ul>
            </div>

            <a
              href="#connect"
              className="mt-8 block w-full py-3.5 text-center bg-pinred-500 hover:bg-pinred-600 text-white font-bold text-xs uppercase tracking-wider rounded-2.5xl shadow-md transition-colors"
            >
              Select Concierge
            </a>
          </div>

          {/* Card 3: Growth Monthly */}
          <div className="bg-white rounded-4xl p-7 border border-stone-200/80 shadow-pin flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Continuous</div>
              <h3 className="font-extrabold text-2xl text-warmnoir-900 mt-1">Growth</h3>
              <p className="text-xs text-stone-500 mt-2">Continuous catalog sync &amp; attribution tracking.</p>
              
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-warmnoir-900">$19</span>
                <span className="text-xs text-stone-500 ml-2">/ month (₹1,499)</span>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-stone-700">
                <li className="flex items-center gap-2">✓ Automatic Weekly Re-Scans</li>
                <li className="flex items-center gap-2">✓ Live Order UTM Attribution Dashboard</li>
                <li className="flex items-center gap-2">✓ Fresh Quarterly Communities Added</li>
                <li className="flex items-center gap-2">✓ Priority Email &amp; Chat Support</li>
              </ul>
            </div>

            <a
              href="#connect"
              className="mt-8 block w-full py-3 text-center bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs uppercase tracking-wider rounded-2.5xl transition-colors"
            >
              Subscribe
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          FINAL CALL TO ACTION CARD
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-[#1C1917] via-[#241F1D] to-[#141211] text-white rounded-5xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pinred-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-pinred-500/20 text-pinred-500 flex items-center justify-center mx-auto mb-6">
              <Pin className="w-6 h-6 fill-pinred-500" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to launch your brand to the world?
            </h2>
            <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed">
              Connect your Shopify domain. Get your instant 7-point diagnostic score and access your tailored 40-channel launch blueprint in under 60 seconds.
            </p>

            <div className="mt-8 max-w-md mx-auto">
              <form
                action="/api/shopify/auth"
                method="GET"
                className="p-1.5 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="text"
                  name="shop"
                  placeholder="your-store.myshopify.com"
                  required
                  pattern="^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$"
                  className="w-full px-4 py-3 text-white placeholder:text-stone-400 bg-transparent text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-pinred-500 hover:bg-pinred-600 text-white font-bold text-xs uppercase tracking-wider rounded-2.5xl transition-colors flex-shrink-0"
                >
                  Start Scan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          FOOTER
          ───────────────────────────────────────────────────────────────────────────── */}
      <footer className="py-12 border-t border-stone-200 text-stone-500 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-pinred-500 text-white flex items-center justify-center">
              <Pin className="w-3 h-3 fill-white" />
            </div>
            <span className="font-bold text-stone-900">StoreLaunch</span>
            <span>— The curated Shopify launch engine.</span>
          </div>

          <div className="flex gap-6 font-medium text-stone-600">
            <Link href="/dashboard" className="hover:text-pinred-500 transition-colors">Merchant Console</Link>
            <a href="#audit" className="hover:text-pinred-500 transition-colors">Audit Criteria</a>
            <a href="#channels" className="hover:text-pinred-500 transition-colors">Distribution Channels</a>
            <a href="#pricing" className="hover:text-pinred-500 transition-colors">Pricing</a>
          </div>

          <div>
            &copy; {new Date().getFullYear()} StoreLaunch. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
