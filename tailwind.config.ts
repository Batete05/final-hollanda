import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        'bowl': ['Bowl', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'sans': ['Barlow', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#f56565",
        background: "#ffffff",
        foreground: "#1a202c",
        primary: {
          DEFAULT: "#ec4630",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ffd700",
          foreground: "#1a202c",
        },
        destructive: {
          DEFAULT: "#e53e3e",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f7fafc",
          foreground: "#718096",
        },
        accent: {
          DEFAULT: "#ffd700",
          foreground: "#1a202c",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1a202c",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1a202c",
        },
        sidebar: {
          DEFAULT: "#fafafa",
          foreground: "#374151",
          primary: "#1f2937",
          "primary-foreground": "#fafafa",
          accent: "#f3f4f6",
          "accent-foreground": "#1f2937",
          border: "#e2e8f0",
          ring: "#3b82f6",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
