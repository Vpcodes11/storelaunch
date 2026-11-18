'use client';

import { useState } from 'react';
import {
  Rocket,
  ShieldAlert,
  ShieldCheck,
  Share2,
  CheckCircle2,
  Circle,
  ExternalLink,
  Store,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Search,
  Copy,
  Check,
} from 'lucide-react';

export default function DashboardPage() {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([1, 2]);

  const toggleTask = (day: number) => {
    setCompletedTasks((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const copyToClipboard = (slug: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Quick Store Connect / Status */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-500/10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Active Store Setup
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to your StoreLaunch Command Center
          </h2>
          <p className="mt-2 text-blue-100 text-sm leading-relaxed">
            Track your 7-point store readiness audit, copy platform-tailored launch copy for 40+ channels, and follow your 30-day launch roadmap.
          </p>

          <form
            action="/api/shopify/auth"
            method="GET"
            className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md"
          >
            <input
              type="text"
              name="shop"
              placeholder="connect-another.myshopify.com"
              required
              pattern="^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$"
              className="flex-grow px-4 py-2.5 rounded-xl text-slate-900 text-xs focus:outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <span>Connect Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 4 Core Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Readiness Score</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">85 / 100</div>
            <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-2 inline-block">
              Good • 2 warnings to resolve
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Matched Channels</span>
            <Share2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">34 Channels</div>
            <div className="mt-2 text-xs text-slate-500">Across 4 distribution tiers</div>
            <span className="text-[11px] text-blue-600 font-semibold mt-2 inline-block">
              6 submitted • 28 ready
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>30-Day Launch Plan</span>
            <Rocket className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">Day 3 of 30</div>
            <div className="mt-2 text-xs text-slate-500">Week 1: Pre-Launch Foundation</div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-2 inline-block">
              {completedTasks.length} tasks completed
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Attributed Revenue</span>
            <DollarSign className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">$1,420.00</div>
            <div className="mt-2 text-xs text-slate-500">From 18 organic UTM orders</div>
            <span className="text-[11px] text-purple-600 font-semibold mt-2 inline-block flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Reddit & Pinterest top drivers
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Audit Checklist + Matched Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: 7-Point Audit Checklist (1 col) */}
        <div id="audit" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Store Readiness Diagnostic</h3>
              <p className="text-xs text-slate-500">7-Point Pre-Flight Checks</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
              Score: 85/100
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {[
              { name: 'Primary Product Images', status: 'pass', note: 'All items have images' },
              { name: 'Refund Policy', status: 'pass', note: 'Active and published' },
              { name: 'Shipping Policy', status: 'pass', note: 'Active and published' },
              { name: 'Privacy Policy', status: 'pass', note: 'Active and published' },
              { name: 'Contact Us Page', status: 'pass', note: '/pages/contact verified' },
              { name: 'SEO Meta Titles', status: 'warning', note: '3 products lack 50-char meta titles' },
              { name: 'Social Preview (OG Image)', status: 'warning', note: 'Default og:image tag missing' },
            ].map((check, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
                  check.status === 'pass'
                    ? 'bg-slate-50/70 border-slate-200'
                    : 'bg-amber-50/60 border-amber-200'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {check.status === 'pass' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{check.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{check.note}</p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    check.status === 'pass'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-200/80 text-amber-900'
                  }`}
                >
                  {check.status === 'pass' ? 'Passed' : 'Fix Needed'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Matched Channels & AI Pitch Copy (2 cols) */}
        <div id="channels" className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Matched Distribution Channels</h3>
              <p className="text-xs text-slate-500">Curated launch destinations with tailored ethical copy</p>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              40 Seeded Channels
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {[
              {
                name: 'Google Merchant Center Free Listings',
                tier: 'Tier 1 • Free Feed',
                url: 'https://merchants.google.com',
                match: 98,
                copy: 'Handcrafted Organic Cotton Shirts made with zero synthetic dyes. Free worldwide carbon-neutral shipping on orders over $50.',
                slug: 'gmc',
              },
              {
                name: 'Reddit - r/BuyItForLife',
                tier: 'Tier 2 • Niche Community',
                url: 'https://www.reddit.com/r/BuyItForLife',
                match: 92,
                copy: "We spent 18 months engineering a durable linen button-down with double-stitched French seams and corozo nut buttons. Sharing our manufacturing teardown and material choices.",
                slug: 'reddit-bifl',
              },
              {
                name: 'Thingtesting - New Brand Submission',
                tier: 'Tier 3 • Editorial Pitch',
                url: 'https://thingtesting.com/submit-a-brand',
                match: 88,
                copy: 'StoreLaunch showcases sustainable direct-to-consumer essentials crafted with transparent traceability from seed to stitch.',
                slug: 'thingtesting',
              },
              {
                name: 'Faire Wholesale Brand Application',
                tier: 'Tier 4 • B2B Registry',
                url: 'https://www.faire.com/apply',
                match: 84,
                copy: 'Eco-conscious apparel ready for retail shelves with barcode labeling, retail-ready packaging, and low minimum order quantities.',
                slug: 'faire',
              },
            ].map((chan, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{chan.name}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                        {chan.match}% Match
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">{chan.tier}</span>
                  </div>

                  <a
                    href={chan.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <span>Visit Submission Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed relative group">
                  <p className="pr-12">{chan.copy}</p>
                  <button
                    onClick={() => copyToClipboard(chan.slug, chan.copy)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Copy AI Blurb"
                  >
                    {copiedSlug === chan.slug ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: 30-Day Launch Roadmap */}
      <div id="tasks" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">30-Day Launch Execution Roadmap</h3>
            <p className="text-xs text-slate-500">Step-by-step atomic checklist to achieve your first 100 organic orders</p>
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            {completedTasks.length} of 30 Tasks Completed
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { day: 1, week: 'Week 1', title: 'Complete Store Readiness Audit', desc: 'Fix 3 missing SEO titles and add OpenGraph preview image.' },
            { day: 2, week: 'Week 1', title: 'Setup Google Merchant Center Free Feed', desc: 'Connect Shopify Google sales channel and sync approved catalog items.' },
            { day: 3, week: 'Week 1', title: 'Claim Pinterest Business & Upload Catalog', desc: 'Verify store domain tag and submit primary product data feed.' },
            { day: 4, week: 'Week 1', title: 'Publish Maker Journey on r/EntrepreneurRideAlong', desc: 'Write transparent founder story adhering strictly to community guidelines.' },
            { day: 5, week: 'Week 1', title: 'Submit Brand Profile to Thingtesting', desc: 'Submit founder backstory, sustainability claims, and product photography.' },
            { day: 6, week: 'Week 1', title: 'Apply to Faire Wholesale Marketplace', desc: 'Prepare line sheet, unit margins, and case quantity details.' },
          ].map((task) => {
            const isDone = completedTasks.includes(task.day);
            return (
              <div
                key={task.day}
                onClick={() => toggleTask(task.day)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  isDone
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-slate-50 border-slate-200 hover:border-blue-200'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Day {task.day} • {task.week}
                    </span>
                  </div>
                  <h4
                    className={`text-xs font-bold mt-0.5 ${
                      isDone ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {task.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{task.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
