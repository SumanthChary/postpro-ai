
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "electric-purple": "#8E44AD",
        "coral-red": "#FF5733",
        "light-lavender": "#EAE2F8",
        "bright-teal": "#1ABC9C",
        "custom-bg": "#F4F6F8",
        "custom-text": "#1D2226",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F4F6F8",
        foreground: "#1D2226",
        primary: {
          DEFAULT: "#8E44AD",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#EAE2F8",
          foreground: "#1D2226",
        },
        accent: {
          DEFAULT: "#FF5733",
          foreground: "#FFFFFF",
        },
        highlight: {
          DEFAULT: "#1ABC9C",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Aeonik Grotesque", "system-ui", "sans-serif"],
        heading: ["Aeonik Grotesque", "system-ui", "sans-serif"],
        body: ["Aeonik Grotesque", "system-ui", "sans-serif"],
        clash: ["Aeonik Grotesque", "system-ui", "sans-serif"],
        cabinet: ["Aeonik Grotesque", "system-ui", "sans-serif"],
        europa: ["Aeonik Grotesque", "system-ui", "sans-serif"],
        aeonik: ["Aeonik Grotesque", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
