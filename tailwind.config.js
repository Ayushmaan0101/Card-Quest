/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./build/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {},
  },
  // Add a custom class for screens below 400px
  theme: {
    screens: {
      'mobile': {'max': '399px'},
      'sm': '400px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
}
