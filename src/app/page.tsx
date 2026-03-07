"use client";

import { useState } from "react";
import Link from "next/link";

const FEATURES = [
  {
    id: "01",
    label: "MARKET REGIME TRACKER",
    desc: "Real-time composite score across trend, volatility, momentum, and breadth. Know what the market is doing before placing a trade.",
    details: [
      {
        heading: "How the Score Works",
        body: "The Regime Score is a 0–100 composite built from four sub-components: Trend (up to 60 pts), Momentum (up to 20 pts), Volatility (up to 20 pts), and Breadth (up to 20 pts). Each component is calculated independently then normalized into a single number that describes the current market environment.",
      },
      {
        heading: "Trend Component (60 pts)",
        body: "Derived from SPY's position relative to its 20-day, 50-day, and 200-day SMAs. The further price is above key averages, the higher the trend score. A market below its 200-day SMA is structurally weak — this component reflects that severity.",
      },
      {
        heading: "Momentum Component (20 pts)",
        body: "Measures QQQ's 10-day rate-of-change. Tech leadership is historically the best leading indicator of broader market strength. Accelerating QQQ momentum pushes this score up; deceleration or negative ROC pulls it down.",
      },
      {
        heading: "Volatility Component (20 pts)",
        body: "An inversion of the VIX. When the VIX is low and compressed, conditions favor continuation — this component is high. When VIX spikes above 20, 25, or 30, the score drops proportionally, flagging elevated risk-off conditions.",
      },
      {
        heading: "Breadth Component (20 pts)",
        body: "Calculated as the percentage of 50 large-cap stocks currently trading above their 50-day SMA. Broad participation above key averages = healthy rally. Narrow breadth even in an up-trending market is a warning sign this component will catch.",
      },
      {
        heading: "Score Interpretation",
        body: "70–100: Bull regime — conditions favor long setups and larger position sizes. 55–70: Cautious Bull — trend intact but weakening; be selective. 40–55: Neutral — choppy, mixed signals; reduce exposure. 25–40: Cautious Bear — risk-off, avoid new longs. 0–25: Bear regime — defensive positioning or short bias.",
      },
      {
        heading: "Regime History",
        body: "Every computed regime score is logged to the database with a timestamp. You can scroll back through history to see exactly when the market shifted regimes — useful for reviewing how your trades correlated with macro conditions.",
      },
      {
        heading: "How to Use It",
        body: "Check the regime score before entering any new swing trade. In Bull regimes, widen your profit targets and size up. In Bear or Cautious Bear regimes, cut size, tighten stops, or sit out entirely. Don't fight the tape — let the score tell you what environment you're operating in.",
      },
    ],
  },
  {
    id: "02",
    label: "PRICE ALERT SYSTEM",
    desc: "Set precise price triggers. Get notified when levels are hit.",
    details: [
      {
        heading: "How It Works",
        body: "Price alerts are persistent triggers tied to specific tickers in your watchlist. You set a target price and direction — above or below — and the system checks live quotes on every polling cycle (every 60 seconds during market hours).",
      },
      {
        heading: "One-Time Trigger Logic",
        body: "Each alert fires exactly once. When the live price crosses your threshold, the alert is marked as triggered in the database and will not fire again. This prevents repeated noise from a price oscillating around your level.",
      },
      {
        heading: "Alert Reset",
        body: "Need to re-arm an alert after it fires? A single reset action clears the triggered flag, making it active again. Useful when you're watching a key level that price might revisit multiple times.",
      },
      {
        heading: "Alert History",
        body: "Every triggered alert is logged with a timestamp. You can review which levels were hit and when — handy for backreferencing your trade decisions and understanding how price reacted at your predefined zones.",
      },
      {
        heading: "How to Use It",
        body: "Set breakout alerts above resistance so you know the moment a setup triggers — without watching the screen. Set support alerts below entry to get an early warning before a stop is hit. Use alerts for earnings levels, gap fills, or any technical level you've identified in your analysis.",
      },
    ],
  },
  {
    id: "03",
    label: "VOLUME ANOMALY DETECTION",
    desc: "Flags abnormal volume spikes on your watchlist in real-time. Spot institutional activity as it happens.",
    details: [
      {
        heading: "How It Works",
        body: "The system tracks intraday hourly volume bars for every ticker in your watchlist. On each polling cycle, it compares the current 1-hour volume bar against the average hourly volume for that ticker. A spike is flagged when the current bar exceeds 1.5× the average.",
      },
      {
        heading: "Why 1.5× Threshold",
        body: "A 50% volume surge above average is statistically significant intraday. It typically signals an institutional order hitting the tape, a news catalyst, or a technical level being tested with conviction. Below this threshold, volume noise makes signals unreliable.",
      },
      {
        heading: "Deduplication Logic",
        body: "Once a volume spike alert fires for a ticker, it will not re-trigger for that same ticker for 30 minutes. This prevents a single high-volume period from generating repeated alerts and keeps your alert feed meaningful rather than cluttered.",
      },
      {
        heading: "What Volume Spikes Signal",
        body: "Institutions move size — and size leaves a footprint. A volume anomaly on a breakout bar confirms real demand. A volume spike on a down bar may indicate distribution. Volume without price movement can signal accumulation or absorption. All of these are worth investigating.",
      },
      {
        heading: "How to Use It",
        body: "Add your swing trade candidates and active positions to the watchlist. When a volume alert fires mid-session, investigate immediately — check the chart, look for news, and see where price is relative to key levels. Volume alerts are your early warning system for moves before they fully develop.",
      },
    ],
  },
  {
    id: "04",
    label: "RELATIVE STRENGTH ANALYSIS",
    desc: "11-sector ETF breakdown showing which areas of the market are expanding or contracting. Plus 28 thematic ETFs to track themes and institutional flow.",
    details: [
      {
        heading: "The 11 SPDR Sector ETFs",
        body: "Full coverage of the S&P 500 via XLF (Financials), XLE (Energy), XLK (Technology), XLV (Health Care), XLI (Industrials), XLC (Communication Services), XLY (Consumer Discretionary), XLP (Consumer Staples), XLRE (Real Estate), XLU (Utilities), and XLB (Materials). Together these sectors account for 100% of S&P 500 market cap.",
      },
      {
        heading: "28 Thematic ETFs",
        body: "Beyond broad sectors, Vantagerig tracks thematic ETFs covering semiconductors, biotech, cybersecurity, clean energy, fintech, cloud computing, aerospace & defense, and more. These let you follow institutional flows into specific high-growth niches before they show up in sector-level data.",
      },
      {
        heading: "Breadth Score Integration",
        body: "The Regime Tracker's Breadth component is calculated by checking what percentage of 50 large-cap stocks are above their 50-day SMA. High breadth means the rally has broad participation — a healthy signal. Narrow breadth even in a rising market is a structural warning.",
      },
      {
        heading: "Identifying Sector Rotation",
        body: "Money constantly rotates between sectors. When defensive sectors (XLP, XLU, XLRE) lead while growth (XLK, XLY) lags, the market is shifting risk-off. When XLF and XLI lead alongside tech, it typically signals a risk-on, expansion phase. Spotting rotation early is where edge is built.",
      },
      {
        heading: "Institutional Flow Ratings",
        body: "Every thematic ETF is scored on a composite Flow Rating from -100 to +100, graded A through F. The score is built from three components: OBV Trend (On-Balance Volume slope over the last 50 days, measuring whether volume is accumulating or distributing), Chaikin Money Flow (21-day CMF, showing whether closing prices are skewing toward the high or low of each bar — a direct proxy for buying vs selling pressure), and Volume Surge (10-day vs 50-day average volume ratio, flagging when short-term activity is abnormally elevated). A positive OBV divergence — where volume accumulates faster than price rises — signals institutional accumulation. The composite weights these 50% / 30% / 20% respectively.",
      },
      {
        heading: "Flow Grade Interpretation",
        body: "A (70–100): Strong institutional accumulation — money is flowing in with conviction. B (40–69): Positive flow bias, moderate accumulation. C (10–39): Neutral, no clear directional pressure. D (-20–9): Mild distribution, institutions reducing exposure. F (below -20): Heavy distribution — clear selling pressure from large players.",
      },
      {
        heading: "How to Use It",
        body: "Scan the sector view at the start of each trading day to identify which sectors are showing relative strength and the strongest Flow grades. Align your swing trade candidates to leading sectors with A or B flow — buying strong names in sectors where institutions are actively accumulating dramatically improves your odds. Avoid new longs in sectors with D or F flow grades regardless of how the chart looks.",
      },
    ],
  },
  {
    id: "05",
    label: "TRADE WATCHLIST",
    desc: "Track your setups with live quotes, SMA data, and OHLC charts. Built for position management.",
    details: [
      {
        heading: "Live Quotes",
        body: "Price data refreshes every 60 seconds during market hours (9:30–16:00 ET) and every 5 minutes after close. You always have a current snapshot of where every name on your list is trading — without opening a brokerage platform.",
      },
      {
        heading: "SMA Data",
        body: "20-day and 50-day simple moving averages are displayed alongside each quote. At a glance you can see whether a name is above or below key averages, how far extended it is, or whether it's pulling back into a buyable zone — critical context for swing trade timing.",
      },
      {
        heading: "OHLC Candlestick Charts",
        body: "Each ticker on the watchlist has an embedded OHLC chart showing recent price action. You can review daily candles, identify patterns, and assess structure without leaving the terminal. Built for rapid review across a large list of candidates.",
      },
      {
        heading: "Closed Trades Log",
        body: "When you exit a position, log the trade as closed. The closed trades history gives you a record of completed swings — entry price, exit price, and the ticker. Over time this becomes a ledger of your performance, useful for reviewing what setups and conditions produce results.",
      },
      {
        heading: "Position Management Focus",
        body: "The watchlist is intentionally designed for managing 10–30 open setups simultaneously. Each row surfaces the most critical data — current price, SMA relationship, and chart — in a compact format.",
      },
      {
        heading: "How to Use It",
        body: "Add tickers as you identify setups during your pre-market or nightly scan. Monitor them during the session using the live feed and volume alerts. When a setup triggers, your price alert fires. When a position is closed, log it. The watchlist is the operational core of your entire trading workflow.",
      },
    ],
  },
];

