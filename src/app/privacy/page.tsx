import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — VANTAGERIG",
  description: "Privacy policy for VANTAGERIG early access waitlist.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-t-bg text-t-text flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] px-5 py-2">
        <div className="flex items-center gap-3 font-mono text-[10px] text-t-dim">
          <span className="text-white font-bold tracking-widest">VANTAGERIG</span>
          <span className="text-[rgba(255,255,255,0.15)]">|</span>
          <span>PRIVACY POLICY</span>
        </div>
        <Link
          href="/"
          className="font-mono text-[10px] text-t-dim hover:text-white transition-colors"
        >
          ← BACK
        </Link>
      </div>

      <main className="flex-1 max-w-2xl mx-auto w-full px-5 pt-14 pb-20">

        <p className="font-mono text-[10px] tracking-[0.3em] text-t-dim mb-8 pb-3 border-b border-[rgba(255,255,255,0.06)]">
          LAST UPDATED: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }).toUpperCase()}
        </p>

        <div className="space-y-10 font-sans text-sm text-t-muted leading-relaxed">

          <section>
            <h2 className="font-mono text-xs text-white font-bold tracking-wider mb-3">[01] WHO WE ARE</h2>
            <p>
              VANTAGERIG is a swing trade analytics tool currently in private beta. This privacy policy explains how we handle the personal information collected through our early access waitlist at this website.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-white font-bold tracking-wider mb-3">[02] WHAT WE COLLECT</h2>
            <p>When you submit a request for early access, we collect:</p>
            <ul className="mt-3 space-y-1.5 list-none">
              <li className="flex gap-2"><span className="text-t-dim font-mono">—</span> Your email address</li>
              <li className="flex gap-2"><span className="text-t-dim font-mono">—</span> The timestamp of your submission</li>
            </ul>
            <p className="mt-3">We do not use cookies, tracking pixels, or any third-party analytics on this page.</p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-white font-bold tracking-wider mb-3">[03] HOW WE USE YOUR DATA</h2>
            <p>
              Your email address is used for one purpose only: to send you a single notification when your early access is ready. We will not send you newsletters, marketing emails, or any other unsolicited communications.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-white font-bold tracking-wider mb-3">[04] DATA SHARING</h2>
            <p>
              We do not sell, rent, trade, or share your personal information with any third parties. Your email is not used for advertising purposes and is not passed to any marketing platforms.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-white font-bold tracking-wider mb-3">[05] DATA RETENTION</h2>
            <p>
              We retain your email address only for as long as necessary to fulfill the purpose above — notifying you when access is available. Once early access has launched and you have been contacted, your data will be deleted within 90 days unless you have created an account.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-white font-bold tracking-wider mb-3">[06] YOUR RIGHTS</h2>
            <p>You have the right to:</p>
            <ul className="mt-3 space-y-1.5 list-none">
              <li className="flex gap-2"><span className="text-t-dim font-mono">—</span> Request access to the data we hold about you</li>
              <li className="flex gap-2"><span className="text-t-dim font-mono">—</span> Request deletion of your email from our waitlist at any time</li>
              <li className="flex gap-2"><span className="text-t-dim font-mono">—</span> Withdraw consent at any time prior to being contacted</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at the email address below. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-white font-bold tracking-wider mb-3">[07] CONTACT</h2>
            <p>
              For any privacy-related requests or questions, reach out to:{" "}
              <a
                href="mailto:mio.degol22@gmail.com"
                className="text-white underline underline-offset-2 hover:text-t-muted transition-colors"
              >
                mio.degol22@gmail.com
              </a>
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-[rgba(255,255,255,0.06)] px-5 py-4">
        <div className="max-w-2xl mx-auto font-mono text-[10px] text-t-dim">
          VANTAGERIG — ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
}
