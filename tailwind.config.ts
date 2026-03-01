import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0f0f23",
        "diagram-bg": "#1a1a2e",
        correct: "#00d2d3",
        wrong: "#ff6b6b",
        flagged: "#ffd32a",
        "calc-accent": "#0abde3",
        "tutor-accent": "#a29bfe",
        resistor: "#ff9f43",
        capacitor: "#54a0ff",
        inductor: "#5f27cd",
        surface: "#16213e",
        border: "#2a2a4a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
