/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#2C2C2C",
          light: "#565656",
          dark: "#1e1e1e",
        },
        "dark-blue": "#111827", // background
        "light-blue": "#1F2937", // sub background
        input: "#2D3748", // used
        secondary: "#FCFCFC",
        ctc: "#83FFE6",
      },
    },
  },
  plugins: [],
};
