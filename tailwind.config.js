const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
      },
      keyframes: {
        "disk-rotation": {
          "0%": { transform: "rotate(0deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg) scale(1.1)" },
        },
        "fade-out": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "disk-rotation":
          "disk-rotation 3s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate-reverse infinite",
        "fade-out": "fade-out .3s ease-in",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.grey.800"),
            a: {
              color: theme("colors.sky.500"),
              "text-decoration": "none",
              "&:hover, &.active": {
                color: theme("colors.sky.700"),
              },
            },
            strong: {
              color: theme("colors.grey.800"),
            },
            h1: {
              color: theme("colors.grey.800"),
              "margin-top": "0",
            },
            h2: {
              color: theme("colors.grey.800"),
              "margin-top": "0",
            },
            h3: {
              color: theme("colors.grey.800"),
              "margin-top": "0",
            },
            h4: {
              color: theme("colors.grey.800"),
              "margin-top": "0",
            },
            code: {
              color: theme("colors.white"),
              "background-color": theme("colors.grey.800"),
              "&:before, &:after": {
                display: "none",
              },
            },
            p: {
              color: theme("colors.grey.800"),
              "margin-top": "0",
              "margin-bottom": "1em",
            },
            img: {
              "margin-top": "0",
              "margin-bottom": "0",
              "box-shadow": "0px 2px 4px -2px rgba(0, 0, 0, 30%)",
            },
            "ul > li": {
              "&::before": {
                "background-color": theme("colors.grey.800"),
                "font-weight": "bold",
              },
            },
            "ol > li": {
              "&::before": {
                color: theme("colors.grey.800"),
                "font-weight": "bold",
              },
            },
          },
        },

        dark: {
          css: {
            color: theme("colors.white"),
            a: {
              color: theme("colors.sky.500"),
              "&:hover, &.active": {
                color: theme("colors.sky.700"),
              },
            },
            strong: {
              color: theme("colors.white"),
            },
            h1: {
              color: theme("colors.white"),
              "margin-top": "0",
            },
            h2: {
              color: theme("colors.white"),
              "margin-top": "0",
            },
            h3: {
              color: theme("colors.white"),
              "margin-top": "0",
            },
            h4: {
              color: theme("colors.white"),
              "margin-top": "0",
            },
            code: {
              color: theme("colors.grey.600"),
            },
            pre: {
              color: theme("colors.grey.600"),
            },
            p: {
              color: theme("colors.white"),
              "margin-top": "0",
              "margin-bottom": "1em",
            },
            img: {
              "margin-top": "0",
              "margin-bottom": "0",
              "box-shadow": "0px 2px 4px -2px rgba(255, 255, 255, 30%)",
            },
            "ul > li": {
              "&::before": {
                "background-color": "white",
                "font-weight": "bold",
              },
            },
            "ol > li": {
              "&::before": {
                color: theme("colors.white"),
                "font-weight": "bold",
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
  variants: {
    typography: ["dark"],
  },
  darkMode: "class",
};
