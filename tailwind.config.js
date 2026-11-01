/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Taken from the logo: the navy of the hands and the sunrise orange.
        ink: {
          950: "#070D1A",
          900: "#0B1426",
          800: "#122039",
          700: "#1C2E4F",
          600: "#2B4170",
        },
        sun: {
          300: "#FFC27A",
          400: "#FFA94D",
          500: "#F28C28",
          600: "#D9731A",
          700: "#9C5310", // orange for small text on light backgrounds (AA)
        },
        sand: {
          50: "#FBF8F3",
          100: "#F5EFE5",
          200: "#E9DFCF",
        },
        steel: {
          300: "#B7C1D3",
          400: "#8F9BB3",
          500: "#5E6B85",
        },
      },
      fontFamily: {
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        site: "78rem",
      },
      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        dash: {
          to: { strokeDashoffset: "-400" },
        },
      },
      animation: {
        ticker: "ticker 45s linear infinite",
        dash: "dash 14s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
