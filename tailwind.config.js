/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
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
          "primary": "#3B82F6",   // Blue
          "secondary": "#10B981", // Green
          "accent": "#F59E0B",    // Amber
          "neutral": "#111827",   // Dark Gray
          "base-100": "#F9FAFB",  // Background
          "info": "#2563EB",
          "success": "#16A34A",
          "warning": "#FBBF24",
          "error": "#DC2626",
        },
      },
      "light",
      "dark"
    ],
  },
};
