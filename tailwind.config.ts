import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-jakarta)", "system-ui", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Subtle, neutral elevation — no neon glow
        glow: "0 1px 2px rgba(15,23,42,0.06)",
        "glow-lg": "0 4px 16px -4px rgba(15,23,42,0.12)",
        card: "0 1px 3px rgba(15,23,42,0.08), 0 1px 2px -1px rgba(15,23,42,0.06)",
      },
      keyframes: {
        "fly-up": {
          "0%": { transform: "translate(-50%, -50%) scale(0.5)", opacity: "1" },
          "50%": { opacity: "1" },
          "100%": { transform: "translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.5) rotate(var(--r))", opacity: "0" },
        },
      },
      animation: {
        "fly-up": "fly-up 2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
