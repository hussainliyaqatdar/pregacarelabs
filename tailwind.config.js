/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0F6E6E",
          dark: "#0A4F4F",
          light: "#E8F5F3",
          accent: "#FF7A45",
        },
      },
    },
  },
  plugins: [],
};
