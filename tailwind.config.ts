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
        "electric-blue": "#3B82F6",
        "coral-red": "#FF5733",
        "light-blue": "#EBF4FF",
        "bright-teal": "#1ABC9C",
        "custom-bg": "#F4F6F8",
        "custom-text": "#1D2226",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F4F6F8",
        foreground: "#1D2226",
        primary: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#EBF4FF",
          foreground: "#1D2226",
        },
        accent: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
        },
        highlight: {
          DEFAULT: "#1ABC9C",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Bricolage Grotesque", "Inter", "system-ui", "sans-serif"],
        heading: ["Bricolage Grotesque", "Inter", "system-ui", "sans-serif"],
        body: ["Bricolage Grotesque", "Inter", "system-ui", "sans-serif"],
        clash: ["Bricolage Grotesque", "Inter", "system-ui", "sans-serif"],
        cabinet: ["Bricolage Grotesque", "Inter", "system-ui", "sans-serif"],
        europa: ["Bricolage Grotesque", "Inter", "system-ui", "sans-serif"],
        bricolage: ["Bricolage Grotesque", "Inter", "system-ui", "sans-serif"],
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
