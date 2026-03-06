import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        t: {
          bg: "#0A0A0F",
          surface: "#111118",
          border: "rgba(255,255,255,0.07)",
          "border-hover": "rgba(232,168,73,0.25)",
          amber: "#E8A849",
          "amber-dim": "#A87830",
          "amber-bright": "#F0B962",
          text: "#E8E6E0",
          muted: "#A8A8B3",
          dim: "#4A4A5A",
          bar: "#2A2A36",
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "bar-fill": "barFill 1.4s ease-out forwards",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        barFill: {
          from: { width: "0%" },
          to: { width: "var(--bar-w)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
