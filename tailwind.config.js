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
      {
        microtaskdark: {
          "primary": "#60A5FA",   // Lighter blue for dark mode
          "secondary": "#34D399", // Lighter green for dark mode
          "accent": "#FBBF24",    // Lighter amber for dark mode
          "neutral": "#9CA3AF",   // Lighter gray for dark mode
          "base-100": "#1F2937",  // Dark background
          "base-200": "#374151",  // Darker gray background
          "base-300": "#4B5563", // Border color for dark mode
          "info": "#60A5FA",      // Same as primary
          "success": "#34D399",   // Same as secondary
          "warning": "#FBBF24",   // Same as accent
          "error": "#F87171",     // Lighter red for dark mode
        },
      },
      "light",
      "dark"
    ],
  },
};
