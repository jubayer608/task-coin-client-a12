/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        microtasktheme: {
          "primary": "#3B82F6",   // Blue - Main brand color
          "secondary": "#10B981", // Green - Success/earnings
          "accent": "#F59E0B",    // Amber - Highlights/warnings
          "neutral": "#6B7280",   // Gray - Text/secondary elements
          "base-100": "#FFFFFF",  // White background
          "base-200": "#F9FAFB",  // Light gray background
          "base-300": "#E5E7EB", // Border color
          "info": "#3B82F6",      // Same as primary
          "success": "#10B981",   // Same as secondary
          "warning": "#F59E0B",   // Same as accent
          "error": "#EF4444",     // Red for errors
        },
      },
      "light",
      "dark"
    ],
  },
};
