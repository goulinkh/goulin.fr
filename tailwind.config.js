const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "disk-rotation": {
          "0%": { transform: "rotate(0deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg) scale(1.1)" },
        },
      },
      animation: {
        "disk-rotation":
          "disk-rotation 3s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate-reverse infinite",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
