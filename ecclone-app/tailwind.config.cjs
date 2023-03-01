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
        xxxs: "0.6rem",
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
        alertWarningBg: "#FEF2E0",
        alertWarningFont: "#AC673B",
        alertOOSBg: "#EEEEEE",
        alertOOSFont: "#595959",
        alertInfoBg: "#EAEFE7",
        alertPinkInfoBg: "#F4E9E4",
        alertInfoFont: "#5C8167",
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
