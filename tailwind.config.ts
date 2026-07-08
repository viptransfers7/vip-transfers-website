import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#090a0b",
        charcoal: "#151718",
        graphite: "#2c3031",
        ivory: "#f7f1e6",
        paper: "#fbfaf6",
        champagne: "#c6a76a",
        bronze: "#9a7b41",
        sage: "#60746b",
        wine: "#6f3f43",
        fog: "#ede9df"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Pretendard", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-price-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(9, 10, 11, 0.12)",
        quiet: "0 16px 50px rgba(9, 10, 11, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
