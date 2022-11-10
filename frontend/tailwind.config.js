const defaultTheme = require("tailwindcss/defaultTheme");

// THIS OBJECT SHOULD BE SIMILAR TO ./helpers/theme.js
const themeConstants = {
  paper: "#F9F9F9",
  primary: {
    main: "#fff",
    dark: "#e5e5e5",
  },
  secondary: {
    main: "#212121",
    dark: "#3A3A3A",
  },
  error: {
    main: "#9fa4c7",
    dark: "#8b0000",
  },
  fg: { main: "#fff", dark: "rgba(55, 65, 81, 1)" },
  breakpoints: {
    xs: "0px",
    mb: "350px",
    sm: "600px",
    md: "960px",
    lg: "1280px",
    xl: "1920px",
  },
};

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.{js,ts,jsx,tsx}',
],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        paper: themeConstants.paper,
        primary: themeConstants.primary,
        secondary: themeConstants.secondary,
        error: themeConstants.error,
        fg: themeConstants.fg.main,
        "fg-dark": themeConstants.fg.dark,
       deep: {
          0: '#D1D1D3', 
        100: '#A3A4A8', 
        200: '#75767C', 
        300: '#474951', 
        400: '#191B25', 
        500: '#14161E', 
        600: '#0F1016', 
        700: '#0A0B0F', 
        800: '#050507'
     },
     orange: {
      "50": "#FEF0E7",
      "100": "#FDE0CE",
      "200": "#FBBE98",
      "300": "#F99F67",
      "400": "#F78036",
      "500": "#EC600A",
      "600": "#BF4E08",
      "700": "#8E3A06",
      "800": "#5D2604",
      "900": "#311402"
    }
      },
    }, 
    
    // We over ride the whole screens with breakpoints for width. The 'ha' breakpoint will help us in blocking hover animations on devices not supporting hover.
    screens: {
      ...defaultTheme.screens,
      ...themeConstants.breakpoints,
      ha: { raw: "(hover: hover)" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};