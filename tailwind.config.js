/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-red": "#3F11119C",
        "medium-red": "#4A1C1C4F",
        "light-red": "#BAA7A7",
        white: "#FFEBEB",
      },
    },
  },
  plugins: [],
};
