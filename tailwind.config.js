const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          500: "#0070f3",
        },
      },
      fontFamily: {
        sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Ubuntu Mono",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      keyframes: {
        "fade-out": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "disk-rotation":
          "disk-rotation 3s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate-reverse infinite",
        "fade-out": "fade-out .2s ease-in",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  variants: {
    typography: ["dark"],
  },
  darkMode: "class",
};
