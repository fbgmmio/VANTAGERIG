"use client";

import { useState } from "react";
import Link from "next/link";

const FEATURES = [
  {
    id: "01",
    label: "MARKET REGIME TRACKER",
    desc: "Real-time composite score across trend, volatility, momentum, and breadth. Know what the market is doing before placing a trade.",
  },
  {
    id: "02",
    label: "PRICE ALERT SYSTEM",
    desc: "Set precise price triggers. Get notified when levels are hit.",
  },
  {
    id: "03",
    label: "VOLUME ANOMALY DETECTION",
    desc: "Flags abnormal volume spikes on your watchlist in real-time. Spot institutional activity as it happens.",
  },
  {
    id: "04",
    label: "SECTOR BREADTH ANALYSIS",
    desc: "11-sector ETF breakdown showing which areas of the market are expanding or contracting. Plus 28 thematic ETFs to track themes and institutional flow.",
  },
  {
    id: "05",
    label: "SWING TRADE WATCHLIST",
    desc: "Track your setups with live quotes, SMA data, and OHLC charts. Built for position management.",
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
          background: "linear-gradient(to bottom, transparent 0%, rgba(232,168,73,0.18) 35%, rgba(232,168,73,0.28) 50%, rgba(232,168,73,0.18) 65%, transparent 100%)",
          filter: "blur(50px)", transform: "rotate(8deg)",
          animation: "streakDrift1 14s ease-in-out infinite", willChange: "transform",
        }} />
        <div style={{
          position: "absolute", top: "-40%", left: "40%",
          width: "200px", height: "180%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,190,80,0.14) 30%, rgba(232,168,73,0.24) 50%, rgba(255,190,80,0.14) 70%, transparent 100%)",
          filter: "blur(60px)", transform: "rotate(8deg)",
          animation: "streakDrift2 19s ease-in-out infinite", willChange: "transform",
        }} />
        <div style={{
          position: "absolute", top: "-20%", left: "70%",
          width: "180px", height: "150%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(200,140,50,0.14) 30%, rgba(232,168,73,0.22) 55%, rgba(200,140,50,0.14) 75%, transparent 100%)",
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FEATURES.map((f) => (
              <div
                key={f.id}
                className="group bg-t-surface hover:bg-[rgba(255,255,255,0.05)] transition-colors p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-[rgba(255,255,255,0.3)] mt-0.5 shrink-0">
                    [{f.id}]
                  </span>
                  <div>
                    <p className="font-mono text-xs text-white font-bold tracking-wider mb-1.5">
                      {f.label}
                    </p>
                    <p className="font-sans text-sm text-t-muted leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
