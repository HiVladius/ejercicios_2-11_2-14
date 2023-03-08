/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      'blue': {
        '50': '#e8f4ff',
        '100': '#d0e7ff',
        '200': '#a6d0ff',
        '300': '#7ab9ff',
        '400': '#4da2ff',
        '500': '#1e8bff',
        '600': '#0070e0',
        '700': '#0057b8',
        '800': '#003d8f',
        '900': '#002466',
      },
      
    extend: {},
  },
  plugins: [],
}
}