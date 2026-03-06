import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "VANTAGERIG — Early Access",
  description:
    "Institutional-grade swing trade analytics. Market regime tracking, price alerts, volume anomaly detection, and sector breadth analysis. Request early access.",
  openGraph: {
    title: "VANTAGERIG — Early Access",
    description:
      "Institutional-grade swing trade analytics. Request early access.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
