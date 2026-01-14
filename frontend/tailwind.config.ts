import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'glow-purple': '0 0 15px rgba(168, 85, 247, 0.4)',
        'glow-purple-lg': '0 0 25px rgba(168, 85, 247, 0.5)',
      },
      colors: {
        sidebar: {
          background: 'hsl(240 10% 4%)',
          foreground: 'hsl(240 5% 65%)',
          border: 'hsl(240 13% 14%)',
          accent: 'hsl(270 100% 60%)',
        },
        card: 'hsl(240 13% 12%)',
        background: 'hsl(240 10% 4%)',
        foreground: 'hsl(0 0% 100%)',
        // Adding accent and muted to support the logic in your components
        accent: {
          DEFAULT: 'hsl(270 100% 60%)',
          foreground: 'hsl(0 0% 100%)',
        },
        muted: {
          DEFAULT: 'hsl(240 5% 65%)',
          foreground: 'hsl(240 5% 45%)',
        },
      },
      // Added animations to support your transitions
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        }
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out forwards",
        "slide-in": "slide-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;