import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // gurukul.org palette — exact from events page
        gurukulOrg: {
          maroon: "#CC0000",
          maroonDark: "#a00000",
          secondary: "#EFF2F6",
          black: "#212529",
          light: "#fcfcfd",
          gray: "#ced4da",
          muted: "#6c757d",
          border: "#e9ecef",
        },
        apple: {
          bg: "#ffffff",
          gray: "#EFF2F6",
          dark: "#212529",
          muted: "#6c757d",
          border: "#e9ecef",
          blue: "#CC0000",
          blueHover: "#a00000",
        },
        gurukul: {
          saffron: {
            50: "#fff5f5",
            100: "#ffe3e3",
            200: "#ffc9c9",
            300: "#ffa8a8",
            400: "#ff8787",
            500: "#CC0000",
            600: "#a00000",
            700: "#800000",
            800: "#660000",
            900: "#4d0000",
          },
          gold: {
            50: "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#f59e0b",
            600: "#d97706",
            700: "#b45309",
            800: "#92400e",
            900: "#78350f",
          },
          navy: {
            50: "#EFF2F6",
            100: "#dee2e6",
            200: "#ced4da",
            300: "#adb5bd",
            400: "#868e96",
            500: "#495057",
            600: "#343a40",
            700: "#212529",
            800: "#1a1d20",
            900: "#0f0f0f",
            950: "#000000",
          }
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        display: ["var(--font-outfit)", "-apple-system", "BlinkMacSystemFont", "SF Pro Display", "Helvetica Neue", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 25px rgba(0, 113, 227, 0.15)',
      },
      borderRadius: {
        'apple': '18px',
        'apple-lg': '28px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
