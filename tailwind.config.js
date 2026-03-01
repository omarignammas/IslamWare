/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#D71920", // rouge Wydad
        secondary: "#1B1B1B",
        light: "#F9FAFB",
      },
    },
  },
  plugins: [],
};
