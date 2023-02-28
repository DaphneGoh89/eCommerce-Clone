/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        poppins: ["Poppins"],
        playfair: ["Playfair Display"],
      },
      fontSize: {
        xxs: "0.65rem",
      },
      colors: {
        bgWhite: "#FDFDFD",
        bgPink: "#FFCE58",
        bgFooterPink: "#FFCEBC",
        fontMenuPink: "#E78C78",
        fontHeaderBlack: "39383A",
        fontDarkGrey: "#283737",
        fontLightGrey: "#4C504D",
        fontExtraLightGrey: "#959494",
        btnTealGreen: "#203737",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards",
        bounceShort: "bounce 1s ease-in-out 2",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