function StatusBar() {
  return (
    <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] px-5 py-2">
      <div className="flex items-center gap-3 font-mono text-[10px] text-t-dim">
        <span className="text-white font-bold tracking-widest">VANTAGERIG</span>
        <span className="text-[rgba(255,255,255,0.15)]">|</span>
        <span>TERMINAL v0.1</span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[10px] text-t-dim">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          PRE-RELEASE
        </span>
        <span className="hidden sm:inline">ACCESS RESTRICTED</span>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [openFeatures, setOpenFeatures] = useState<Set<string>>(new Set());

  function toggleFeature(id: string) {
    setOpenFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) { setMessage("Please agree to the Privacy Policy before submitting."); setStatus("error"); return; }
    if (!email.trim() || status === "loading" || status === "success") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection error. Try again.");
    }
  }

  return (
    <div className="relative min-h-screen bg-t-bg flex flex-col text-t-text" style={{ zIndex: 1 }}>

      {/* Full-page streak background — fixed so it never clips */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-30%", left: "3%",
          width: "280px", height: "160%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,200,120,0.09) 35%, rgba(255,200,120,0.14) 50%, rgba(255,200,120,0.09) 65%, transparent 100%)",
          filter: "blur(50px)", transform: "rotate(8deg)",
          animation: "streakDrift1 14s ease-in-out infinite", willChange: "transform",
        }} />
        <div style={{
          position: "absolute", top: "-40%", left: "40%",
          width: "200px", height: "180%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,215,140,0.07) 30%, rgba(255,200,120,0.12) 50%, rgba(255,215,140,0.07) 70%, transparent 100%)",
          filter: "blur(60px)", transform: "rotate(8deg)",
          animation: "streakDrift2 19s ease-in-out infinite", willChange: "transform",
        }} />
        <div style={{
          position: "absolute", top: "-20%", left: "70%",
          width: "180px", height: "150%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(240,185,110,0.07) 30%, rgba(255,200,120,0.11) 55%, rgba(240,185,110,0.07) 75%, transparent 100%)",
          filter: "blur(45px)", transform: "rotate(8deg)",
          animation: "streakDrift3 11s ease-in-out infinite", willChange: "transform",
        }} />
      </div>

      <StatusBar />

      <main className="relative flex-1 flex flex-col max-w-4xl mx-auto w-full px-5 pt-16 pb-20 md:pt-24" style={{ zIndex: 1 }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative mb-20 animate-slide-up">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-t-dim border border-[rgba(255,255,255,0.08)] px-3 py-1 mb-6 rounded-full">
            <span className="inline-block h-1 w-1 bg-white rounded-full" />
            PRIVATE BETA
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-5" style={{ fontFamily: "var(--font-outfit)" }}>
            VANTAGERIG
          </h1>

          {/* Tagline */}
          <p className="font-sans text-lg md:text-xl text-t-muted leading-relaxed max-w-lg mb-8">
            Institutional-grade swing trade analytics for independent traders.
            Regime scoring, alerts, and sector breadth — in one terminal.
          </p>

          {/* Email CTA */}
          {status === "success" ? (
            <div className="border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.04)] px-5 py-4 rounded-2xl max-w-md">
              <p className="font-sans text-white font-medium">You&apos;re on the list.</p>
              <p className="font-sans text-sm text-t-muted mt-0.5">We&apos;ll reach out when your access is ready.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={status === "loading"}
                  className="w-full bg-t-surface border border-[rgba(255,255,255,0.1)] focus:border-[rgba(255,255,255,0.4)] focus:outline-none transition-colors font-sans text-sm text-t-text placeholder:text-t-dim px-4 py-3 rounded-xl disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="bg-white hover:bg-[#E8E6E0] text-[#0A0A0F] font-sans font-semibold text-sm px-6 py-3 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
              >
                {status === "loading" ? "Submitting…" : "Request Access"}
              </button>
            </form>
          )}

          {/* Privacy consent */}
          {status !== "success" && (
            <label className="flex items-start gap-2.5 mt-3 cursor-pointer group max-w-md">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 shrink-0 accent-white"
              />
              <span className="font-sans text-xs text-t-dim leading-relaxed group-hover:text-t-muted transition-colors">
                I agree to the{" "}
                <Link href="/privacy" className="text-white underline underline-offset-2 hover:text-t-muted transition-colors">
                  Privacy Policy
                </Link>
                . I understand I will only receive one email when my access is ready.
              </span>
            </label>
          )}

          {status === "error" && (
            <p className="font-sans text-sm text-red-400 mt-2">{message}</p>
          )}

          {/* Social proof */}
          <p className="font-sans text-xs text-t-dim mt-3">
            Built by an active swing trader.
          </p>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section className="animate-fade-in">
          <p className="font-mono text-[10px] tracking-[0.3em] text-white mb-5 pb-3 border-b border-[rgba(255,255,255,0.06)]">
            WHAT&apos;S INSIDE
          </p>

          <div className="flex flex-col gap-2">
            {FEATURES.map((f) => {
              const isOpen = openFeatures.has(f.id);
              return (
                <div
                  key={f.id}
                  className="bg-t-surface border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden transition-colors"
                  style={{ borderColor: isOpen ? "rgba(255,255,255,0.14)" : undefined }}
                >
                  {/* Header / clickable row */}
                  <button
                    onClick={() => toggleFeature(f.id)}
                    className="w-full flex items-center gap-3 p-5 text-left hover:bg-[rgba(255,255,255,0.03)] transition-colors group"
                  >
                    <span className="font-mono text-[10px] text-[rgba(255,255,255,0.3)] shrink-0">
                      [{f.id}]
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-white font-bold tracking-wider mb-1">
                        {f.label}
                      </p>
                      <p className="font-sans text-sm text-t-muted leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                    {/* Expand indicator */}
                    <span className="font-mono text-[11px] text-[rgba(255,255,255,0.3)] shrink-0 ml-2 group-hover:text-[rgba(255,255,255,0.6)] transition-colors">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* Dropdown body */}
                  {isOpen && (
                    <div className="border-t border-[rgba(255,255,255,0.06)] px-5 pb-5 pt-4">
                      <div className="flex flex-col gap-4 pl-7">
                        {f.details.map((d, i) => (
                          <div key={i}>
                            <p className="font-mono text-[10px] tracking-widest text-[rgba(255,255,255,0.5)] mb-1.5 uppercase">
                              {d.heading}
                            </p>
                            <p className="font-sans text-sm text-t-muted leading-relaxed">
                              {d.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] px-5 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between font-mono text-[10px] text-t-dim">
          <span>VANTAGERIG — ALL RIGHTS RESERVED</span>
          <span>STATUS: <span className="text-[rgba(255,255,255,0.5)]">PRE-RELEASE</span></span>
        </div>
      </footer>
    </div>
  );
}
