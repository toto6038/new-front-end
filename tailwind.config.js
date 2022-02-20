const {
  "[data-theme=light]": lightTheme,
  "[data-theme=dark]": darkTheme,
} = require("daisyui/src/colors/themes");

module.exports = {
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          ...lightTheme,
          primary: "#003865",
          "primary-focus": "#1e5d8f",
          "primary-content": "#fff",
        },
      },
      {
        dark: {
          ...darkTheme,
          primary: "#003865",
          "primary-focus": "#1e5d8f",
        },
      },
    ],
  },
};
