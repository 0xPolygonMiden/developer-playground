/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#110F14",
        secondary: {
          main: "#19181F",
          1: "#676472",
          2: "#B3B1B8",
          3: "#1C1A24",
          4: "#2B2932",
          5: "#8D8A95",
          6: "#a1a1a3",
          7: "#FFFFFF99",
          8: "#24202F",
        },
        borderColor: "#1F1E25",
        accent: {
          1: "#3E0C91",
          2: "#773EF0",
        },
        green: "#39C707C7",
        hoverBg: "#ffffff0a",
        grey: {
          800: "#0B090D",
          400: "#282530",
          500: "#1C1A22",
          600: "#110F14",
          900: "#120f15",
        },
        purplec: {
          800: "#3E0C91",
          500: "#6210EC",
          400: "#7371EE",
          200: "#A6B1F4",
          100: "#DBE6FD",
        },
      },
      fontFamily: {
        sans: ["'Segoe UI'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#7b3fe4",
      },
      secondary: {
        main: "#efe2fe",
      },
      background: {
        default: "#fafafa",
      },
    },
  },

  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
