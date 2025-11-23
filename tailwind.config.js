/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#7C3AED",      // Beautiful Violet - Modern & Professional
          "secondary": "#06B6D4",    // Cyan - Fresh & Energetic
          "accent": "#F59E0B",       // Amber - Highlights/warnings
          "neutral": "#64748B",      // Slate Gray - Text/secondary elements
          "base-100": "#FFFFFF",     // White background
          "base-200": "#F8FAFC",     // Very light gray background
          "base-300": "#E2E8F0",     // Light border color
          "base-content": "#1E293B", // Dark text color for light mode
          "info": "#0EA5E9",         // Sky blue
          "success": "#10B981",      // Emerald
          "warning": "#F59E0B",      // Amber
          "error": "#EF4444",        // Red
        },
        dark: {
          "primary": "#8B5CF6",      // Lighter Violet for dark mode
          "secondary": "#22D3EE",    // Lighter Cyan for dark mode
          "accent": "#FBBF24",       // Lighter Amber for dark mode
          "neutral": "#94A3B8",      // Light slate for dark mode text
          "base-100": "#0F172A",     // Dark slate background
          "base-200": "#1E293B",     // Slightly lighter dark background
          "base-300": "#334155",     // Border color for dark mode
          "base-content": "#F1F5F9", // Light text color for dark mode
          "info": "#38BDF8",         // Sky blue for dark mode
          "success": "#34D399",      // Emerald for dark mode
          "warning": "#FBBF24",      // Amber for dark mode
          "error": "#F87171",        // Red for dark mode
        },
      },
    ],
  },
};
