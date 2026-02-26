import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#895af6",
        "brand-black": "#050505",
        "brand-purple": "#8B5CF6",
        "brand-dark-purple": "#2D1B69",
        "background-dark": "#050308",
        "background-light": "#f6f5f8",
        "surface-dark": "#0d0a14",
        "accent-dark": "#16121f",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "fade-up": "fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-dot": "pulseDot 2s infinite",
        "typing-dots": "typingDots 1.4s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotateX(10deg) rotateY(-5deg)" },
          "50%": { transform: "translateY(-20px) rotateX(12deg) rotateY(-3deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 6px rgba(34, 197, 94, 0)" },
          "100%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(34, 197, 94, 0)" },
        },
        typingDots: {
          "0%, 20%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
